'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { cn } from "../../lib/utils"
import { login } from '../../api/auth'
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(formData);
      setLoading(false);
      toast.success("Login successful");
      router.push("/")
    } catch (err) {
      setLoading(false);
      console.log(err)
      toast.error(err?.response?.data?.message || err?.message || "Failed to login");
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl w-full flex"
      >
        <div className="w-full lg:w-1/2 p-8 sm:p-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome back</h2>
            <p className="text-gray-600 mb-8">Enter your credentials to access your account</p>
          </motion.div>
          <form>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10 w-full"
                    name={'email'}
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 w-full"
                    name={'password'}
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105" onClick={handleSubmit} disabled={loading}>
                {loading ? "Loading..." : "Sign in"}
              </Button>
            </div>
          </form>
          <p className="mt-8 text-center text-sm text-gray-600">
            Dont have an account?{' '}
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign up
            </a>
          </p>
        </div>
        <div className="hidden lg:block w-1/2 bg-indigo-600 p-8 sm:p-12">
          <div className="h-full flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-white"
            >
              <h2 className="text-4xl font-bold mb-6">Discover a World of Possibilities</h2>
              <p className="text-lg mb-8">Login to explore our amazing features and services.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex justify-center"
            >
              <svg className="w-full max-w-md" viewBox="0 0 1090 920" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="545" cy="545" r="375" fill="#4F46E5" fillOpacity="0.1" />
                <circle cx="545" cy="545" r="300" fill="#4F46E5" fillOpacity="0.2" />
                <circle cx="545" cy="545" r="225" fill="#4F46E5" fillOpacity="0.3" />
                <path d="M545 295V795M295 545H795" stroke="white" strokeWidth="20" strokeLinecap="round" />
                <circle cx="545" cy="545" r="50" fill="white" />
              </svg>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}