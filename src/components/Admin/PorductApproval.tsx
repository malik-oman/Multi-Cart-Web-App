"use client"

import { AppDispatch, RootState } from '@/redux/store'
import axios from 'axios'
import { AnimatePresence, motion } from 'motion/react'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
  CheckCircle, 
  XCircle, 
  X, 
  Store, 
  Tag, 
  FileText, 
  AlertTriangle, 
  Loader2 
} from 'lucide-react'
import UseGetAllProducts from '@/hooks/UseGetAllProductsData'
import { IProduct } from '@/models/product.mode'
import Image from 'next/image'
import { setAllProductsData } from '@/redux/vendorSlice'

function ProductApproval() {
  const dispatch = useDispatch<AppDispatch>()

  // Call hook to fetch products
  UseGetAllProducts()

  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null)
  const [loading, setLoading] = useState(false)
  const [rejectModel, setRejectModel] = useState(false)
  const [rejectedReason, setRejectedReason] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  const openRejectReasonArea = () => {
    setRejectModel(true)
    setRejectedReason("")
  }

  // Get data from Redux
  const allProductsData: IProduct[] = useSelector((state: RootState) => {
    console.log("📊 Redux state:", state.vendor)
    return state.vendor.allProductsData
  })

  // Debug: Log when data changes
  useEffect(() => {
    console.log("🔄 allProductsData changed:", allProductsData)
    if (allProductsData && Array.isArray(allProductsData)) {
      setIsLoading(false)
      console.log(`📦 Total products: ${allProductsData.length}`)
      const pending = allProductsData.filter(p => p.verificationStatus === "pending")
      console.log(`⏳ Pending products: ${pending.length}`)
    }
  }, [allProductsData])

  // Safe filtering
  const pendingProducts = Array.isArray(allProductsData) ?
    allProductsData.filter((p) => p.verificationStatus === "pending") : []

    const handleApproved = async () => {
      if (!selectedProduct) return;
      setLoading(true)
  
      try {
        await axios.post("/api/admin/update-product-status", {
          productId: selectedProduct._id,
          status: "approved"
        })
        const updated = allProductsData.filter((v) => v._id !== selectedProduct._id)
        dispatch(setAllProductsData(updated))
        setSelectedProduct(null)
        setLoading(false)
        alert("Product approved successfully")
      } catch (error) {
        console.log(error)
        setLoading(false)
        alert("Approval failed")
      }
    }
  
  
    const handleRejected = async () => {
      if (!selectedProduct) return;
      setLoading(true)
  
      try {
        await axios.post("/api/admin/update-vendor-status", {
          productId: selectedProduct._id,
          status: "rejected",
          rejectedReason
        })
        const updated = allProductsData.filter((v) => v._id !== selectedProduct._id)
        dispatch(setAllProductsData(updated))
        setSelectedProduct(null)
        setRejectModel(false)
        setLoading(false)
        alert("product rejected successfully")
      } catch (error) {
        console.log(error)
        setLoading(false)
        alert("Rejection failed")
      }
    }
  // Loading state
  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-blue-400" />
          <p className="text-slate-400">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen px-4 sm:px-6 lg:px-10 py-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">

      {/* Debug Info */}
      <div className="mb-4 p-3 bg-white/5 rounded-xl border border-white/10">
        <p className="text-slate-300 text-sm">
          Total Products: <span className="text-blue-400 font-bold">{allProductsData?.length || 0}</span> | 
          Pending: <span className="text-amber-400 font-bold">{pendingProducts.length}</span>
        </p>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
          Product Approval Requests
        </h1>
        <p className="text-slate-400 mt-2 text-sm sm:text-base">
          Review and manage pending product applications
        </p>
      </motion.div>

      {/* DESKTOP TABLE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="hidden md:block overflow-hidden bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-2xl shadow-black/20"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/10 border-b border-white/10">
                <th className="p-5 text-sm font-semibold text-slate-300 uppercase tracking-wider">Image</th>
                <th className="p-5 text-sm font-semibold text-slate-300 uppercase tracking-wider">Title</th>
                <th className="p-5 text-sm font-semibold text-slate-300 uppercase tracking-wider">Price</th>
                <th className="p-5 text-sm font-semibold text-slate-300 uppercase tracking-wider">Category</th>
                <th className="p-5 text-sm font-semibold text-slate-300 uppercase tracking-wider">Status</th>
                <th className="p-5 text-sm font-semibold text-slate-300 uppercase tracking-wider text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                        <AlertTriangle className="w-8 h-8 text-slate-500" />
                      </div>
                      <p className="text-slate-400 text-lg">No pending product approval requests found</p>
                      <p className="text-slate-500 text-sm">New requests will appear here when vendors apply</p>
                    </div>
                  </td>
                </tr>
              ) : (
                pendingProducts.map((product, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-all duration-300 group"
                  >
                    <td className="p-4">
                      <Image
                        src={product.image1}
                        alt="product"
                        width={50}
                        height={50}
                        className="rounded object-cover"
                      />
                    </td>
                    <td className="p-5 text-slate-300">{product?.title || "-"}</td>
                    <td className="p-5 text-slate-300">{product?.price || "-"}</td>
                    <td className="p-5 text-slate-300">{product?.category || "-"}</td>
                    <td className="p-5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-amber-500/15 text-amber-400 border border-amber-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                        {product?.verificationStatus}
                      </span>
                    </td>
                    <td className="p-5 text-center">
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all duration-300 text-sm font-medium"
                      >
                        Check Details
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* MOBILE CARDS */}
      <div className="md:hidden flex flex-col gap-4">
        {pendingProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-4 py-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl"
          >
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-slate-500" />
            </div>
            <p className="text-slate-400 text-lg">No pending requests found</p>
          </motion.div>
        ) : (
          pendingProducts.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                    {product?.image1 ? (
                      <Image
                        src={product.image1}
                        alt="product"
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      product?.title?.charAt(0)?.toUpperCase() || "?"
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-base text-white">{product?.title || "-"}</h3>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/15 text-amber-400 border border-amber-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                      {product?.verificationStatus}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5 mb-4">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Tag className="w-4 h-4 text-slate-500" />
                  <span><span className="text-slate-500">Price:</span> {product?.price || "-"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Store className="w-4 h-4 text-slate-500" />
                  <span><span className="text-slate-500">Category:</span> {product?.category || "-"}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedProduct(product)}
                className="w-full bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600 hover:text-white py-3 rounded-xl text-sm font-medium transition-all duration-300"
              >
                Check Details
              </button>
            </motion.div>
          ))
        )}
      </div>

      {/* Product Details Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-slate-900/95 backdrop-blur-xl p-6 sm:p-8 rounded-3xl w-full max-w-lg border border-white/10 shadow-2xl shadow-black/50"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                    {selectedProduct.image1 ? (
                      <Image
                        src={selectedProduct.image1}
                        alt="product"
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      selectedProduct.title?.charAt(0)?.toUpperCase() || "?"
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Product Details</h3>
                    <p className="text-slate-400 text-sm">Review product details</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200"
                >
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              {/* Details Grid */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <FileText className="w-4 h-4 text-blue-400" />
                  <div className="flex-1">
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Title</p>
                    <p className="text-sm font-medium text-white">{selectedProduct.title || "-"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <Tag className="w-4 h-4 text-cyan-400" />
                  <div className="flex-1">
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Price</p>
                    <p className="text-sm font-medium text-white">{selectedProduct.price || "-"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <Store className="w-4 h-4 text-teal-400" />
                  <div className="flex-1">
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Category</p>
                    <p className="text-sm font-medium text-white">{selectedProduct.category || "-"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <div className="flex-1">
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Status</p>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/15 text-amber-400 border border-amber-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                      {selectedProduct.verificationStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  disabled={loading}
                  onClick={handleApproved}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed py-3 rounded-xl text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <CheckCircle className="w-4 h-4" />
                  )}
                  {loading ? "Approving..." : "Approve"}
                </button>
                <button
                  onClick={openRejectReasonArea}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 py-3 rounded-xl text-sm font-semibold text-white shadow-lg shadow-red-500/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <XCircle className="w-4 h-4" />
                  Reject
                </button>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 py-3 rounded-xl text-sm font-semibold text-slate-300 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reject Reason Modal */}
      <AnimatePresence>
        {rejectModel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] px-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-slate-900/95 backdrop-blur-xl p-6 sm:p-8 rounded-3xl w-full max-w-lg border border-white/10 shadow-2xl shadow-black/50"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Reject Product</h3>
                  <p className="text-slate-400 text-sm">Please provide a reason for rejection</p>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Rejection Reason
                </label>
                <textarea
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300 resize-none"
                  rows={4}
                  placeholder="Enter the reason for rejecting this product..."
                  onChange={(e) => setRejectedReason(e.target.value)}
                  value={rejectedReason}
                />
                <p className="text-xs text-slate-500 mt-2">
                  This reason will be shared with the vendor
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleRejected}
                  disabled={!rejectedReason.trim() || loading}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed py-3 rounded-xl text-sm font-semibold text-white shadow-lg shadow-red-500/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <XCircle className="w-4 h-4" />
                  )}
                  {loading ? "Rejecting..." : "Confirm Reject"}
                </button>
                <button
                  onClick={() => setRejectModel(false)}
                  className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 py-3 rounded-xl text-sm font-semibold text-slate-300 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}

export default ProductApproval