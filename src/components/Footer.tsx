"use client"

import { IUser } from '@/models/user.model'
import React from 'react'
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn, 
  FaGithub,
  FaShoppingCart,
  FaStore,
  FaShieldAlt,
  FaRocket,
  FaHeart,
  FaChartLine,
  FaUsers,
  FaBoxOpen,
  FaClipboardList,
  FaCog,
  FaMoneyBillWave,
  FaBell,
  FaLock,
  FaHeadset,
} from 'react-icons/fa'
import { 
  HiOutlineMail, 
  HiOutlinePhone, 
  HiOutlineLocationMarker 
} from 'react-icons/hi'
import { motion } from 'motion/react'

function Footer({ user }: { user: IUser }) {
  const role = user?.role
  const isUser = role === "user"
  const isAdmin = role === "admin"
  const isVendor = role === "vendor"
  const isAdminOrVendor = isAdmin || isVendor

  const currentYear = new Date().getFullYear()

  // User quick links (no cart/wishlist)
  const userLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Categories", href: "/category" },
    { label: "My Orders", href: "/orders" },
    { label: "Profile", href: "/profile" },
    { label: "Support", href: "/support" },
  ]

  // Role-based features
  const userFeatures = [
    { icon: FaShoppingCart, text: "Smart Shopping" },
    { icon: FaShieldAlt, text: "Secure Payments" },
    { icon: FaRocket, text: "Fast Delivery" },
    { icon: FaStore, text: "1000+ Vendors" },
  ]

  // Admin stats/highlights — no links, just value props
  const adminHighlights = [
    {
      icon: FaUsers,
      title: "User Management",
      desc: "Monitor, verify, and manage all registered users and their activity across the platform.",
    },
    {
      icon: FaChartLine,
      title: "Real-time Analytics",
      desc: "Track revenue, orders, and vendor performance with live data dashboards.",
    },
    {
      icon: FaShieldAlt,
      title: "Platform Security",
      desc: "Full access to security logs, fraud detection, and account controls.",
    },
    {
      icon: FaBell,
      title: "System Notifications",
      desc: "Push alerts and announcements to users, vendors, or the entire platform.",
    },
  ]

  // Vendor highlights — no links, value props
  const vendorHighlights = [
    {
      icon: FaBoxOpen,
      title: "Product Listings",
      desc: "Add, edit, and manage your product catalog with bulk upload support.",
    },
    {
      icon: FaMoneyBillWave,
      title: "Earnings & Payouts",
      desc: "Track your sales revenue and request secure payouts on your schedule.",
    },
    {
      icon: FaClipboardList,
      title: "Order Tracking",
      desc: "View and fulfill incoming orders with real-time status updates.",
    },
    {
      icon: FaCog,
      title: "Store Settings",
      desc: "Customize your storefront, policies, and notification preferences.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  }

  return (
    <footer className="relative w-full text-gray-300 z-40 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #111827 0%, #000000 45%, #111827 100%)" }}
    >
      {/* Subtle animated glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/4 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/4 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-gray-800/20 rounded-full blur-3xl" />
      </div>

      {/* Top border */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-600/40 to-transparent" />

      {/* ── USER FOOTER ── */}
      {isUser && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative max-w-7xl mx-auto px-6 py-16 grid gap-12 text-center md:text-left grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        >
          {/* Brand */}
          <motion.div variants={itemVariants} className="space-y-5">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                <FaShoppingCart className="text-white text-lg" />
              </div>
              <h2 className="text-white text-2xl font-bold tracking-wide">
                Multi<span className="text-blue-400">Cart</span>
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-gray-400 max-w-xs mx-auto md:mx-0">
              Smart, secure & scalable multi-vendor E-Commerce platform built for performance and growth.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-3 pt-2">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-500/20 hover:border-blue-500/50 transition-all duration-300"
                >
                  <Icon className="text-sm" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-5">
            <h3 className="text-white text-lg font-semibold flex items-center justify-center md:justify-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {userLinks.map((link, index) => (
                <motion.li key={index} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-300 flex items-center justify-center md:justify-start gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-blue-400 transition-colors duration-300" />
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Why Choose Us */}
          <motion.div variants={itemVariants} className="space-y-5">
            <h3 className="text-white text-lg font-semibold flex items-center justify-center md:justify-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              Why Choose Us
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {userFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex flex-col items-center md:items-start gap-2 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-300 group"
                >
                  <feature.icon className="text-blue-400 text-lg group-hover:text-purple-400 transition-colors duration-300" />
                  <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {feature.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact + Newsletter */}
          <motion.div variants={itemVariants} className="space-y-5">
            <h3 className="text-white text-lg font-semibold flex items-center justify-center md:justify-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Get In Touch
            </h3>
            <div className="space-y-4">
              <motion.div whileHover={{ x: 5 }} className="flex items-center justify-center md:justify-start gap-3 text-sm text-gray-400 group cursor-pointer">
                <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-all duration-300">
                  <HiOutlineMail className="text-blue-400 group-hover:text-blue-300" />
                </div>
                <span className="group-hover:text-gray-300 transition-colors duration-300">support@multicart.com</span>
              </motion.div>
              <motion.div whileHover={{ x: 5 }} className="flex items-center justify-center md:justify-start gap-3 text-sm text-gray-400 group cursor-pointer">
                <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-purple-500/50 group-hover:bg-purple-500/10 transition-all duration-300">
                  <HiOutlinePhone className="text-purple-400 group-hover:text-purple-300" />
                </div>
                <span className="group-hover:text-gray-300 transition-colors duration-300">+1 (555) 123-4567</span>
              </motion.div>
              <motion.div whileHover={{ x: 5 }} className="flex items-center justify-center md:justify-start gap-3 text-sm text-gray-400 group cursor-pointer">
                <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10 transition-all duration-300">
                  <HiOutlineLocationMarker className="text-emerald-400 group-hover:text-emerald-300" />
                </div>
                <span className="group-hover:text-gray-300 transition-colors duration-300">San Francisco, CA</span>
              </motion.div>
            </div>
            <div className="pt-2">
              <p className="text-xs text-gray-500 mb-2">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/25 transition-all duration-300"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white text-sm font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                >
                  Join
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ── ADMIN FOOTER ── */}
      {isAdmin && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative max-w-7xl mx-auto px-6 py-16"
        >
          {/* Brand + tagline row */}
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-8 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <FaShieldAlt className="text-white text-xl" />
              </div>
              <div>
                <h2 className="text-white text-2xl font-bold tracking-wide">
                  Multi<span className="text-blue-400">Cart</span>
                  <span className="ml-2 text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded-full align-middle">Admin</span>
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">Platform Control Center</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              You have full administrative access. Manage users, vendors, orders, and platform settings from your dashboard.
            </p>
            <div className="flex items-center gap-3">
              {[FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub].map((Icon, index) => (
                <motion.a key={index} href="#" whileHover={{ scale: 1.15, y: -3 }} whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-500/20 hover:border-blue-500/50 transition-all duration-300">
                  <Icon className="text-sm" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Admin capability cards */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {adminHighlights.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.25 }}
                className="p-5 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-all duration-300">
                  <item.icon className="text-blue-400 text-lg" />
                </div>
                <h4 className="text-white text-sm font-semibold mb-1">{item.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Admin contact strip */}
          <motion.div variants={itemVariants} className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.07]">
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <FaHeadset className="text-blue-400 text-base" />
              <span>Technical Support:</span>
              <span className="text-gray-300">admin-support@multicart.com</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <FaLock className="text-purple-400 text-base" />
              <span>Security Issues:</span>
              <span className="text-gray-300">security@multicart.com</span>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ── VENDOR FOOTER ── */}
      {isVendor && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative max-w-7xl mx-auto px-6 py-16"
        >
          {/* Brand row */}
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-8 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-green-400 flex items-center justify-center shadow-lg shadow-green-500/30">
                <FaStore className="text-white text-xl" />
              </div>
              <div>
                <h2 className="text-white text-2xl font-bold tracking-wide">
                  Multi<span className="text-emerald-400">Cart</span>
                  <span className="ml-2 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full align-middle">Vendor</span>
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">Your Seller Workspace</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Everything you need to run and grow your store — from product listings to payouts, all in one place.
            </p>
            <div className="flex items-center gap-3">
              {[FaFacebookF, FaInstagram, FaLinkedinIn, FaGithub].map((Icon, index) => (
                <motion.a key={index} href="#" whileHover={{ scale: 1.15, y: -3 }} whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300">
                  <Icon className="text-sm" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Vendor benefit cards */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {vendorHighlights.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.25 }}
                className="p-5 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-all duration-300">
                  <item.icon className="text-emerald-400 text-lg" />
                </div>
                <h4 className="text-white text-sm font-semibold mb-1">{item.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Vendor support strip */}
          <motion.div variants={itemVariants} className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.07]">
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <FaHeadset className="text-emerald-400 text-base" />
              <span>Vendor Support:</span>
              <span className="text-gray-300">vendors@multicart.com</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <FaMoneyBillWave className="text-yellow-400 text-base" />
              <span>Payout Queries:</span>
              <span className="text-gray-300">payouts@multicart.com</span>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ── BOTTOM BAR ── */}
      <div className="relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 flex items-center gap-1">
            © {currentYear} MultiCart. Made with <FaHeart className="text-red-500 text-xs animate-pulse" /> by Malik Oman
          </p>
          <div className="flex items-center gap-6 text-xs text-gray-500">
            <a href="#" className="hover:text-blue-400 transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400 transition-colors duration-300">Terms of Service</a>
            <a href="#" className="hover:text-blue-400 transition-colors duration-300">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer