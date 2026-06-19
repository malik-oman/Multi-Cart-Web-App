"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import {
  AlertTriangle,
  Plus,
  Edit3,
  Power,
  PowerOff,
  Package,
  TrendingUp,
  DollarSign,
  CheckCircle2,
  XCircle,
  Clock,
  Image as ImageIcon
} from 'lucide-react'
import Image from 'next/image'
import UsetGetCurrentUser from '@/hooks/UsetGetCurrentUser'
import UseGetAllProducts from '@/hooks/UseGetAllProductsData'

function VendorProducts() {
  const router = useRouter()
  UsetGetCurrentUser()
  UseGetAllProducts()

  const currentUser = useSelector((state: RootState) => state.user.userData)
  const { allProductsData } = useSelector((state: RootState) => state.vendor)

  const myproducts = currentUser?._id && allProductsData?.length
    ? allProductsData.filter((p: any) => p.vendor === currentUser?._id || p.vendor?._id === currentUser?._id)
    : []

  const stats = {
    total: myproducts.length,
    active: myproducts.filter((p: any) => p.isActive).length,
    pending: myproducts.filter((p: any) => p.verificationStatus === "pending").length,
    approved: myproducts.filter((p: any) => p.verificationStatus === "approved").length,
  }

  const getStatusConfig = (status: string) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return {
          bg: "bg-emerald-500/15",
          text: "text-emerald-400",
          border: "border-emerald-500/20",
          dot: "bg-emerald-400",
          icon: CheckCircle2,
        }
      case "rejected":
        return {
          bg: "bg-red-500/15",
          text: "text-red-400",
          border: "border-red-500/20",
          dot: "bg-red-400",
          icon: XCircle,
        }
      case "pending":
      default:
        return {
          bg: "bg-amber-500/15",
          text: "text-amber-400",
          border: "border-amber-500/20",
          dot: "bg-amber-400",
          icon: Clock,
        }
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  }

  return (
    <div className="w-full min-h-screen p-4 sm:p-6 lg:p-8 text-white">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            My Products
          </h1>
          <p className="text-slate-400 text-sm mt-1">Manage and track all your listed products</p>
        </div>

        <motion.button
          onClick={() => router.push("/addVendorProduct")}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 px-5 py-2.5 rounded-xl font-semibold text-sm sm:text-base cursor-pointer shadow-lg shadow-blue-600/25 transition-all duration-300"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </motion.button>
      </motion.div>

      {/* STATS CARDS */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8"
      >
        {[
          { label: "Total Products", value: stats.total, icon: Package, color: "from-blue-500/20 to-cyan-500/20", iconColor: "text-blue-400" },
          { label: "Active", value: stats.active, icon: TrendingUp, color: "from-emerald-500/20 to-teal-500/20", iconColor: "text-emerald-400" },
          { label: "Pending", value: stats.pending, icon: Clock, color: "from-amber-500/20 to-orange-500/20", iconColor: "text-amber-400" },
          { label: "Approved", value: stats.approved, icon: CheckCircle2, color: "from-violet-500/20 to-purple-500/20", iconColor: "text-violet-400" },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -2 }}
            className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${stat.color} backdrop-blur-sm p-4 sm:p-5`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-xs sm:text-sm font-medium">{stat.label}</p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mt-1">{stat.value}</p>
              </div>
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/10 flex items-center justify-center ${stat.iconColor}`}>
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* DESKTOP TABLE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="hidden lg:block overflow-hidden bg-white/[0.03] backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl shadow-black/20"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/[0.06] border-b border-white/10">
                <th className="p-5 text-xs font-semibold text-slate-400 uppercase tracking-wider">Product</th>
                <th className="p-5 text-xs font-semibold text-slate-400 uppercase tracking-wider">Price</th>
                <th className="p-5 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="p-5 text-xs font-semibold text-slate-400 uppercase tracking-wider">Active</th>
                <th className="p-5 text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myproducts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center">
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="flex flex-col items-center gap-4"
                    >
                      <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                        <Package className="w-10 h-10 text-slate-500" />
                      </div>
                      <p className="text-slate-400 text-lg font-medium">No Products Found</p>
                      <p className="text-slate-500 text-sm">Start by adding your first product</p>
                    </motion.div>
                  </td>
                </tr>
              ) : (
                myproducts.map((p: any, index: number) => {
                  const statusConfig = getStatusConfig(p?.verificationStatus)
                  const StatusIcon = statusConfig.icon

                  return (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="border-b border-white/[0.04] hover:bg-white/[0.04] transition-all duration-300 group"
                    >
                      <td className="p-5">
                        <div className="flex items-center gap-4">
                          <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-white/5 border border-white/10 flex-shrink-0">
                            {p?.image1 ? (
                              <Image
                                src={p.image1}
                                alt={p?.title || "Product"}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <ImageIcon className="w-6 h-6 text-slate-600" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-white text-sm">{p?.title || "Untitled Product"}</p>
                            <p className="text-slate-500 text-xs mt-0.5">ID: #{String(index + 1).padStart(4, "0")}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-5">
                        <div className="flex items-center gap-1.5">
                          <DollarSign className="w-4 h-4 text-emerald-400" />
                          <span className="text-white font-semibold">{p?.price || "0.00"}</span>
                        </div>
                      </td>
                      <td className="p-5">
                        <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text} border ${statusConfig.border}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot} animate-pulse`}></span>
                          <StatusIcon className="w-3 h-3" />
                          {p?.verificationStatus || "Pending"}
                        </span>
                      </td>
                      <td className="p-5">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${p?.isActive ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20" : "bg-slate-500/15 text-slate-400 border border-slate-500/20"}`}>
                          {p?.isActive ? <Power className="w-3 h-3" /> : <PowerOff className="w-3 h-3" />}
                          {p?.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="p-5 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <motion.button
                          onClick={()=>router.push(`/updateProduct/${p._id}`)}
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.92 }}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-600/30 transition-all duration-200"
                          >
                            <Edit3 className="w-3 h-3" />
                            Edit
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.92 }}
                            disabled={p.verificationStatus !== "approved"}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${p.verificationStatus === "approved" ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-600/30" : "bg-slate-600/20 text-slate-500 border border-slate-500/10 cursor-not-allowed"}`}
                          >
                            {p?.isActive ? <PowerOff className="w-3 h-3" /> : <Power className="w-3 h-3" />}
                            {p?.isActive ? "Disable" : "Enable"}
                          </motion.button>
                        </div>
                        {p.verificationStatus === "rejected" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="mt-3 bg-red-500/10 border border-red-500/20 text-red-300 text-xs p-3 rounded-xl max-w-sm mx-auto"
                          >
                            <p className="font-medium flex items-center gap-1.5">
                              <AlertTriangle className="w-3.5 h-3.5" />
                              Rejected: {p.rejectedReason || "No reason provided"}
                            </p>
                            <p className="mt-1.5 text-yellow-300/80 text-[11px]">
                              After editing, product will be sent for re-verification.
                            </p>
                          </motion.div>
                        )}
                      </td>
                    </motion.tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* MOBILE CARDS */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="lg:hidden space-y-4"
      >
        {myproducts.length === 0 ? (
          <motion.div
            variants={cardVariants}
            className="flex flex-col items-center gap-4 py-16 bg-white/[0.03] backdrop-blur-md rounded-2xl border border-white/10"
          >
            <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
              <Package className="w-10 h-10 text-slate-500" />
            </div>
            <p className="text-slate-400 text-lg font-medium">No Products Found</p>
            <p className="text-slate-500 text-sm">Start by adding your first product</p>
          </motion.div>
        ) : (
          myproducts.map((p: any, index: number) => {
            const statusConfig = getStatusConfig(p?.verificationStatus)
            const StatusIcon = statusConfig.icon

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ scale: 1.01 }}
                className="bg-white/[0.03] backdrop-blur-md rounded-2xl border border-white/10 p-4 sm:p-5 space-y-4"
              >
                {/* Product Header */}
                <div className="flex items-start gap-4">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-white/5 border border-white/10 flex-shrink-0">
                    {p?.image1 ? (
                      <Image
                        src={p.image1}
                        alt={p?.title || "Product"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-7 h-7 text-slate-600" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white text-sm sm:text-base truncate">{p?.title || "Untitled Product"}</h3>
                    <p className="text-slate-500 text-xs mt-0.5">ID: #{String(index + 1).padStart(4, "0")}</p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <DollarSign className="w-4 h-4 text-emerald-400" />
                      <span className="text-white font-bold text-lg">{p?.price || "0.00"}</span>
                    </div>
                  </div>
                </div>

                {/* Status Badges */}
                <div className="flex flex-wrap gap-2">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text} border ${statusConfig.border}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot} animate-pulse`}></span>
                    <StatusIcon className="w-3 h-3" />
                    {p?.verificationStatus || "Pending"}
                  </span>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${p?.isActive ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20" : "bg-slate-500/15 text-slate-400 border border-slate-500/20"}`}>
                    {p?.isActive ? <Power className="w-3 h-3" /> : <PowerOff className="w-3 h-3" />}
                    {p?.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                {/* Rejected Alert */}
                {p.verificationStatus === "rejected" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="bg-red-500/10 border border-red-500/20 text-red-300 text-xs p-3 rounded-xl"
                  >
                    <p className="font-medium flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                      Rejected: {p.rejectedReason || "No reason provided"}
                    </p>
                    <p className="mt-1.5 text-yellow-300/80 text-[11px]">
                      After editing, product will be sent for re-verification.
                    </p>
                  </motion.div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <motion.button
                   onClick={()=>router.push(`/updateProduct/${p._id}`)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-600/30 transition-all duration-200"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    disabled={p.verificationStatus !== "approved"}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${p.verificationStatus === "approved" ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-600/30" : "bg-slate-600/20 text-slate-500 border border-slate-500/10 cursor-not-allowed"}`}
                  >
                    {p?.isActive ? <PowerOff className="w-4 h-4" /> : <Power className="w-4 h-4" />}
                    {p?.isActive ? "Disable" : "Enable"}
                  </motion.button>
                </div>
              </motion.div>
            )
          })
        )}
      </motion.div>
    </div>
  )
}

export default VendorProducts