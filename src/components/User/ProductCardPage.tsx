"use client"

import { RootState } from '@/redux/store'
import React from 'react'
import { useSelector } from 'react-redux'
import ProductCard from '../ProductCard'
import { motion } from 'motion/react'
import { Sparkles } from 'lucide-react'

function ProductCardPage() {

  const { allProductsData } = useSelector((state: RootState) => state.vendor)

  const product = Array.isArray(allProductsData) ? allProductsData.filter((p: any) => p.isActive === true && p.verificationStatus === "approved") : []

  return (
    <div className='min-h-screen w-full bg-linear-to-br from-gray-900 via-black to-gray-900 px-4 py-10 sm:py-14'>
      <div className='max-w-7xl mx-auto mb-12 sm:mb-16 text-center'>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-5'
        >
          <Sparkles size={14} className='text-amber-400' />
          <span className='text-xs font-medium text-gray-300 tracking-wide uppercase'>Verified Sellers</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className='text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight'
        >
          Explore Verified & Trending Products
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className='text-sm sm:text-base text-gray-400 mt-3 max-w-xl mx-auto leading-relaxed'
        >
          Shop only from approved sellers with guaranteed quality and authentic products
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className='w-24 h-1 bg-amber-500 rounded-full mx-auto mt-6'
        />
      </div>

      <div className='max-w-7xl mx-auto'>
        {product.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className='text-center mt-24'
          >
            <div className='w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10'>
              <Sparkles size={32} className='text-gray-500' />
            </div>
            <p className='text-gray-400 text-lg font-medium'>No products available right now</p>
            <p className='text-gray-600 text-sm mt-1'>Check back later for amazing deals</p>
          </motion.div>
        ) : (
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5'>
            {product.map((p: any, index: number) => (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: "easeOut"
                }}
                viewport={{ once: true, amount: 0.1 }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductCardPage