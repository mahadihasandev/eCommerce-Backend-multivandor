const verifyOtpForEmail = require("../helper/verifyOtpForEmail");

async function VerifyEmailController(req, res) {
  const email = String(req.query.email || "").trim();
  const otp = String(req.query.otp || "").trim();

  const result = await verifyOtpForEmail(email, otp);

  if (!result.ok) {
    return res.status(result.status).send(`
      <html>
        <body style="font-family:Arial,sans-serif;background:#f8fafc;padding:24px;">
          <div style="max-width:520px;margin:24px auto;padding:24px;border:1px solid #fecaca;border-radius:12px;background:#fff1f2;">
            <h2 style="margin:0 0 8px;color:#991b1b;">Verification Failed</h2>
            <p style="margin:0;color:#7f1d1d;">${result.message}</p>
          </div>
        </body>
      </html>
    `);
  }

  return res.status(200).send(`
    <html>
      <body style="font-family:Arial,sans-serif;background:#f8fafc;padding:24px;">
        <div style="max-width:520px;margin:24px auto;padding:24px;border:1px solid #bbf7d0;border-radius:12px;background:#f0fdf4;">
          <h2 style="margin:0 0 8px;color:#166534;">Email Verified</h2>
          <p style="margin:0;color:#166534;">${result.message}. You can now return to app and login.</p>
        </div>
      </body>
    </html>
  `);
}

module.exports = VerifyEmailController;
