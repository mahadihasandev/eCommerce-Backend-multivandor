const UserSchema = require("../model/UserSchema");
const jwt = require("jsonwebtoken");

async function verifyOtpForEmail(email, otp) {
  if (!email || !otp) {
    return { ok: false, status: 400, message: "otp and email are required" };
  }

  const emailEncode = jwt.sign(email, "arnob");
  const existUser = await UserSchema.findOne({
    $or: [{ email }, { email: emailEncode }],
  });

  if (!existUser) {
    return { ok: false, status: 404, message: "user does not exist" };
  }

  const isPlainOtpMatch = existUser.otp === otp;
  const isLegacyOtpMatch = (() => {
    try {
      return jwt.verify(existUser.otp, "arnob") === otp;
    } catch (_error) {
      return false;
    }
  })();

  if (existUser.emailVerified) {
    return { ok: true, status: 200, message: "Email already verified" };
  }

  if (!isPlainOtpMatch && !isLegacyOtpMatch) {
    return { ok: false, status: 400, message: "Please enter a valid otp" };
  }

  await UserSchema.findByIdAndUpdate(existUser._id, { otp: "", emailVerified: true });
  return { ok: true, status: 200, message: "Email verified successfully" };
}

module.exports = verifyOtpForEmail;
