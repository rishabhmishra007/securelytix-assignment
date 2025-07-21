import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";
// import { MailtrapClient } from "mailtrap";

export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  secure: false,
  auth: {
    user:process.env.EMAIL_USER,
    pass:process.env.EMAIL_PASS,
  },
})

export const sender = {
  name: "Securelytix",
  address: process.env.EMAIL_USER
}

// export const mailtrapClient = new MailtrapClient({
//   token: process.env.MAILTRAP_TOKEN,
// });

// export const sender = {
//   email: "hello@demomailtrap.co",
//   name: "Rishabh",
// };
