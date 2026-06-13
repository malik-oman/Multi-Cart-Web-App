"use client"

import React, { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, FileText, HomeIcon, Loader2, ShoppingBagIcon } from 'lucide-react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

function EditVendorDetails() {

  const router = useRouter()

  const [shopName, setShopName] = useState("")
  const [shopAddress, setShopAddress] = useState("")
  const [gstNumber, setGstNumber] = useState("")
  const [loading, setLoading] = useState(false)


  const handleSubmit = async (e:React.FormEvent) => {
     e.preventDefault()
     if (!shopName || !shopAddress || !gstNumber) {
      alert("Fill all field")
      return
     }
     setLoading(true)
     try {
      const result = await axios.post("/api/vendor/editDetails",{shopName,shopAddress,gstNumber})
      console.log(result.data)
      alert("Vendor Shop Details added successfully")
      setLoading(false)
      router.push("/")
     } catch (error) {
      setLoading(false)
      console.log(error)
     }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white px-4 py-8 sm:px-6 lg:px-8'>

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className='w-full max-w-md sm:max-w-lg bg-white/[0.07] backdrop-blur-[16px] rounded-[2rem] shadow-2xl shadow-black/40 p-6 sm:p-10 border border-white/[0.08]'
        >
          {/* Header Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto mb-5 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center"
          >
            <ShoppingBagIcon className="text-blue-400" size={32} strokeWidth={1.5} />
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className='text-2xl sm:text-3xl font-bold text-center mb-2 tracking-tight bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent'
          >
            Complete Your Shop Details
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className='text-center text-gray-400 mb-8 text-sm sm:text-base leading-relaxed max-w-xs mx-auto'
          >
            Enter your business information to activate your vendor account and start selling.
          </motion.p>

          <form className='flex flex-col gap-5'
          onSubmit={handleSubmit}
          >

            {/* Shop Name */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className='group relative'
            >
              <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1 tracking-wide uppercase">
                Shop Name
              </label>
              <div className="relative">
                <ShoppingBagIcon className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors duration-300' size={20} strokeWidth={1.5} />
                <input
                  type="text"
                  placeholder='Enter your shop name'
                  required
                  className='w-full bg-white/[0.05] border border-white/[0.12] rounded-xl py-3.5 pl-12 pr-4 text-sm sm:text-base text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.08] focus:ring-1 focus:ring-blue-500/20 transition-all duration-300 hover:border-white/20'
                  onChange={(e) => setShopName(e.target.value)}
                  value={shopName}
                />
              </div>
            </motion.div>

            {/* Shop Address */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className='group relative'
            >
              <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1 tracking-wide uppercase">
                Shop Address
              </label>
              <div className="relative">
                <HomeIcon className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors duration-300' size={20} strokeWidth={1.5} />
                <input
                  type="text"
                  placeholder='Enter complete address'
                  required
                  className='w-full bg-white/[0.05] border border-white/[0.12] rounded-xl py-3.5 pl-12 pr-4 text-sm sm:text-base text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.08] focus:ring-1 focus:ring-blue-500/20 transition-all duration-300 hover:border-white/20'
                  onChange={(e) => setShopAddress(e.target.value)}
                  value={shopAddress}
                />
              </div>
            </motion.div>

            {/* GST Number */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className='group relative'
            >
              <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1 tracking-wide uppercase">
                GST Number
              </label>
              <div className="relative">
                <FileText className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors duration-300' size={20} strokeWidth={1.5} />
                <input
                  type="text"
                  placeholder='Enter GST number'
                  required
                  className='w-full bg-white/[0.05] border border-white/[0.12] rounded-xl py-3.5 pl-12 pr-4 text-sm sm:text-base text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.08] focus:ring-1 focus:ring-blue-500/20 transition-all duration-300 hover:border-white/20'
                  onChange={(e) => setGstNumber(e.target.value)}
                  value={gstNumber}
                />
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02, y: loading ? 0 : -2 }}
                whileTap={{ scale: loading ? 1 : 0.96 }}
                className="mt-3 w-full py-4 px-6 flex items-center justify-center gap-2.5 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 hover:from-blue-500 hover:via-blue-400 hover:to-blue-500 disabled:from-gray-700 disabled:via-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed rounded-xl font-semibold text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-400/30 transition-all duration-300 text-sm sm:text-base tracking-wide"
              >
                {loading ? (
                  <>
                    <span>Submitting...</span>
                    <Loader2 size={18} className="animate-spin" />
                  </>
                ) : (
                  <>
                    <span>Submit</span>
                    <ArrowRight size={18} strokeWidth={2.5} />
                  </>
                )}
              </motion.button>
            </motion.div>

            {/* Bottom Note */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center text-xs text-gray-500 mt-2"
            >
              Your information is securely encrypted and protected
            </motion.p>
          </form>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default EditVendorDetails