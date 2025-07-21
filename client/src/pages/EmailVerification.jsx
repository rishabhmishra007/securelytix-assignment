import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../Store/authStore";
import toast from "react-hot-toast";

const EmailVerification = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const {error, isLoading, verifyEmail} = useAuthStore()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    try {
      await verifyEmail(verificationCode);
      navigate("/");
      toast.success("Email verified successfully");
    } catch (error) {
      console.log(error);
      toast.error("Email verification error");
    }
  };

  const handleChange = (idx, value) => {
    const newCode = [...code];

    // Handle pasted content
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      // Focus on the last non-empty input or the first empty one
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[idx] = value;
      setCode(newCode);

      // Move focus to the next input field if value is entered
      if (value && idx < 5) {
        inputRefs.current[idx + 1].focus();
      }
    }
  };
  const handelKeyDown = (idx, e) => {
    if (e.key === "Backspace" && !code[idx] && idx > 0) {
      inputRefs.current[idx - 1].focus();
    }
  };

  // Auto submit when all fields are filled
  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
  }, [code]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-w-sm w-[30vw] bg-white/8 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden p-4"
    >
      <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-violet-400 to-blue-500 text-transparent bg-clip-text">
        Verify Your Email
      </h2>
      <p className="text-center text-gray-300 mb-6">
        Enter the 6-digit code sent to your email address.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-between">
          {code.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (inputRefs.current[idx] = el)}
              type="text"
              maxLength="6"
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handelKeyDown(idx, e)}
              className="w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-violet-500 focus:outline-none"
            />
          ))}
        </div>
        {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={isLoading || code.some((digit) => !digit)}
          className="w-full bg-gradient-to-r from-violet-500 to-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-violet-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50 disabled:opacity-50"
        >
          {isLoading ? "Verifying..." : "Verify Email"}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default EmailVerification;
