"use client"

import React, { useState, useEffect, useCallback } from 'react'
import slide1 from "@/assets/slide1.jpg"
import slide2 from "@/assets/slide2.jpg"
import slide3 from "@/assets/slide3.jpg"
import slide4 from "@/assets/slide4.jpg"
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'

function Slider() {
  const [current, setCurrent] = useState<number>(0)

  const slides = [
    {
      image: slide1,
      title: "Happy Shopping",
      subtitle: "Shop & Smile",
      description: "Two friends enjoying their shopping spree and capturing the perfect selfie moment together.",
      button: "Discover"
    },
    {
      image: slide2,
      title: "Step in Style",
      subtitle: "Premium Footwear",
      description: "Discover our exclusive collection of premium shoes designed for comfort and elegance.",
      button: "Discover"
    },
    {
      image: slide3,
      title: "Digital World",
      subtitle: "Smart Gadgets",
      description: "Explore the latest smartphones, laptops, and cutting-edge digital devices for modern life.",
      button: "Discover"
    },
    {
      image: slide4,
      title: "Timeless Elegance",
      subtitle: "Luxury Watches",
      description: "Elevate your style with our stunning collection of elegant watches for every occasion.",
      button: "Discover"
    }
  ]

  const nextSlide = useCallback(() => {
    setCurrent((prev: number) => (prev + 1) % slides.length)
  }, [slides.length])

  const goToSlide = (index: number) => {
    setCurrent(index)
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000)
    return () => clearInterval(interval)
  }, [nextSlide])

  return (
    <div className="relative w-full h-[85vh] rounded-2xl sm:h-[90vh] md:h-[95vh] overflow-hidden bg-black">
      {/* Background Image - Full Screen */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={slides[current].image}
            alt={slides[current].title}
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center px-6 sm:px-10 md:px-16 lg:px-24">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-lg sm:max-w-xl"
          >
            {/* Subtitle */}
            <div className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md">
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/80">
                {slides[current].subtitle}
              </span>
            </div>

            {/* Title */}
            <h1 className="mb-4 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              {slides[current].title}
            </h1>

            {/* Description */}
            <p className="mb-8 text-sm leading-relaxed text-white/70 sm:text-base md:text-lg max-w-md">
              {slides[current].description}
            </p>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden rounded-full bg-white px-8 py-3 text-sm font-semibold uppercase tracking-wider text-black transition-all duration-300 hover:bg-white/90 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] sm:px-10 sm:py-3.5 sm:text-base"
            >
              <span className="relative z-10 flex items-center gap-2">
                {slides[current].button}
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-24 right-6 z-10 hidden sm:block md:right-16">
        <div className="flex items-end gap-1 text-white">
          <span className="text-3xl font-bold">{String(current + 1).padStart(2, '0')}</span>
          <span className="mb-1 text-sm text-white/50">/</span>
          <span className="mb-1 text-sm text-white/50">{String(slides.length).padStart(2, '0')}</span>
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3">
        {slides.map((_, index: number) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="group relative p-2"
          >
            <div className={`h-2.5 w-2.5 rounded-full border-2 transition-all duration-500 ${
              current === index ? 'border-white bg-white scale-125' : 'border-white/40 bg-transparent hover:border-white/70'
            }`} />
          </button>
        ))}
      </div>
      
    </div>
  )
}

export default Slider