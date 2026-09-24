/**
 * Sends an OTP email via the Vercel serverless API route (/api/send-otp).
 * Falls back to EmailJS if the API route is unavailable (e.g. local dev without `vercel dev`).
 */

const EMAILJS_SERVICE_ID  = 'service_yupzec9'
const EMAILJS_TEMPLATE_ID = 'template_iiz68fd'
const EMAILJS_PUBLIC_KEY  = 'WxFna4OMAj2w50yJk'

let emailjsInitialized = false

async function sendViaApi(email, otp) {
  const controller = new AbortController()
  // Increase timeout to 12s so Gmail SMTP via Nodemailer has sufficient time to complete TLS connection
  const timeoutId = setTimeout(() => controller.abort(), 12000)

  try {
    const res = await fetch('/api/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
      signal: controller.signal
    })
    clearTimeout(timeoutId)

    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      throw new Error(data.error || `API error: ${res.status}`)
    }

    return true
  } catch (err) {
    clearTimeout(timeoutId)
    throw err
  }
}

async function sendViaEmailJS(email, otp) {
  // Lazy-load EmailJS only when needed as fallback
  const emailjs = (await import('@emailjs/browser')).default

  if (!emailjsInitialized) {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY })
    emailjsInitialized = true
  }

  await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
    email,
    to_email: email,
    passcode: otp,
    otp,
    time: '10 minutes',
  })

  return true
}

/**
 * @param {string} email - Recipient email address
 * @param {string} otp   - The 6-digit OTP code
 * @returns {Promise<{success: boolean, method: 'api'|'emailjs'}>}
 */
export async function sendOtpEmail(email, otp) {
  console.log(`[GramSetu OTP] Sending code to ${email}... (For quick testing/demo, code is: ${otp})`)
  
  // 1. First try server-side Gmail SMTP route
  try {
    await sendViaApi(email, otp)
    console.log('[GramSetu OTP] Delivered via Server API (Gmail SMTP)')
    return { success: true, method: 'api' }
  } catch (apiErr) {
    console.warn('[GramSetu OTP] Server API route failed, attempting EmailJS fallback...', apiErr.message)
  }

  // 2. Fallback to EmailJS (client-side browser direct)
  try {
    await sendViaEmailJS(email, otp)
    console.log('[GramSetu OTP] Delivered via EmailJS fallback')
    return { success: true, method: 'emailjs' }
  } catch (emailjsErr) {
    console.error('[GramSetu OTP] EmailJS fallback also failed:', emailjsErr)
    throw new Error(
      `Failed to deliver OTP email. Please verify email address or check console for OTP.`
    )
  }
}

