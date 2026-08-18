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
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="color: #166534; margin-bottom: 20px;">GramSetu Login</h2>
      <p style="color: #333; font-size: 16px;">Namaskara,</p>
      <p style="color: #555; font-size: 15px;">Your one-time password (OTP) for GramSetu is:</p>
      
      <div style="margin: 30px 0; padding: 15px; background-color: #f0fdf4; border-radius: 6px; text-align: center;">
        <span style="font-size: 32px; font-weight: bold; color: #15803d; letter-spacing: 5px;">${otp}</span>
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
