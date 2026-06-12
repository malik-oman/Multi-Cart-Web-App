"use client"

import React, { useState } from 'react'
import {
  LayoutDashboard,
  ShoppingCart,
  PackagePlus,
  ChevronRight,
  MenuIcon,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import DashboardVendor from './Dashboard';
import VendorProducts from './VendorProducts';
import VendorOrders from './VendorOrders';

function VendorDashboard() {

  const [activePage,setActivePage] = useState("dashboard")
  const [openMenu,setOpenMenu] = useState(false)

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'orders',
      label: 'User Orders',
      icon: ShoppingCart,
    },
    {
      id: 'products',
      label: 'Products',
      icon: PackagePlus,
    },
  ];

  const renderPage = () => {
    switch (activePage) {
      case "dashboard" : return <DashboardVendor/>;
      case "products" : return <VendorProducts/>;
      case "orders" : return <VendorOrders/>;
    }
  }

  return (
    <div className='w-full flex min-h-screen bg-[#0B1120] text-white pt-15'>

      {/* MOBILE HEADER ======================================= */}
      <div className='lg:hidden fixed top-0 left-0 w-full bg-[#1a2234] border-b border-gray-700 px-5 py-3.5 flex justify-between items-center z-50'>
        <div className='flex items-center gap-3'>
          <div className='w-9 h-9 rounded-lg bg-gray-700 flex items-center justify-center'>
            <span className='text-white font-bold text-sm'>V</span>
          </div>
          <h1 className='text-lg font-bold text-white'>Vendor Panel</h1>
        </div>
        { !openMenu && (
          <button 
            onClick={()=>setOpenMenu(true)}
            className='w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-all duration-300 active:scale-95'
          >
            <MenuIcon size={20} className='text-white'/>
          </button>
        )}
      </div>

      {/* SIDEBAR FOR LARGE AREA====================================== */}
      <motion.div
        initial={{x:-40, opacity:0}}
        animate={{x:0, opacity: 1}}
        transition={{duration: 0.5, ease: "easeOut"}}
        className='hidden lg:flex w-[260px] flex-col bg-[#1a2234] border-r border-gray-700'
      >
        {/* Logo Area - BRIGHTER BACKGROUND */}
        <div className='p-5 bg-[#252d3f] border-b border-gray-700'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 rounded-xl bg-gray-600 flex items-center justify-center'>
              <span className='text-white font-bold text-sm'>V</span>
            </div>
            <div>
              <h1 className='text-xl font-bold text-white tracking-tight'>Vendor Panel</h1>
              <p className='text-xs text-gray-400 mt-0.5'>Vendor Dashboard</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className='flex-1 p-4 overflow-y-auto'>
          <p className='text-xs font-bold text-gray-500 uppercase tracking-widest mb-3'>Menu</p>
          <div className='flex flex-col gap-1'>
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;

              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.04 }}
                  onClick={()=>setActivePage(item.id)}
                  className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium relative ${
                    isActive
                      ? "bg-gray-700 text-white shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className='absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-white'
                    />
                  )}

                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    isActive 
                      ? "bg-gray-600 text-white" 
                      : "bg-gray-800 text-gray-400 group-hover:text-gray-300"
                  }`}>
                    <Icon size={18} />
                  </div>
                  <span className='flex-1 text-left'>{item.label}</span>
                  <ChevronRight size={16} className={`transition-all duration-300 ${
                    isActive ? "text-gray-300 translate-x-0 opacity-100" : "text-gray-600 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                  }`} />
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Bottom Info */}
        <div className='p-4 border-t border-gray-700'>
          <div className='bg-[#252d3f] rounded-xl p-4 border border-gray-700'>
            <div className='flex items-center gap-2 mb-1'>
              <div className='w-2 h-2 rounded-full bg-green-400 animate-pulse'/>
              <span className='text-xs text-gray-300'>System Status</span>
            </div>
            <p className='text-xs text-gray-500'>All systems operational</p>
          </div>
        </div>
      </motion.div>

      {/* SIDEBAR FOR MOBILE========================================= */}
      <AnimatePresence>
        {openMenu && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className='lg:hidden fixed inset-0 bg-black/60 z-40'
              onClick={()=>setOpenMenu(false)}
            />

            <motion.div
              initial={{x:-280, opacity: 0}}
              animate={{x:0, opacity: 1}}
              exit={{x:-280, opacity: 0}}
              transition={{duration: 0.35, ease: "easeInOut"}}
              className='lg:hidden fixed top-0 left-0 w-[280px] h-full bg-[#1a2234] z-50 border-r border-gray-700 shadow-2xl'
            >
              {/* Header - BRIGHTER BACKGROUND */}
              <div className='flex justify-between items-center p-5 bg-[#252d3f] border-b border-gray-700'>
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 rounded-xl bg-gray-600 flex items-center justify-center'>
                    <span className='text-white font-bold text-sm'>V</span>
                  </div>
                  <div>
                    <h1 className='text-xl font-bold text-white tracking-tight'>Vendor Panel</h1>
                    <p className='text-xs text-gray-400 mt-0.5'>Vendor Dashboard</p>
                  </div>
                </div>
                <button 
                  onClick={()=>setOpenMenu(false)}
                  className='w-10 h-10 rounded-xl bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-all duration-300 active:scale-95'
                >
                  <X size={20} className='text-white'/>
                </button>
              </div>

              {/* Menu Items */}
              <div className='p-4'>
                <p className='text-xs font-bold text-gray-500 uppercase tracking-widest mb-3'>Menu</p>
                <div className='flex flex-col gap-1'>
                  {menuItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = activePage === item.id;

                    return (
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.04 }}
                        onClick={()=>{setOpenMenu(false);setActivePage(item.id)}}
                        className={`group flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 text-sm font-medium ${
                          isActive
                            ? "bg-gray-700 text-white shadow-lg"
                            : "text-gray-400 hover:text-white hover:bg-gray-800"
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                          isActive 
                            ? "bg-gray-600 text-white" 
                            : "bg-gray-800 text-gray-400 group-hover:text-gray-300"
                        }`}>
                          <Icon size={18} />
                        </div>
                        <span className='flex-1 text-left'>{item.label}</span>
                        <ChevronRight size={16} className={`transition-all duration-300 ${
                          isActive ? "text-gray-300" : "text-gray-600"
                        }`} />
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* MAIN AREA============================================== */}
      <motion.div
        initial={{opacity:0, x:20}}
        animate={{opacity:1, x:0}}
        transition={{duration: 0.5, ease: "easeOut"}}
        className='flex-1 p-6 lg:p-8 pt-20 lg:pt-8 min-h-screen'
      >
        <div className='max-w-7xl mx-auto'>
          {/* Page Header */}
          <div className='mb-6'>
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className='flex items-center gap-2 mb-1.5'
            >
              <div className='w-1.5 h-1.5 rounded-full bg-gray-500'/>
              <span className='text-xs font-medium text-gray-500 uppercase tracking-widest'>Vendor Console</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className='text-xl lg:text-2xl font-bold text-white tracking-tight'
            >
              {menuItems.find(item => item.id === activePage)?.label}
            </motion.h2>
          </div>

          {/* Content */}
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            {renderPage()}
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default VendorDashboard