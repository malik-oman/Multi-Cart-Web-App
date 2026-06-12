"use client"

import React, { useState, useEffect, useCallback, useRef } from 'react'
import {
  Shirt,
  Watch,
  Home,
  Armchair,
  ShoppingBag,
  Diamond,
  Dumbbell,
  Baby,
  BookOpen,
  Car,
  Gamepad2,
  UtensilsCrossed,
  Paintbrush,
  HeartPulse,
  Sparkles,
  Laptop,
  ChevronLeft,
  ChevronRight,
  Zap,
  ShoppingCart,
  GraduationCap,
  Truck,
  Joystick,
  Sparkle,
  Heart,
  Monitor,
  Crown,
  GlassWater,
  Bike,
  Camera,
  Coffee,
  Gift,
  Headphones,
  Music,
  Palette,
  Plane,
  Rocket,
  Trophy,
  Wand2,
  Wine,
  Wrench
} from "lucide-react";
import { AnimatePresence, motion } from 'motion/react';

function CategorySlider() {
  const [startIndex, setStartIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const categories = [
    { label: "Fashion", icon: Shirt },
    { label: "Electronics", icon: Zap },
    { label: "Home & Living", icon: Home },
    { label: "Furniture", icon: Armchair },
    { label: "Accessories", icon: Watch },
    { label: "Bags & Luggage", icon: ShoppingCart },
    { label: "Jewelry", icon: Diamond },
    { label: "Sports & Fitness", icon: Dumbbell },
    { label: "Baby & Kids", icon: Baby },
    { label: "Books & Stationery", icon: BookOpen },
    { label: "Automotive", icon: Car },
    { label: "Gaming", icon: Joystick },
    { label: "Kitchen & Dining", icon: UtensilsCrossed },
    { label: "Beauty & Care", icon: Sparkle },
    { label: "Health & Wellness", icon: HeartPulse },
    { label: "Lifestyle", icon: Sparkles },
    { label: "Computers", icon: Monitor },
    { label: "Cameras", icon: Camera },
    { label: "Audio", icon: Headphones },
    { label: "Toys & Hobbies", icon: Gamepad2 },
    { label: "Travel", icon: Plane },
    { label: "Gifts", icon: Gift },
    { label: "Art & Craft", icon: Palette },
    { label: "Outdoor", icon: Bike }
  ];

  // Responsive items per slide
  const getItemsPerSlide = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 3;
      if (window.innerWidth < 768) return 4;
      if (window.innerWidth < 1024) return 5;
      if (window.innerWidth < 1280) return 6;
      return 7;
    }
    return 7;
  };

  const [itemsPerSlide, setItemsPerSlide] = useState(7);
  const totalSlides = Math.ceil(categories.length / itemsPerSlide);

  useEffect(() => {
    const handleResize = () => setItemsPerSlide(getItemsPerSlide());
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getVisibleCategories = useCallback(() => {
    const visible = [];
    for (let i = 0; i < itemsPerSlide; i++) {
      const index = (startIndex + i) % categories.length;
      visible.push({ ...categories[index], originalIndex: index });
    }
    return visible;
  }, [startIndex, itemsPerSlide, categories]);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setStartIndex((prev) => (prev + itemsPerSlide) % categories.length);
  }, [itemsPerSlide]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setStartIndex((prev) => (prev - itemsPerSlide + categories.length) % categories.length);
  }, [itemsPerSlide]);

  // Auto-play with smooth pause and resume
  useEffect(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 4000);
    }
    
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, nextSlide]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.95,
    })
  };

  // Vibrant icon colors for dark theme
  const iconColors = [
    "text-rose-400", "text-sky-400", "text-emerald-400", "text-amber-400",
    "text-violet-400", "text-orange-400", "text-pink-400", "text-cyan-400",
    "text-lime-400", "text-indigo-400", "text-red-400", "text-teal-400",
    "text-yellow-400", "text-fuchsia-400", "text-green-400", "text-blue-400",
    "text-purple-400"
  ];

  const hoverColors = [
    "group-hover:text-rose-300", "group-hover:text-sky-300", "group-hover:text-emerald-300",
    "group-hover:text-amber-300", "group-hover:text-violet-300", "group-hover:text-orange-300",
    "group-hover:text-pink-300", "group-hover:text-cyan-300", "group-hover:text-lime-300",
    "group-hover:text-indigo-300", "group-hover:text-red-300", "group-hover:text-teal-300",
    "group-hover:text-yellow-300", "group-hover:text-fuchsia-300", "group-hover:text-green-300",
    "group-hover:text-blue-300", "group-hover:text-purple-300"
  ];

  const bgColors = [
    "bg-rose-500/15", "bg-sky-500/15", "bg-emerald-500/15", "bg-amber-500/15",
    "bg-violet-500/15", "bg-orange-500/15", "bg-pink-500/15", "bg-cyan-500/15",
    "bg-lime-500/15", "bg-indigo-500/15", "bg-red-500/15", "bg-teal-500/15",
    "bg-yellow-500/15", "bg-fuchsia-500/15", "bg-green-500/15", "bg-blue-500/15",
    "bg-purple-500/15"
  ];

  const borderHoverColors = [
    "group-hover:border-rose-500/40", "group-hover:border-sky-500/40", "group-hover:border-emerald-500/40",
    "group-hover:border-amber-500/40", "group-hover:border-violet-500/40", "group-hover:border-orange-500/40",
    "group-hover:border-pink-500/40", "group-hover:border-cyan-500/40", "group-hover:border-lime-500/40",
    "group-hover:border-indigo-500/40", "group-hover:border-red-500/40", "group-hover:border-teal-500/40",
    "group-hover:border-yellow-500/40", "group-hover:border-fuchsia-500/40", "group-hover:border-green-500/40",
    "group-hover:border-blue-500/40", "group-hover:border-purple-500/40"
  ];

  const shadowColors = [
    "group-hover:shadow-rose-500/20", "group-hover:shadow-sky-500/20", "group-hover:shadow-emerald-500/20",
    "group-hover:shadow-amber-500/20", "group-hover:shadow-violet-500/20", "group-hover:shadow-orange-500/20",
    "group-hover:shadow-pink-500/20", "group-hover:shadow-cyan-500/20", "group-hover:shadow-lime-500/20",
    "group-hover:shadow-indigo-500/20", "group-hover:shadow-red-500/20", "group-hover:shadow-teal-500/20",
    "group-hover:shadow-yellow-500/20", "group-hover:shadow-fuchsia-500/20", "group-hover:shadow-green-500/20",
    "group-hover:shadow-blue-500/20", "group-hover:shadow-purple-500/20"
  ];

  const visibleCategories = getVisibleCategories();

  return (
    <div className="relative w-full mx-auto overflow-hidden">
      {/* Animated Background Gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-900"
      >
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59,130,246,0.15) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
        {/* Animated glow orbs */}
        <div className="absolute top-20 left-[10%] w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-20 right-[10%] w-80 h-80 bg-indigo-600/10 rounded-full blur-[100px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px]" />
      </div>

      <div 
        className="relative z-10 max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8"
        ref={sliderRef}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/* Section Header with enhanced animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-xs font-medium text-gray-300 tracking-wide">Discover Collections</span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-3">
            Shop by Categories
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 mx-auto rounded-full mb-5" />
          <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto">
            Explore our wide range of premium collections
          </p>
        </motion.div>

        {/* Slider */}
        <div className="relative">
          {/* Previous Button */}
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.15)" }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:border-white/30 transition-all duration-200 -translate-x-1 sm:-translate-x-5 shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>

          {/* Slider Container */}
          <div className="overflow-hidden px-6 sm:px-10">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={startIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 400, damping: 40, duration: 0.4 },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 }
                }}
                className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4 sm:gap-5 md:gap-6"
              >
                {visibleCategories.map((category, idx) => {
                  const IconComponent = category.icon;
                  const colorIndex = category.originalIndex % iconColors.length;
                  return (
                    <motion.div
                      key={`${startIndex}-${category.originalIndex}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.03 }}
                      whileHover={{ 
                        scale: 1.05,
                        transition: { type: "spring", stiffness: 400, damping: 15 }
                      }}
                      className="group cursor-pointer"
                    >
                      <div className={`flex flex-col items-center gap-3 p-4 sm:p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 ${borderHoverColors[colorIndex]} hover:shadow-xl ${shadowColors[colorIndex]} transition-all duration-200`}>
                        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${bgColors[colorIndex]} flex items-center justify-center transition-all duration-200 group-hover:scale-110 group-hover:rounded-2xl`}>
                          <IconComponent className={`w-6 h-6 sm:w-7 sm:h-7 ${iconColors[colorIndex]} ${hoverColors[colorIndex]} transition-all duration-200`} />
                        </div>
                        <span className="text-[11px] sm:text-xs font-medium text-gray-300 group-hover:text-white transition-colors duration-200 text-center">
                          {category.label}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next Button */}
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.15)" }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:border-white/30 transition-all duration-200 translate-x-1 sm:translate-x-5 shadow-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Dots Navigation */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {Array.from({ length: totalSlides }).map((_, idx) => {
            const slideStart = idx * itemsPerSlide;
            const isActive = startIndex >= slideStart && startIndex < slideStart + itemsPerSlide;
            return (
              <motion.button
                key={idx}
                onClick={() => {
                  setDirection(idx * itemsPerSlide > startIndex ? 1 : -1);
                  setStartIndex(idx * itemsPerSlide);
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-8 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400"
                    : "w-1.5 bg-gray-600 hover:bg-gray-500"
                }`}
              />
            );
          })}
        </div>
        
        {/* Auto-play indicator */}
        <div className="flex justify-center mt-6">
          <div className="flex items-center gap-2 text-[10px] text-gray-500">
            <div className={`w-1 h-1 rounded-full ${isAutoPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-600'}`} />
            <span>{isAutoPlaying ? 'Auto-scrolling' : 'Paused'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategorySlider;