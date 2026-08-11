import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import nodemailer from 'nodemailer'

const sendOtpPlugin = () => {
  return {
    name: 'send-otp-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/send-otp' && req.method === 'POST') {
          let body = ''
          req.on('data', chunk => {
            body += chunk.toString()
          })
          req.on('end', async () => {
            try {
              const { email, otp } = JSON.parse(body)
              if (!email || !otp) {
                res.statusCode = 400
                res.end(JSON.stringify({ error: 'Email and OTP required' }))
                return
              }

              // Load env vars
              const env = loadEnv('', process.cwd(), '')
              const user = env.GMAIL_USER || process.env.GMAIL_USER
              const pass = env.GMAIL_APP_PASSWORD || process.env.GMAIL_APP_PASSWORD

              if (!user || !pass) {
                res.statusCode = 500
                res.end(JSON.stringify({ error: 'Server Gmail credentials missing' }))
                return
              }

              const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: { user, pass },
              })

              const expiryTime = new Date(Date.now() + 10 * 60000).toLocaleTimeString('en-IN', {
                hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata'
              })

              const htmlBody = `
                <div style="font-family: 'Segoe UI', sans-serif; max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e5e7eb;">
                  <div style="background: linear-gradient(135deg, #15803d 0%, #166534 100%); padding: 28px 32px; text-align: center;">
                    <h1 style="color: #ffffff; font-size: 22px; margin: 0; font-weight: 700;">🌾 GramSetu — ಗ್ರಾಮ ಸೇತು</h1>
                  </div>
                  <div style="padding: 32px;">
                    <p style="color: #374151; font-size: 15px; margin: 0 0 8px 0;">Namaskara / ನಮಸ್ಕಾರ,</p>
                    <p style="color: #6b7280; font-size: 14px; margin: 0 0 24px 0;">Your verification code is:</p>
                    <div style="background: #f0fdf4; border: 2px solid #86efac; border-radius: 10px; padding: 20px; text-align: center; margin: 0 0 24px 0;">
                      <div style="font-size: 36px; font-weight: 800; letter-spacing: 10px; color: #15803d; font-family: 'Courier New', monospace;">${otp}</div>
                      <p style="font-size: 12px; color: #6b7280; margin: 10px 0 0 0;">Valid until <strong>${expiryTime}</strong> IST</p>
                    </div>
                  </div>
                </div>
              `

              await transporter.sendMail({
                from: `"GramSetu ಗ್ರಾಮ ಸೇತು" <${user}>`,
                to: email,
                subject: `${otp} — Your GramSetu Login OTP`,
                html: htmlBody,
              })

              res.setHeader('Content-Type', 'application/json')
              res.statusCode = 200
              res.end(JSON.stringify({ success: true }))
            } catch (err) {
              console.error(err)
              res.statusCode = 500
              res.end(JSON.stringify({ error: err.message }))
            }
          })
        } else {
          next()
        }
      })
    }
  }
}

// Security headers applied to every response (dev server + preview server).
// For production, replicate these in your web server config (Nginx / Firebase / Vercel).
const securityHeaders = {
  // Prevent clickjacking
  'X-Frame-Options': 'DENY',

  // Prevent MIME-type sniffing
  'X-Content-Type-Options': 'nosniff',

  // Enable strict HSTS (only meaningful over HTTPS)
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',

  // XSS filter for legacy browsers
  'X-XSS-Protection': '1; mode=block',

  // Referrer policy — don't leak full URL cross-origin
  'Referrer-Policy': 'strict-origin-when-cross-origin',

  // Permissions policy — restrict unnecessary browser APIs
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',

  // Prevent sensitive pages being cached by intermediate proxies
  'Cache-Control': 'no-store, no-cache, must-revalidate',
  'Pragma': 'no-cache',

  // Content Security Policy — whitelist only what is needed
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https://images.unsplash.com",
    "font-src 'self' data: https://fonts.gstatic.com",
    "connect-src 'self' ws: wss: http: https:",
    "frame-src https://www.youtube.com https://youtube.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; '),
}

export default defineConfig({
  plugins: [react(), sendOtpPlugin()],

  server: {
    headers: securityHeaders,
  },

  preview: {
    headers: securityHeaders,
  },

  build: {
    // Emit source maps only in development; never in production to avoid source disclosure
    sourcemap: false,

    rollupOptions: {
      output: {
        // Content-addressable hashed filenames prevent cache poisoning
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
    },
  },
})
