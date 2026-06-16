"use client"

// ============================================================
// IMPORTS
// ============================================================
import UsetGetCurrentUser from '@/hooks/UsetGetCurrentUser'
import { RootState } from '@/redux/store'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'
import { 
  Camera,
  Edit3,
  Save,
  X,
  Phone,
  MapPin,
  Store,
  FileText,
  Mail,
  Shield,
  Package
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import userImage from "@/assets/profile.png"

// ============================================================
// PROFILE COMPONENT
// ============================================================
function Profile() {

  // ----------------------------------------------------------
  // STATE MANAGEMENT
  // ----------------------------------------------------------
  const [showEditProfile, setShowEditProfile] = useState(false)       // Toggle profile edit form
  const [showEditShop, setShowEditShop] = useState(false)             // Toggle shop edit form
  const [loading, setLoading] = useState(false)                       // Loading state

  const router = useRouter()

  // Fetch current user data
  UsetGetCurrentUser()

  // Get user data from Redux store
  const user = useSelector((state: RootState) => state.user.userData)

  // ----------------------------------------------------------
  // PROFILE IMAGE STATES
  // ----------------------------------------------------------
  // Preview image state - uses user image if available, otherwise default
  const [previewImage, setPreviewImage] = useState(user?.image || userImage)

  // Selected file state
  const [profileImage, setprofileImage] = useState<File | null>(null)

  // ----------------------------------------------------------
  // FORM STATES
  // ----------------------------------------------------------
  const [name, setName] = useState(user?.name || "")
  const [phone, setPhone] = useState(user?.phone || "")
  const [shopName, setShopName] = useState(user?.shopName || "")
  const [shopAddress, setShopAddress] = useState(user?.shopAddress || "")
  const [gstNumber, setGstNumber] = useState(user?.gstNumber || "")

  // ----------------------------------------------------------
  // HANDLER FUNCTIONS
  // ----------------------------------------------------------

  // Update preview image when user selects a file
  const handlePreviewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return;
    setprofileImage(file)
    setPreviewImage(URL.createObjectURL(file))
  }

  // ----------------------------------------------------------
  // ANIMATION VARIANTS
  // ----------------------------------------------------------

  // Stagger animation for container - children animate one by one
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  // Animation for individual items
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  // ----------------------------------------------------------
  // INFO ITEMS ARRAY - Generates info cards based on user role
  // ----------------------------------------------------------
  const infoItems = [
    { icon: Phone, label: "Phone", value: user?.phone || "-" },
    ...(user?.role === "vendor" ? [
      { icon: Store, label: "Shop Name", value: user?.shopName || "-" },
      { icon: MapPin, label: "Shop Address", value: user?.shopAddress || "-" },
      { icon: FileText, label: "GSTIN", value: user?.gstNumber || "-" }
    ] : [])
  ]

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white px-4 pt-24 pb-10">

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-3xl mx-auto"
      >
        {/* ============================================================ */}
        {/* MAIN PROFILE CARD */}
        {/* ============================================================ */}
        <motion.div
           // @ts-ignore
          variants={itemVariants}
          className="bg-white/10 backdrop-blur-md p-6 sm:p-10 rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-shadow duration-500"
        >
          {/* ---------------------------------------------------------- */}
          {/* PROFILE HEADER - Image, Name, Email, Role */}
          {/* ---------------------------------------------------------- */}
          <div className="flex flex-col items-center text-center">

            {/* Profile image with hover effect */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-white/30 hover:border-blue-400 transition-colors duration-300"
            >
              <Image
                src={previewImage}
                alt="profile"
                width={120}
                height={120}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* User name */}
            <motion.h2
               // @ts-ignore
              variants={itemVariants}
              className="text-2xl sm:text-3xl font-bold mt-4"
            >
              {user?.name}
            </motion.h2>

            {/* Email with icon */}
            <motion.div
               // @ts-ignore
              variants={itemVariants}
              className="flex items-center gap-2 mt-2"
            >
              <Mail className="w-4 h-4 text-gray-400" />
              <p className="text-gray-300 text-sm sm:text-base">{user?.email}</p>
            </motion.div>

            {/* Role with icon */}
            <motion.div
               // @ts-ignore
              variants={itemVariants}
              className="flex items-center gap-2 mt-1"
            >
              <Shield className="w-4 h-4 text-gray-400" />
              <p className="text-gray-400 text-xs sm:text-sm">
                Role:{" "}
                <span className="text-blue-400 uppercase">{user?.role}</span>
              </p>
            </motion.div>
          </div>

          {/* ---------------------------------------------------------- */}
          {/* INFO GRID - Phone, Shop Name, Address, GSTIN cards */}
          {/* ---------------------------------------------------------- */}
          <motion.div
             // @ts-ignore
            variants={itemVariants}
            className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            {/* Generate a card for each info item */}
            {infoItems.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -2, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300"
              >
                {/* Icon container */}
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                  <item.icon className="w-5 h-5 text-gray-300" />
                </div>
                {/* Text content */}
                <div className="text-left">
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{item.label}</p>
                  <p className="text-sm font-semibold text-gray-200">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* ---------------------------------------------------------- */}
          {/* ACTION BUTTONS */}
          {/* ---------------------------------------------------------- */}
          <motion.div
          // @ts-ignore
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8"
          >
            {/* My Orders button - visible only for "user" role */}
            {user?.role === "user" && (
              <motion.button
                onClick={() => router.push("/orders")}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 py-3 rounded-full font-semibold text-sm transition-all duration-300"
              >
                <Package className="w-4 h-4" />
                My Orders
              </motion.button>
            )}

            {/* Edit Profile button - toggles form open/close */}
            <motion.button
              onClick={() => { setShowEditProfile(!showEditProfile); setShowEditShop(false) }}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center justify-center gap-2 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                showEditProfile
                  ? "bg-gray-500 hover:bg-gray-600 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {showEditProfile ? <X className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
              {showEditProfile ? "Close Edit" : "Edit Profile"}
            </motion.button>

            {/* Edit Shop Details button - visible only for "vendor" role */}
            {user?.role === "vendor" && (
              <motion.button
                onClick={() => { setShowEditShop(!showEditShop); setShowEditProfile(false) }}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center justify-center gap-2 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                  showEditShop
                    ? "bg-gray-500 hover:bg-gray-600 text-white"
                    : "bg-gray-600 hover:bg-gray-700 text-white"
                }`}
              >
                {showEditShop ? <X className="w-4 h-4" /> : <Store className="w-4 h-4" />}
                {showEditShop ? "Close Shop Edit" : "Edit Shop Details"}
              </motion.button>
            )}
          </motion.div>
        </motion.div>

        {/* ============================================================ */}
        {/* EDIT PROFILE FORM */}
        {/* ============================================================ */}
        <AnimatePresence>
          {showEditProfile && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mt-6 bg-white/5 backdrop-blur-md p-5 sm:p-6 rounded-xl border border-white/20 shadow-xl"
            >
              {/* Form header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <Edit3 className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold">Edit Profile</h3>
              </div>

              {/* Profile image preview with camera button */}
              <div className="flex flex-col items-center mb-5">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-white/30 hover:border-blue-400 bg-gray-700"
                >
                  <Image
                    src={previewImage}
                    alt="select Image"
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                </motion.div>
                {/* Hidden file input with styled label */}
                <label className="cursor-pointer mt-3 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300">
                  <Camera className="w-4 h-4" />
                  Select Image
                  <input onChange={handlePreviewImage} type="file" hidden accept="image/*" />
                </label>
              </div>

              {/* Form inputs */}
              <div className="space-y-4">
                {/* Full name input */}
                <div>
                  <label className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1.5 block">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </div>
                    <input
                      type="text"
                      className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all duration-300 text-sm"
                      placeholder="Enter Full Name"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                  </div>
                </div>

                {/* Phone number input */}
                <div>
                  <label className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1.5 block">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all duration-300 text-sm"
                      placeholder="Enter Phone"
                      onChange={(e) => setPhone(e.target.value)}
                      value={phone}
                    />
                  </div>
                </div>

                {/* Update profile button */}
                <motion.button
                  whileHover={{ scale: 1.01, y: -1 }}
                  whileTap={{ scale: 0.99 }}
                  className="bg-blue-600 hover:bg-blue-700 w-full py-3 rounded-lg font-semibold text-sm text-white transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Update Profile
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ============================================================ */}
        {/* EDIT SHOP FORM */}
        {/* ============================================================ */}
        <AnimatePresence>
          {showEditShop && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mt-6 bg-white/5 backdrop-blur-md p-5 sm:p-6 rounded-xl border border-white/20 shadow-xl"
            >
              {/* Form header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <Store className="w-5 h-5 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold">Edit Shop Details</h3>
              </div>

              {/* Shop form inputs */}
              <div className="space-y-4">
                {/* Shop name input */}
                <div>
                  <label className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1.5 block">
                    Shop Name
                  </label>
                  <div className="relative">
                    <Store className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all duration-300 text-sm"
                      placeholder="Shop Name"
                      onChange={(e) => setShopName(e.target.value)}
                      value={shopName}
                    />
                  </div>
                </div>

                {/* Shop address input */}
                <div>
                  <label className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1.5 block">
                    Shop Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all duration-300 text-sm"
                      placeholder="Shop Address"
                      onChange={(e) => setShopAddress(e.target.value)}
                      value={shopAddress}
                    />
                  </div>
                </div>

                {/* GST number input */}
                <div>
                  <label className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1.5 block">
                    GST Number
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all duration-300 text-sm"
                      placeholder="GST Number"
                      onChange={(e) => setGstNumber(e.target.value)}
                      value={gstNumber}
                    />
                  </div>
                </div>

                {/* Update shop button */}
                <motion.button
                  whileHover={{ scale: 1.01, y: -1 }}
                  whileTap={{ scale: 0.99 }}
                  className="bg-gray-600 hover:bg-gray-700 w-full py-3 rounded-lg font-semibold text-sm text-white transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Update Shop Details
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default Profile