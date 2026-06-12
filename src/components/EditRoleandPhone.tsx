"use client"

import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { User, Store, ShieldCheck, Loader2, ArrowRight, Phone } from "lucide-react";

import axios from 'axios'
import { useRouter } from 'next/navigation';

// ==========================================================================================

function EditRoleandPhone() {

  const router = useRouter()

  const [role, setRole] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState(false)

  const roles = [
    { label: "User", icon: <User size={22} strokeWidth={1.5} />, value: "user" },
    { label: "Vendor", icon: <Store size={22} strokeWidth={1.5} />, value: "vendor" },
    { label: "Admin", icon: <ShieldCheck size={22} strokeWidth={1.5} />, value: "admin" },
  ]

  const [adminExist, setAdminExist] = useState(false)

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await axios.get("/api/admin/check-admin")
        setAdminExist(res.data.exists)
      } catch (error) {
        setAdminExist(false)
        console.log(error)
      }
    }
    checkAdmin()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!role || !phone) {
      alert("Please select the role and enter the phone number")
      return;
    }
    setLoading(true)
    try {
      const result = await axios.post("/api/user/edit-role-phone", { role, phone })
      setLoading(false)
      router.push("/")
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-4 sm:p-6'>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -40, scale: 0.95 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className='w-full max-w-lg bg-white/10 backdrop-blur-md rounded-3xl shadow-xl p-6 sm:p-10 border border-white/10'
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className='text-center mb-8'
          >
            <div className='w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25'>
              <User size={26} className='text-white' />
            </div>
            <h1 className='text-3xl sm:text-4xl font-bold text-white mb-3 tracking-tight'>
              Choose Your Role
            </h1>
            <p className='text-gray-300 text-base sm:text-lg leading-relaxed max-w-sm mx-auto'>
              Select your role and enter your mobile number to continue.
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className='flex flex-col gap-6'>

            {/* Phone Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className='relative'
            >
              <label className='block text-sm font-semibold text-gray-300 mb-2 ml-1'>
                Mobile Number
              </label>
              <div className={`relative flex items-center transition-all duration-300 rounded-xl border-2 ${focused ? 'border-blue-500 shadow-lg shadow-blue-500/20' : 'border-white/20 hover:border-white/30'} bg-white/10`}>
                <Phone size={18} className={`absolute left-4 transition-colors duration-300 ${focused ? 'text-blue-400' : 'text-gray-400'}`} />
                <input
                  type="tel"
                  placeholder='Enter your mobile number...'
                  maxLength={12}
                  required
                  onChange={(e) => setPhone(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  value={phone}
                  className='w-full bg-transparent border-none rounded-xl py-4 pl-12 pr-4 text-base text-white placeholder:text-gray-400 focus:outline-none focus:ring-0'
                />
              </div>
            </motion.div>

            {/* Role Selection */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <label className='block text-sm font-semibold text-gray-300 mb-3 ml-1'>
                Select Role
              </label>
              <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
                {roles.map((rol, index) => {
                  const isAdminBlocked = rol.value === "admin" && adminExist
                  const isSelected = role === rol.value

                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                      whileHover={!isAdminBlocked ? { y: -4, scale: 1.02 } : {}}
                      whileTap={!isAdminBlocked ? { scale: 0.98 } : {}}
                      onClick={() => {
                        if (isAdminBlocked) {
                          alert("⚠️ Admin already exists. You cannot select Admin role.")
                          return;
                        }
                        setRole(rol.value)
                      }}
                      key={rol.value}
                      className={`relative cursor-pointer p-5 text-center rounded-2xl border-2 transition-all duration-300 ${
                        isSelected
                          ? "border-blue-500 bg-blue-500/40 shadow-lg shadow-blue-500/20"
                          : "border-white/20 bg-white/10 hover:bg-white/20 hover:border-white/30"
                      } ${isAdminBlocked ? "opacity-40 cursor-not-allowed" : ""}`}
                    >
                      {/* Selection Indicator */}
                      {isSelected && (
                        <motion.div
                          layoutId="selectionIndicator"
                          className='absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-md'
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        >
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2.5 6L5 8.5L9.5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </motion.div>
                      )}

                      <div className={`flex justify-center mb-3 transition-colors duration-300 ${isSelected ? 'text-blue-400' : 'text-gray-400'}`}>
                        {rol.icon}
                      </div>
                      <p className={`text-sm font-semibold transition-colors duration-300 ${isSelected ? 'text-blue-300' : 'text-gray-300'}`}>
                        {rol.label}
                      </p>

                      {isAdminBlocked && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className='text-[11px] text-red-400 mt-2 font-medium bg-red-500/10 rounded-lg py-1 px-2'
                        >
                          Already Exists
                        </motion.p>
                      )}
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <motion.button
                type="submit"
                disabled={loading || !role || !phone}
                whileHover={{ scale: loading ? 1 : 1.02, y: loading ? 0 : -2 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className="mt-2 w-full py-4 px-6 flex items-center justify-center gap-2.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:from-gray-700 disabled:to-gray-600 disabled:cursor-not-allowed rounded-xl font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 text-base"
              >
                {loading ? (
                  <>
                    <span>Processing...</span>
                    <Loader2 size={18} className="animate-spin" />
                  </>
                ) : (
                  <>
                    <span>Continue</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </motion.button>
            </motion.div>

            {/* Helper Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className='text-center text-xs text-gray-500 mt-2'
            >
              By continuing, you agree to our Terms of Service
            </motion.p>
          </form>

        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default EditRoleandPhone