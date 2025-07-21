import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
import { transporter, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  // const recipient = [{ email }];

  try {
    const response = await transporter.sendMail({
      from: sender,
      to: email,
      subject: "Verify your email - Securelytix",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
    });
    // console.log("email sent successfully", response.messageId);
  } catch (error) {
    console.error("error sending mail", error);
    throw new Error(`error sending verification mail: ${error}`);
  }
};

export const sendWelcomeEmail = async (email, userName) => {
  try {
    const response = await transporter.sendMail({
      from: sender,
      to: email,
      subject: `Welcome ${userName} to Securelytix`,
      html: WELCOME_EMAIL_TEMPLATE.replace("{userName}", userName),
    });
    // console.log("email sent successfully", response);
  } catch (error) {
    console.error("error sending mail", error);
    throw new Error(`error sending verification mail: ${error}`);
  }
};

export const sendPasswordResetEmail = async (email, url) => {
  try {
    const response = await transporter.sendMail({
      from: sender,
      to: email,
      subject: "Reset Password by Securelytix",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", url),
    });
    // console.log("email sent successfully", response);
  } catch (error) {
    console.error("error sending mail", error);
    throw new Error(`error sending verification mail: ${error}`);
  }
};

export const sendResetSuccessEmail = async (email) => {
  try {
    const response = await transporter.sendMail({
      from: sender,
      to: email,
      subject: "Success Reset Password by Securelytix",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    })
    // console.log("email sent successfully", response);
  } catch (error) {
    console.error("error sending mail", error);
    throw new Error(`error sending verification mail: ${error}`);
  }
}