"use client"

import { IProduct } from '@/models/product.mode'
import React, { useState } from 'react'
import {motion} from 'motion/react'
import Image from 'next/image'
import { ArrowLeftIcon, ArrowRight } from 'lucide-react'
 
function ProductCard({product}:{product:IProduct}) {

  const images = [
    product.image1,
    product.image2,
    product.image3,
    product.image4,
  ].filter(Boolean)

  const [current,setCurrent] = useState(0)

  const next = () => {
    setCurrent((prev)=>(prev + 1) % images.length)
  }

  const prev = () => {
    setCurrent((prev)=>(prev - 1 + images.length) % images.length)
  }

  return (
    <motion.div
    initial={{opacity:0, y:60}}
    whileInView={{opacity:1, y:0}}
    transition={{type:"spring", stiffness:70, damping: 18}}
    viewport={{once:false, amount:0.2}}
    whileHover={{scale:1.03}}
    className='bg-white rounded-xl shadow-md overflow-hidden border hover:shadow-xl transition cursor-pointer'>
      {/* IMAGES===================================================== */}

      <div className='relative w-full h-[220px] bg-gray-100 overflow-hidden flex items-center justify-center'>
          <div className='relative w-[90%] h-[90%] '>

            <Image src={images[current]} alt={product.title} fill className='object-contain' sizes="(max-width: 768px) 100w, 300px" />
          </div>

          <button
              onClick={(e)=>{
                e.stopPropagation();
                prev()
              }}
          className='absolute left-2 cursor-pointer top-1/2 -translate-y-1/2 bg-black/60 p-2 rounded-full text-white z-10'> 
            <ArrowLeftIcon size={14}/>
          </button>

          <button
          onClick={(e)=>{
            e.stopPropagation();
            next()
          }}
          className='absolute right-2 top-1/2 cursor-pointer -translate-y-1/2 bg-black/60 p-2 rounded-full text-white z-10'>
          <ArrowRight size={14}/>
          </button>
      </div>

      {/* PRODUCT DATA=============================================================== */}
      <div className='p-4 space-y-2'></div>
    </motion.div>
  )
}

export default ProductCard