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

  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const host = req.headers.host;
  const copyUrl = `${protocol}://${host}/copy-otp.html?otp=${otp}`;

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="color: #166534; margin-bottom: 20px;">GramSetu Login</h2>
      <p style="color: #333; font-size: 16px;">Namaskara,</p>
      <p style="color: #555; font-size: 15px;">Your one-time password (OTP) for GramSetu is:</p>
      
      <div style="margin: 30px 0; padding: 20px; background-color: #f0fdf4; border: 2px solid #86efac; border-radius: 10px; text-align: center;">
        <div style="display: inline-block; background: #fff; border: 1px dashed #4ade80; padding: 10px 20px; border-radius: 8px; margin-bottom: 12px; vertical-align: middle;">
          <span style="font-size: 36px; font-weight: 800; letter-spacing: 10px; color: #15803d; font-family: 'Courier New', monospace; user-select: all; vertical-align: middle;">${otp}</span>
          <a href="${copyUrl}" target="_blank" style="text-decoration: none; display: inline-block; vertical-align: middle; margin-left: 12px; background: #e6f4ea; border: 1px solid #4ade80; padding: 6px 10px; border-radius: 6px; color: #15803d; font-size: 14px; font-weight: bold; font-family: sans-serif;" title="Click to copy OTP">
            📋 Copy
          </a>
        </div>
        <div>
          <span style="display: inline-block; background: #16a34a; color: #fff; padding: 6px 12px; border-radius: 4px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
            👆 Click icon or double-click code to copy
          </span>
        </div>
      
      <p style="color: #666; font-size: 14px;">This code is valid until ${expiryTime}.</p>
      <p style="color: #888; font-size: 12px; margin-top: 30px; border-top: 1px solid #eee; padding-top: 15px;">
        For your security, do not share this code. If you did not request this OTP, please ignore this email.
      </p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"GramSetu Support" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `GramSetu Verification Code`,
      html: htmlBody,
      text: `Your GramSetu verification code is: ${otp}. Valid for 10 minutes. Do not share this code.`,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
}
