import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: 'Email and OTP are required' });
  }

  // Create Gmail SMTP transporter using App Password
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const expiryTime = new Date(Date.now() + 10 * 60000).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  });

  const htmlBody = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb;">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #15803d 0%, #166534 100%); padding: 28px 32px; text-align: center;">
        <h1 style="color: #ffffff; font-size: 22px; margin: 0; font-weight: 700; letter-spacing: 0.5px;">
          🌾 GramSetu — ಗ್ರಾಮ ಸೇತು
        </h1>
        <p style="color: rgba(255,255,255,0.8); font-size: 13px; margin: 6px 0 0 0;">
          Karnataka Citizen Services Portal
        </p>
      </div>

      <!-- Body -->
      <div style="padding: 32px;">
        <p style="color: #374151; font-size: 15px; margin: 0 0 8px 0;">
          Namaskara / ನಮಸ್ಕಾರ,
        </p>
        <p style="color: #6b7280; font-size: 14px; margin: 0 0 24px 0; line-height: 1.5;">
          Your one-time verification code for GramSetu login is:
        </p>

        <!-- OTP Box -->
        <div style="background: #f0fdf4; border: 2px solid #86efac; border-radius: 10px; padding: 20px; text-align: center; margin: 0 0 24px 0;">
          <div style="font-size: 36px; font-weight: 800; letter-spacing: 10px; color: #15803d; font-family: 'Courier New', monospace;">
            ${otp}
          </div>
          <p style="font-size: 12px; color: #6b7280; margin: 10px 0 0 0;">
            Valid until <strong>${expiryTime}</strong> IST (10 minutes)
          </p>
        </div>

        <p style="color: #6b7280; font-size: 13px; line-height: 1.5; margin: 0 0 6px 0;">
          🔒 For your security, <strong>do not share this code</strong> with anyone. GramSetu staff will never ask for your OTP.
        </p>
        <p style="color: #9ca3af; font-size: 12px; margin: 0;">
          If you did not request this code, please ignore this email.
        </p>
      </div>

      <!-- Footer -->
      <div style="background: #f9fafb; padding: 16px 32px; border-top: 1px solid #e5e7eb; text-align: center;">
        <p style="color: #9ca3af; font-size: 11px; margin: 0;">
          GramSetu — Bridging Rural Karnataka 🌿 | gramsetu.vercel.app
        </p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"GramSetu ಗ್ರಾಮ ಸೇತು" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `${otp} — Your GramSetu Login OTP`,
      html: htmlBody,
      text: `Your GramSetu OTP is: ${otp}. Valid for 10 minutes. Do not share this code.`,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
}
