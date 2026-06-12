"use client"

import React, { useState } from 'react'
import { ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import {AnimatePresence, motion} from 'motion/react'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react';

function SignIn() {

  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const session = useSession()
 

  const handleSignIn = async (e:React.FormEvent) => {
    e.preventDefault()
      setLoading(true)
      try {
        const result = await signIn("credentials", {
          email,
          password,
          redirect:false
        })
        alert("SignIn Successfully")
        router.push("/")
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-black to-gray-900 text-white p-6'>

      <AnimatePresence>
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
                  Welcome Back!
                </h1>
                <p className="text-gray-400 text-sm">
                 TO Multi-Cart
                </p>
              </div>

              <form onSubmit={handleSignIn}  className="flex flex-col gap-4">
              

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
                       Account Loging ...
                    </>
                  ) : (
                    <>
                       Login
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
                  <span className="font-medium text-gray-300 group-hover:text-white transition-colors">Login With Google</span>
                </motion.button>

                <p className="text-center text-sm mt-2 text-gray-400">
                 create new account{" "}
                  <span
                    onClick={() => router.push("/register")}
                    className="text-blue-400 hover:text-blue-300 cursor-pointer font-medium hover:underline transition-colors duration-200"
                  >
                    Sign Up
                  </span>
                </p>
              </form>
            </div>
          </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default SignIn