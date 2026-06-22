"use client"

import { IProduct } from '@/models/product.mode'
import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Image from 'next/image'
import { ArrowLeftIcon, ArrowRight } from 'lucide-react'
import { FaShoppingCart, FaStar } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

function ProductCard({ product }: { product: IProduct }) {

  const router = useRouter()

  const images = [
    product.image1,
    product.image2,
    product.image3,
    product.image4,
  ].filter(Boolean)

  const [current, setCurrent] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length)
  }, [images.length])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  return (
    <motion.div
      onClick={() => router.push(`/viewProduct/${product._id}`)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.15 }}
      whileHover={{ y: -6 }}
      className='group bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden border border-white/10 cursor-pointer transition-shadow duration-300'
    >
      {/* IMAGES ===================================================== */}
      <div className='relative w-full h-[200px] sm:h-[240px] md:h-[260px] bg-gray-50 overflow-hidden'>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className='relative w-full h-full'
          >
            <Image
              src={images[current]}
              alt={product.title}
              fill
              className={`object-contain p-3 sm:p-4 transition-transform duration-300 ease-out ${isHovered ? 'sm:scale-110' : 'scale-100'}`}
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlay on hover (desktop only, mobile doesn't have hover) */}
        <div className={`absolute inset-0 bg-black/0 transition-all duration-300 ${isHovered ? 'sm:bg-black/5' : ''}`} />

        {/* Navigation arrows: always visible on mobile, hover-reveal on sm+ */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev()
              }}
              className='absolute left-1.5 sm:left-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 sm:p-2.5 rounded-full text-gray-800 shadow-lg hover:bg-white active:scale-95 sm:hover:scale-110 transition-all duration-200 z-10 opacity-100 sm:opacity-0 sm:group-hover:opacity-100'
            >
              <ArrowLeftIcon size={13} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                next()
              }}
              className='absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 sm:p-2.5 rounded-full text-gray-800 shadow-lg hover:bg-white active:scale-95 sm:hover:scale-110 transition-all duration-200 z-10 opacity-100 sm:opacity-0 sm:group-hover:opacity-100'
            >
              <ArrowRight size={13} />
            </button>
          </>
        )}

        {/* Dots */}
        {images.length > 1 && (
          <div className='absolute bottom-2.5 sm:bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5'>
            {images.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${current === i ? "bg-gray-900 w-5" : "bg-gray-400/60 w-1.5"}`}
              />
            ))}
          </div>
        )}

        {/* Verified badge */}
        <div className='absolute top-2.5 sm:top-3 left-2.5 sm:left-3'>
          <span className='inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 bg-green-500/90 backdrop-blur-sm text-white text-[9px] sm:text-[10px] font-bold rounded-full uppercase tracking-wider shadow-lg'>
            Verified
          </span>
        </div>
      </div>

      {/* PRODUCT DATA ================================================================ */}
      <div className='p-3 sm:p-4 md:p-5 space-y-2 sm:space-y-2.5'>
        <div className='flex items-start justify-between gap-2'>
          <h3 className='font-semibold text-sm sm:text-base text-gray-900 line-clamp-1 leading-tight'>
            {product.title}
          </h3>
        </div>

        <p className='text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wider line-clamp-1'>{product.category}</p>

        <div className='flex items-center justify-between gap-2'>
          <p className='font-bold text-lg sm:text-xl text-green-600 truncate'>${product.price}</p>
          <div className='flex items-center gap-1 text-yellow-500 text-xs shrink-0'>
            <FaStar size={11} />
            <span className='text-gray-600 font-medium'>5.0</span>
          </div>
        </div>

        <div className='flex items-center gap-0.5'>
          {[1, 2, 3, 4, 5].map((i) => (
            <FaStar key={i} size={10} className='text-yellow-400' />
          ))}
          <span className='text-gray-400 text-[10px] sm:text-xs ml-1.5'>(120)</span>
        </div>

        <div className='pt-2 border-t border-gray-100'>
          <p className='text-[11px] sm:text-xs text-gray-500 truncate'>
            Sold by: <span className='text-gray-700 font-medium'>{product.vendor.shopName}</span>
          </p>
        </div>

        <motion.button
          onClick={(e) => e.stopPropagation()}
          whileHover={{ scale: 1.02, backgroundColor: "#1a1a1a" }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.15 }}
          className='w-full mt-2 bg-gray-900 text-white py-2 sm:py-2.5 rounded-xl flex items-center justify-center gap-2 font-medium text-xs sm:text-sm shadow-lg shadow-gray-900/20 hover:shadow-gray-900/30 transition-all duration-200'
        >
          <FaShoppingCart size={13} />
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  )
}

export default ProductCard