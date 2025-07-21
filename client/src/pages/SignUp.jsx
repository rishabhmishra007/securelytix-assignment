import { motion } from "motion/react";
import Input from "../components/Input";
import { Loader, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { useAuthStore } from "../Store/authStore";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// zod schema
const signupSchema = z.object({
  name: z.string().min(2, {message: "Name must be at least 2 characters"}),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, {message: "Password must be at least 8 characters"}),
})

const SignUp = () => {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { signup, error, isLoading } = useAuthStore();

  const {register, handleSubmit, formState: {errors}, watch} = useForm({resolver: zodResolver(signupSchema)})

  const onSubmit = async ({name, email, password}) => {
    try {
      await signup(email, password, name);
      navigate("/verify-email");
    } catch (error) {
      console.log(error); 
    }
  }

  const passwordValue = watch("password");

  // const handleSignUp = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await signup(email, password, name);
  //     navigate("/verify-email");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-w-sm w-[30vw] bg-white/8 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-violet-400 to-blue-600 text-transparent bg-clip-text">
          Create Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            icon={User}
            name="name"
            type="text"
            placeholder="Full Name"
            {...register("name")}
            // value={name}
            // onChange={(e) => setName(e.target.value)}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
          <Input
            icon={Mail}
            type="email"
            name="email"
            placeholder="Email Address"
            {...register("email")}
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
          <Input
            icon={Lock}
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
             {...register("password")}
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            showToggle
            onToggle={() => setShowPassword(!showPassword)}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}

          {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}

          <PasswordStrengthMeter password={passwordValue || ""} />

          <motion.button
            className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-violet-500 to-blue-600 text-white cursor-pointer
						font-bold rounded-lg shadow-lg hover:from-violet-600
						hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2
						 focus:ring-offset-gray-900 transition duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="animate-spin mx-auto" size={24} />
            ) : (
              "Sign Up"
            )}
          </motion.button>
        </form>
      </div>
      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
        <p className="text-sm text-gray-400">
          Already have an account?{" "}
          <Link to={"/login"} className="text-violet-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default SignUp;
