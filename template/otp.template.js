export const otpTemplate = (USER_NAME, OTP, VERIFY_LINK) => {
  return `
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Your OTP Code</title>

  <style>
    body,table,td,a { -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
    table,td { mso-table-lspace:0pt; mso-table-rspace:0pt; }
    img { -ms-interpolation-mode:bicubic; display:block; border:0; outline:none; }
    body { margin:0; padding:0; width:100%; background:#f3f6fb; font-family:Arial, sans-serif; }

    .email-wrap { width:100%; background:#f3f6fb; padding:32px 16px; box-sizing:border-box; }

    .card {
      max-width:600px; margin:0 auto; background:#fff;
      border-radius:12px; overflow:hidden;
      box-shadow:0 6px 20px rgba(26,30,38,0.08);
    }

    .card-header {
      background:linear-gradient(90deg,#6c63ff,#8b73ff);
      padding:28px 24px; color:#fff; text-align:center;
    }

    .card-body { padding:28px; }
    .otp {
      display:inline-block; letter-spacing:10px; font-size:28px; font-weight:700;
      padding:14px 22px; background:#f6f7fb; border:1px dashed #e6e9f2; border-radius:10px;
    }
    .cta {
      display:inline-block; background:#6c63ff; color:#fff;
      text-decoration:none; padding:12px 20px; border-radius:10px;
    }

    .footer { text-align:center; font-size:12px; color:#9ca3af; padding:18px 12px; }
  </style>
</head>
<body>
  <table role="presentation" width="100%" class="email-wrap">
    <tr><td align="center">

      <table role="presentation" width="100%" class="card">
        <tr>
          <td class="card-header">
            <img src="https://via.placeholder.com/56x56.png?text=Logo" width="56" height="56" style="border-radius:12px;" />
            <h2 style="margin:12px 0 0;">Verify your email</h2>
            <p style="margin:8px 0 0; font-size:13px;">One-time passcode (OTP) to finish signing in</p>
          </td>
        </tr>

        <tr>
          <td class="card-body">
            <p style="font-size:16px;">Hi <strong>${USER_NAME}</strong>,</p>

            <p style="font-size:20px; font-weight:600;">Your verification code is:</p>

            <div style="text-align:left;">
              <div class="otp">
                <span>${OTP}</span>
              </div>
            </div>

            <p style="font-size:14px; color:#4b5563;">
              If the styled code doesn’t work, use: <strong>${OTP}</strong>
            </p>

            <p>
              <a href="${VERIFY_LINK}" class="cta">Verify Email</a>
            </p>

            <p style="color:#6b7280; font-size:13px; margin-top:18px;">
              This code expires in <strong>10 minutes</strong>.
            </p>

            <p style="font-size:12px; color:#9ca3af;">
              If you didn’t request this, ignore the email.
            </p>
          </td>
        </tr>

        <tr>
          <td class="footer">
            © ${new Date().getFullYear()} Your Company
          </td>
        </tr>
      </table>

    </td></tr>
  </table>
</body>
</html>
  `;
};
