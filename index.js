const http = require('http')
const { Server } = require('socket.io')
const jwt = require('jsonwebtoken')
const app = require('./app')
const port = process.env.PORT || 8000
const UserSchema = require('./model/UserSchema')
const ChatMessageSchema = require('./model/ChatMessageSchema')
require('dotenv').config()

const appServer = http.createServer(app)

const io = new Server(appServer, {
  cors: {
    origin: true,
    credentials: true,
  },
})

const onlineUsers = new Map()

function getRoomId(userA, userB) {
  return [userA, userB].sort().join(':')
}

async function getVerifiedSocketUser(socket) {
  const authHeader = socket.handshake?.headers?.authorization || ''
  const bearerToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null
  const token = socket.handshake?.auth?.token || bearerToken

  if (!token) {
    throw new Error('missing token')
  }

  const jwtSecret = process.env.JWT_SECRET || 'dev_jwt_secret'
  const payload = jwt.verify(token, jwtSecret)
  const userId = payload?.sub

  if (!userId) {
    throw new Error('invalid token payload')
  }

  const user = await UserSchema.findById(userId).select('_id username email role profileImage')
  if (!user) {
    throw new Error('account not found')
  }

  return user
}

io.use(async (socket, next) => {
  try {
    const user = await getVerifiedSocketUser(socket)
    socket.user = {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage || '',
    }
    return next()
  } catch (_error) {
    return next(new Error('unauthorized'))
  }
})

io.on('connection', async (socket) => {
  const userId = socket.user.id
  onlineUsers.set(userId, socket.id)
  socket.join(`user:${userId}`)

  socket.emit('chat:connected', { user: socket.user })

  socket.on('chat:listUsers', async (callback) => {
    try {
      const users = await UserSchema.find({ _id: { $ne: userId } })
        .select('_id username email role profileImage')
        .sort({ username: 1 })
        .limit(200)

      const payload = users.map((user) => ({
        id: user._id.toString(),
        name: user.username,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage || '',
        online: onlineUsers.has(user._id.toString()),
      }))

      if (typeof callback === 'function') {
        callback({ ok: true, users: payload })
      }
    } catch {
      if (typeof callback === 'function') {
        callback({ ok: false, users: [] })
      }
    }
  })

  socket.on('chat:history', async (payload, callback) => {
    try {
      const withUserId = String(payload?.withUserId || '')
      if (!withUserId) {
        if (typeof callback === 'function') callback({ ok: false, messages: [] })
        return
      }

      const roomId = getRoomId(userId, withUserId)
      const messages = await ChatMessageSchema.find({ roomId })
        .sort({ createdAt: 1 })
        .limit(150)

      if (typeof callback === 'function') {
        callback({
          ok: true,
          messages: messages.map((message) => ({
            id: message._id.toString(),
            roomId: message.roomId,
            senderId: message.senderId.toString(),
            receiverId: message.receiverId.toString(),
            text: message.text,
            createdAt: message.createdAt,
          })),
        })
      }
    } catch {
      if (typeof callback === 'function') callback({ ok: false, messages: [] })
    }
  })

  socket.on('chat:send', async (payload, callback) => {
    try {
      const receiverId = String(payload?.toUserId || '')
      const text = String(payload?.text || '').trim()

      if (!receiverId || !text) {
        if (typeof callback === 'function') callback({ ok: false, error: 'invalid message payload' })
        return
      }

      const receiver = await UserSchema.findById(receiverId).select('_id')
      if (!receiver) {
        if (typeof callback === 'function') callback({ ok: false, error: 'receiver account not found' })
        return
      }

      const roomId = getRoomId(userId, receiverId)
      const messageDoc = await ChatMessageSchema.create({
        roomId,
        senderId: userId,
        receiverId,
        text,
      })

      const message = {
        id: messageDoc._id.toString(),
        roomId,
        senderId: userId,
        receiverId,
        text,
        createdAt: messageDoc.createdAt,
      }

      io.to(`user:${userId}`).to(`user:${receiverId}`).emit('chat:message', message)
      io.to(`user:${receiverId}`).emit('chat:notify', {
        type: 'message',
        senderId: userId,
        receiverId,
        roomId,
        text,
        createdAt: messageDoc.createdAt,
      })

      if (typeof callback === 'function') callback({ ok: true, message })
    } catch {
      if (typeof callback === 'function') callback({ ok: false, error: 'failed to send message' })
    }
  })

  socket.on('disconnect', () => {
    onlineUsers.delete(userId)
  })
})

appServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
