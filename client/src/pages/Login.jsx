import { useState } from "react"
import { motion } from "motion/react";
import { Link} from "react-router-dom";
import Input from "../components/Input";
import { Mail, Lock, Loader } from "lucide-react";
import { useAuthStore } from "../Store/authStore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login, error, isLoading } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
  }
  return (
   <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-w-sm w-[30vw] bg-white/8 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden"
    > 
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-violet-400 to-blue-600 text-transparent bg-clip-text">Welcome Back</h2>

      <form onSubmit={handleLogin}>
        <Input
            icon={Mail}
            type="email"
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            icon={Lock}
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            showToggle
            onToggle={() => setShowPassword(!showPassword)}
          />

          <div className='flex items-center mb-6'>
						<Link to='/forget-password' className='text-sm text-violet-400 hover:underline'>
							Forgot password?
						</Link>
					</div>
          {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}

          <motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						className='w-full py-3 px-4 bg-gradient-to-r from-violet-500 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:from-violet-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
						type='submit'
						disabled={isLoading}
					>
								{isLoading ? <Loader className='w-6 h-6 animate-spin  mx-auto' /> : "Login"}
					</motion.button>
      </form>
    </div>
    <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
				<p className='text-sm text-gray-400'>
					Don't have an account?{" "}
					<Link to='/signup' className='text-violet-400 hover:underline'>
						Sign up
					</Link>
				</p>
			</div>
    </motion.div>
  )
}

export default Login
