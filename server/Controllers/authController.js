import bcryptjs from "bcryptjs";
import crypto from "crypto";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../mailtrap/emails.js";
import { User } from "../Models/userModel.js";

export const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    if (!email || !password || !name) {
      return res.status(400).json({
        status: "failure",
        message: "All inputs are required",
      });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({
        status: "failure",
        message: "user already exists!",
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPass = await bcryptjs.hash(password, salt);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const user = new User({
      email,
      password: hashedPass,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, //24h
    });

    await user.save();

    //jwt
    generateTokenAndSetCookie(res, user._id);

    await sendVerificationEmail(user.email, verificationToken);

    const userObj = user.toObject();
    delete userObj.password;

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      user: userObj,
    });
  } catch (error) {
    return res.status(400).json({
      status: "failure",
      message: error.message,
    });
  }
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        status: "failure",
        message: "Invalid or expired verification code",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.name);

    res.status(200).json({
      status: "success",
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    return res.status(400).json({
      status: "failure",
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        status: "failure",
        message: "fill all imputs!",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: "failure",
        message: "invalid credentials.",
      });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        status: "failure",
        message: "invalid credentials.",
      });
    }

    generateTokenAndSetCookie(res, user._id);

    user.lastLogin = new Date();
    await user.save();

    const userObj = user.toObject();
    delete userObj.password;

    res.status(201).json({
      status: "success",
      message: "User login successfully",
      user: userObj,
    });
  } catch (error) {
    return res.status(400).json({
      status: "failure",
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      status: "success",
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(400).json({
      status: "failure",
      message: error.message,
    });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: "failure",
        message: "user not found",
      });
    }
    // reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1h

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();

    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );

    res.status(200).json({
      status: "success",
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    return res.status(400).json({
      status: "failure",
      message: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({
        status: "failure",
        message: "Invalid or expired token",
      });
    }

    // update password
    const salt = await bcryptjs.genSalt(10);
    const hashedPass = await bcryptjs.hash(password, salt);
    user.password = hashedPass;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;

    await user.save();

    await sendResetSuccessEmail(user.email);

    res.status(200).json({
      status: "success",
      message: "Password updated successfully",
    });
  } catch (error) {
    return res.status(400).json({
      status: "failure",
      message: error.message,
    });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({
        status: "failure",
        message: "User not found",
      });
    }
    res.status(200).json({ status: "success", user });
  } catch (error) {
    return res.status(400).json({
      status: "failure",
      message: error.message,
    });
  }
};
