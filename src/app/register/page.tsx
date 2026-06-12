"use client"

import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { User, Store, ShieldCheck, ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { signIn } from 'next-auth/react';

function Register() {
  const router = useRouter()

  const [step, setStep] = useState<1 | 2>(1)
  const [selectedRole, setSelectedRole] = useState<string>("user")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const roles = [
    { label: "User", icon: <User size={24} />, value: "user" },
    { label: "Vendor", icon: <Store size={24} />, value: "vendor" },
    { label: "Admin", icon: <ShieldCheck size={24} />, value: "admin" },
  ]

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !password.trim()) return
    
    setLoading(true)
    try {
      const result = await axios.post("/api/auth/register", {
        name,
        email,
        password,
        role: selectedRole
      })
      
      setName("")
      setEmail("")
      setPassword("")
      router.push("/login")
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white p-4 sm:p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <AnimatePresence mode="wait">
        {/* STEP 1 - Role Selection */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-lg relative z-10"
          >
            <div className="bg-white/[0.03] backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-10 border border-white/[0.08] hover:border-white/[0.12] transition-colors duration-500">
              <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Welcome to MultiCart
                </h1>
                <p className="text-gray-400 text-sm sm:text-base">
                  Choose your account type to get started
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {roles.map((item) => (
                  <motion.div
                    key={item.value}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedRole(item.value)}
                    className={`p-5 cursor-pointer rounded-2xl border transition-all duration-300 flex flex-col items-center gap-3 ${
                      selectedRole === item.value
                        ? "bg-blue-500/10 border-blue-500/40 shadow-lg shadow-blue-500/10"
                        : "bg-white/[0.02] border-white/[0.08] hover:bg-white/[0.05] hover:border-white/20"
                    }`}
                  >
                    <span className={`transition-colors duration-300 ${
                      selectedRole === item.value ? "text-blue-400" : "text-gray-400"
                    }`}>
                      {item.icon}
                    </span>
                    <span className={`text-sm font-semibold transition-colors duration-300 ${
                      selectedRole === item.value ? "text-blue-300" : "text-gray-300"
                    }`}>
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>

              <motion.button
                onClick={() => setStep(2)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 px-6 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-xl font-medium text-white shadow-lg shadow-blue-500/20 transition-all duration-300"
              >
                Continue
                <ArrowRight size={18} />
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* STEP 2 - Registration Form */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md relative z-10"
          >
            <div className="bg-white/[0.03] backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-10 border border-white/[0.08] hover:border-white/[0.12] transition-colors duration-500">
              <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Create Account
                </h1>
                <p className="text-gray-400 text-sm">
                  Fill in your details to register
                </p>
              </div>

              <form onSubmit={handleSignUp} className="flex flex-col gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-gray-400 font-medium ml-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:bg-white/[0.05]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-gray-400 font-medium ml-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:bg-white/[0.05]"
                  />
                </div>

                <div className="space-y-1 relative">
                  <label className="text-xs text-gray-400 font-medium ml-1">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl px-4 py-3 pr-12 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:bg-white/[0.05]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200 p-1"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="mt-2 w-full py-3.5 px-6 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:from-gray-700 disabled:to-gray-600 disabled:cursor-not-allowed rounded-xl font-medium text-white shadow-lg shadow-blue-500/20 transition-all duration-300"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Register Now
                      <ArrowRight size={18} />
                    </>
                  )}
                </motion.button>

                <div className="flex items-center gap-3 my-2">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">or</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>

                <motion.button
                onClick={()=>signIn("google", {callbackUrl:"/"})}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-3 py-3.5 bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.1] hover:border-white/20 rounded-xl transition-all duration-300 group"
                >
                  <FcGoogle className="w-5 h-5 transition-transform group-hover:scale-110" />
                  <span className="font-medium text-gray-300 group-hover:text-white transition-colors">Continue With Google</span>
                </motion.button>

                <p className="text-center text-sm mt-2 text-gray-400">
                  Already have an account?{" "}
                  <span
                    onClick={() => router.push("/login")}
                    className="text-blue-400 hover:text-blue-300 cursor-pointer font-medium hover:underline transition-colors duration-200"
                  >
                    Sign In
                  </span>
                </p>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Register