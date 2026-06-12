"use client"

import { IUser } from '@/models/user.model'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState, useRef, useEffect } from 'react'
import logo from "@/assets/logo.png"
import { AnimatePresence, motion } from 'framer-motion'
import {
  LogInIcon,
  LogOutIcon,
  PhoneIcon,
  SearchIcon,
  ShoppingCartIcon,
  User,
  User2,
  Menu,
  X,
  Home,
  Grid3X3,
  Store,
  Package,
  ChevronRight,
} from 'lucide-react'
import { signOut } from 'next-auth/react'

function Navbar({ user }: { user: IUser }) {
  const router = useRouter()
  const [openMenu, setOpenMenu] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenMenu(false)
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [mobileMenuOpen])

  const navLinks = [
    { label: "Home", path: "/", icon: Home },
    { label: "Categories", path: "/category", icon: Grid3X3 },
    { label: "Shop", path: "/shop", icon: Store },
    { label: "Orders", path: "/orders", icon: Package },
  ]

  return (
    <>
      {/* NAVBAR */}
      <div className='fixed top-0 left-0 w-full text-white z-40 shadow-lg backdrop-blur-md bg-black/40 border-b border-white/10'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center'>

          {/* LOGO */}
          <motion.div
            className='flex items-center gap-3 cursor-pointer group'
            onClick={() => router.push("/")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className='relative'>
              <div className='absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
              <div className='relative w-10 h-10 rounded-full bg-gradient-to-br from-white/10 to-white/5 p-[2px] group-hover:from-blue-400/30 group-hover:to-purple-400/30 transition-all duration-500'>
                <div className='w-full h-full rounded-full bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] flex items-center justify-center overflow-hidden'>
                  <Image src={logo} width={36} height={36} alt='logo' className='w-9 h-9 rounded-full object-cover' />
                </div>
              </div>
              <div className='absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-[#0a0a0a] shadow-[0_0_8px_rgba(74,222,128,0.5)]' />
            </div>
            <div className='hidden sm:flex flex-col leading-none'>
              <span className='text-lg font-bold tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:via-purple-300 group-hover:to-pink-300 transition-all duration-500'>
                MultiCart
              </span>
              <span className='text-[10px] font-medium text-gray-500 tracking-[0.2em] uppercase group-hover:text-blue-400/70 transition-colors duration-500'>
                Shop Smart
              </span>
            </div>
          </motion.div>

          {/* DESKTOP NAV LINKS */}
          {user?.role === "user" && (
            <div className='hidden md:flex items-center gap-1'>
              {navLinks.map((link) => (
                <NavItem key={link.path} label={link.label} path={link.path} router={router} />
              ))}
            </div>
          )}

          {/* DESKTOP ICONS */}
          <div className='hidden md:flex items-center gap-4'>
            {user?.role === "user" && (
              <IconBtn Icon={SearchIcon} onClick={() => router.push("/category")} tooltip="Search" />
            )}
            <IconBtn Icon={PhoneIcon} onClick={() => router.push("/support")} tooltip="Support" />

            <div className='relative' ref={dropdownRef}>
              {user?.image ? (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='cursor-pointer'>
                  <Image
                    src={user?.image}
                    width={40}
                    height={40}
                    alt='user'
                    className='w-10 h-10 rounded-full object-cover border-2 border-white/20 cursor-pointer hover:border-white/50 transition-colors duration-300'
                    onClick={() => setOpenMenu(!openMenu)}
                  />
                </motion.div>
              ) : (
                <IconBtn Icon={User} onClick={() => setOpenMenu(!openMenu)} tooltip="Account" />
              )}

              <AnimatePresence>
                {openMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className='absolute right-0 mt-3 w-52 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 bg-[#1a1a1a]/90 overflow-hidden'
                  >
                    <div className='px-4 py-3 border-b border-white/10'>
                      <p className='text-sm font-medium text-white'>{user?.name || "Guest"}</p>
                      <p className='text-xs text-gray-400 truncate'>{user?.email || "Not logged in"}</p>
                    </div>
                    <DropDownBtn Icon={User2} label="Profile" onClick={() => { router.push("/profile"); setOpenMenu(false) }} />
                    <DropDownBtn Icon={LogInIcon} label="Login" onClick={() => { router.push("/login"); setOpenMenu(false) }} />
                    <DropDownBtn Icon={LogOutIcon} label="Log Out" onClick={() => { signOut(); setOpenMenu(false) }} danger />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {user?.role === "user" && <CartBtn router={router} count={5} />}
          </div>

          {/* MOBILE RIGHT SIDE */}
          {user?.role === "user" && (
  <div className='md:hidden flex items-center gap-3'>
    <CartBtn router={router} count={5} />

    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      className='p-2 rounded-xl hover:bg-white/10 transition-colors duration-300 cursor-pointer'
    >
      <AnimatePresence mode="wait">
        {mobileMenuOpen ? (
          <motion.div
            key="close"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <X size={24} />
          </motion.div>
        ) : (
          <motion.div
            key="menu"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Menu size={24} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  </div>
)}

        </div>
      </div>

      {/* MOBILE MENU — navbar ke BAHAR, portal ki tarah */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className='fixed inset-0 bg-black/70 backdrop-blur-sm z-[200] md:hidden'
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              ref={mobileMenuRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className='fixed top-0 right-0 h-full w-[280px] bg-[#0a0a0a] border-l border-white/10 z-[300] md:hidden shadow-2xl overflow-y-auto'
            >
              {/* Header */}
              <div className='flex items-center justify-between p-4 border-b border-white/10'>
                <div className='flex items-center gap-2'>
                  <Image src={logo} width={32} height={32} alt='logo' className='rounded-full' />
                  <span className='text-lg font-semibold text-white'>Menu</span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className='p-2 rounded-xl hover:bg-white/10 transition-colors duration-300 cursor-pointer'
                >
                  <X size={20} className='text-white' />
                </motion.button>
              </div>

              {/* User Info */}
              <div className='p-4 border-b border-white/10'>
                <div className='flex items-center gap-3'>
                  {user?.image ? (
                    <Image src={user?.image} width={48} height={48} alt='user' className='w-12 h-12 rounded-full object-cover border-2 border-white/20' />
                  ) : (
                    <div className='w-12 h-12 rounded-full bg-white/10 flex items-center justify-center'>
                      <User size={24} className='text-gray-400' />
                    </div>
                  )}
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm font-medium text-white truncate'>{user?.name || "Guest User"}</p>
                    <p className='text-xs text-gray-400 truncate'>{user?.email || "Sign in to continue"}</p>
                  </div>
                </div>
              </div>

              {/* Nav Links */}
              {user?.role === "user" && (
                <div className='p-2'>
                  <p className='px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider'>Navigation</p>
                  {navLinks.map((link, index) => (
                    <motion.button
                      key={link.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => { router.push(link.path); setMobileMenuOpen(false) }}
                      className='flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer group'
                    >
                      <link.icon size={20} className='text-gray-400 group-hover:text-white transition-colors duration-300' />
                      <span className='flex-1 text-left text-sm font-medium text-white'>{link.label}</span>
                      <ChevronRight size={16} className='text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all duration-300' />
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className='p-2 border-t border-white/10 mt-2'>
                <p className='px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</p>

                <MobileActionBtn icon={PhoneIcon} label="Support" delay={0.2} onClick={() => { router.push("/support"); setMobileMenuOpen(false) }} />
                {user?.role === "user" && (
                  <MobileActionBtn icon={SearchIcon} label="Search" delay={0.25} onClick={() => { router.push("/category"); setMobileMenuOpen(false) }} />
                )}
                <MobileActionBtn icon={User2} label="Profile" delay={0.3} onClick={() => { router.push("/profile"); setMobileMenuOpen(false) }} />
                <MobileActionBtn icon={LogInIcon} label="Login" delay={0.35} onClick={() => { router.push("/login"); setMobileMenuOpen(false) }} />

                {/* Logout */}
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  onClick={() => { signOut(); setMobileMenuOpen(false) }}
                  className='flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-red-500/20 transition-all duration-300 cursor-pointer group mt-1'
                >
                  <LogOutIcon size={20} className='text-red-400 group-hover:text-red-300 transition-colors duration-300' />
                  <span className='flex-1 text-left text-sm font-medium text-red-400 group-hover:text-red-300'>Log Out</span>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar

// ─── Sub Components ────────────────────────────────────────────────

const NavItem = ({ label, path, router }: any) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => router.push(path)}
    className='px-4 py-2 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 cursor-pointer'
  >
    {label}
  </motion.button>
)

const IconBtn = ({ Icon, onClick, tooltip }: any) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    className='p-2.5 rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer relative group'
    title={tooltip}
  >
    <Icon size={22} className='text-gray-300 group-hover:text-white transition-colors duration-300' />
  </motion.button>
)

const DropDownBtn = ({ Icon, label, onClick, danger = false }: any) => (
  <motion.button
    whileHover={{ x: 4 }}
    onClick={onClick}
    className={`flex items-center gap-3 w-full px-4 py-3 hover:bg-white/10 transition-all duration-300 cursor-pointer text-left ${
      danger ? 'text-red-400 hover:text-red-300 hover:bg-red-500/10' : 'text-gray-300 hover:text-white'
    }`}
  >
    <Icon size={18} />
    <span className='text-sm font-medium'>{label}</span>
  </motion.button>
)

const MobileActionBtn = ({ icon: Icon, label, delay, onClick }: any) => (
  <motion.button
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    onClick={onClick}
    className='flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer group'
  >
    <Icon size={20} className='text-gray-400 group-hover:text-white transition-colors duration-300' />
    <span className='flex-1 text-left text-sm font-medium text-white'>{label}</span>
    <ChevronRight size={16} className='text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all duration-300' />
  </motion.button>
)

const CartBtn = ({ router, count }: any) => (
  <motion.button
    className='relative p-2.5 rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer group'
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={() => router.push("/cart")}
    title="Cart"
  >
    <ShoppingCartIcon size={22} className='text-gray-300 group-hover:text-white transition-colors duration-300' />
    {count > 0 && (
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className='absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center shadow-lg shadow-blue-500/30'
      >
        {count}
      </motion.span>
    )}
  </motion.button>
)