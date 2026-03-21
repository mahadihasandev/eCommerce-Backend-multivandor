const UserSchema = require('../model/UserSchema')

const uploadProfileImage = async (req, res) => {
  try {
    const userId = req?.user?.id
    if (!userId) {
      return res.status(401).send({ error: 'unauthorized' })
    }

    const profileImage = req.file?.path || ''
    if (!profileImage) {
      return res.status(400).send({ error: 'profile image is required' })
    }

    const updatedUser = await UserSchema.findByIdAndUpdate(
      userId,
      { profileImage },
      { new: true }
    ).select('_id username email role profileImage emailVerified')

    if (!updatedUser) {
      return res.status(404).send({ error: 'user not found' })
    }

    return res.send({
      success: 'Profile image updated successfully',
      id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      role: updatedUser.role,
      emailVerified: updatedUser.emailVerified,
      profileImage: updatedUser.profileImage || '',
      image: updatedUser.profileImage || '',
      avatar: updatedUser.profileImage || '',
    })
  } catch (error) {
    return res.status(500).send({ error: 'failed to update profile image', detail: error.message })
  }
}

module.exports = uploadProfileImage
