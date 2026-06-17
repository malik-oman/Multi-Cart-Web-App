"use client"

import React from 'react'
import {motion} from 'motion/react'
import { useRouter } from 'next/navigation'

function VendorProducts() {

  const router = useRouter()

  return (
    <div className='w-full p-4 sm:p-8 text-white'>

      {/* HEADER============================================ */}
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl sm:text-3xl font-bold'>My Products</h1>

        <motion.div 
        onClick={()=>router.push("/addVendorProduct")}
        whileHover={{scale:1.03}}
        whileTap={{scale:0.97}}
        className='bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg
        font-semibold text-sm sm:text-base cursor-pointer'>+ Add Product</motion.div>
      </div>
    </div>
  )
}

export default VendorProducts