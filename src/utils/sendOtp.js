/**
 * Sends an OTP email via the Vercel serverless API route (/api/send-otp).
 * Falls back to EmailJS if the API route is unavailable (e.g. local dev without `vercel dev`).
 */

const EMAILJS_SERVICE_ID  = 'service_yupzec9'
const EMAILJS_TEMPLATE_ID = 'template_iiz68fd'
const EMAILJS_PUBLIC_KEY  = 'WxFna4OMAj2w50yJk'

let emailjsInitialized = false

async function sendViaApi(email, otp) {
  const res = await fetch('/api/send-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp }),
  })

  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.error || `API error: ${res.status}`)
  }

  return true
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
    passcode: otp,
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
  // Try the server-side Gmail SMTP route first (inbox-friendly)
  try {
    await sendViaApi(email, otp)
    return { success: true, method: 'api' }
  } catch (apiErr) {
    console.warn('API route unavailable, falling back to EmailJS:', apiErr.message)
  }

  // Fallback to EmailJS (may land in spam)
  try {
    await sendViaEmailJS(email, otp)
    return { success: true, method: 'emailjs' }
  } catch (ejsErr) {
    throw new Error(
      `Failed to send OTP: ${ejsErr?.text || ejsErr?.message || 'Unknown error'}`
    )
  }
}
