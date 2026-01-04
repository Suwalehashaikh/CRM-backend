import nodemailer from "nodemailer";
import { otpTemplate } from "../template/otp.template.js";
 import dotenv from "dotenv";
 dotenv.config()

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass:  process.env.APP_PASS,
  },
});

// Wrap in an async IIFE so we can use await.
export const sendEmail = async (recepient,subject,content) => {
  const info = await transporter.sendMail({
    from: '"NB CRMs" <suwalehashaikh8@gmail.com>',
    to: recepient,
    subject: subject,
   // text: "Hello world?", // plain‑text body
    html: content, // HTML body
  });

  console.log("Message sent:", info.messageId);
};