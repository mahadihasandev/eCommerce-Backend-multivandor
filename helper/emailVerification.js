const nodemailer = require("nodemailer");

function createTransporter() {
  const smtpHost = process.env.SMTP_HOST || process.env.MAIL_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const smtpSecure = process.env.SMTP_SECURE === "true";
  const smtpUser = (process.env.SMTP_USER || process.env.EMAIL_USER || process.env.MAIL_USER || "").trim();
  const smtpPass = (process.env.SMTP_PASS || process.env.EMAIL_PASS || process.env.MAIL_PASS || "").trim();

  if (!smtpUser || !smtpPass) {
    throw new Error("Missing SMTP credentials. Set SMTP_USER/SMTP_PASS (or EMAIL_USER/EMAIL_PASS).");
  }

  if (smtpHost) {
    return nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });
}

async function emailVerification(email, otp) {
  const transporter = createTransporter();
  const fromAddress = process.env.EMAIL_FROM || process.env.SMTP_USER || process.env.EMAIL_USER;
  const apiBaseUrl = process.env.PROD_API || process.env.API_HOST || "http://localhost:8000";
  const verifyUrl = `${apiBaseUrl}/api/v1/auth/verify-email?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`;

  await transporter.sendMail({
    from: fromAddress,
    to: email,
    subject: "Verify your account",
    text: `Your verification code is ${otp}. This code expires in 10 minutes.`,
    html: `
      <div style="max-width:520px;margin:24px auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px;font-family:Arial,sans-serif;background:#f8fafc;">
        <h2 style="margin:0 0 12px;color:#0f172a;">Email Verification</h2>
        <p style="margin:0 0 16px;color:#334155;">Use this OTP code to verify your account:</p>
        <div style="font-size:28px;font-weight:700;letter-spacing:4px;color:#0369a1;background:#e0f2fe;padding:12px 16px;border-radius:10px;display:inline-block;">
          ${otp}
        </div>
        <div style="margin-top:20px;">
          <a href="${verifyUrl}" style="display:inline-block;padding:12px 20px;background:#0284c7;color:white;text-decoration:none;border-radius:8px;font-weight:700;">
            Verify Email
          </a>
        </div>
        <p style="margin:12px 0 0;color:#475569;font-size:12px;word-break:break-all;">If button does not work, open this link:<br/>${verifyUrl}</p>
        <p style="margin:16px 0 0;color:#64748b;">This code expires in 10 minutes.</p>
      </div>
    `,
  });
}

module.exports = emailVerification;
