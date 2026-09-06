import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

const { EMAIL, PASS } = process.env

const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true,
  auth: {
    user: EMAIL,
    pass: PASS,
  },
})

const verifyTransporter = async () => {
  if (!EMAIL || !PASS) {
    console.warn("[Mail] Missing EMAIL or PASS env variables. Mail sending is disabled.")
    return
  }
  try {
    await transporter.verify()
    console.log("[Mail] Gmail transporter verified successfully.")
  } catch (err) {
    console.error("[Mail] Gmail transporter verification failed:", err.message)
  }
}

verifyTransporter()

export const sendOtpMail = async (to, otp) => {
  if (!EMAIL || !PASS) {
    console.warn("[Mail] Skipping OTP email because mail credentials are not configured.")
    return
  }
  if (!to) {
    console.warn("[Mail] Skipping OTP email because recipient address is missing.")
    return
  }
  await transporter.sendMail({
    from: EMAIL,
    to,
    subject: "Reset Your Password",
    html: `<p>Your OTP for password reset is <b>${otp}</b>. It expires in 5 minutes.</p>`,
  })
}

export const sendDeliveryOtpMail = async (user, otp) => {
  if (!EMAIL || !PASS) {
    console.warn("[Mail] Skipping delivery OTP email because mail credentials are not configured.")
    return
  }
  if (!user?.email) {
    console.warn("[Mail] Skipping delivery OTP email because user email is missing.")
    return
  }
  await transporter.sendMail({
    from: EMAIL,
    to: user.email,
    subject: "Delivery OTP",
    html: `<p>Your OTP for delivery is <b>${otp}</b>. It expires in 5 minutes.</p>`,
  })
}
