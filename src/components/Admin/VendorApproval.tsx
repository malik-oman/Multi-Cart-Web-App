"use client"

import UseGetAllVendors from '@/hooks/UseGetAllVendors'
import { IUser } from '@/models/user.model'
import { AppDispatch, RootState } from '@/redux/store'
import { setAllVendorsData } from '@/redux/vendorSlice'
import axios from 'axios'
import { AnimatePresence, motion } from 'motion/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CheckCircle, XCircle, X, Store, Phone, User, Mail, MapPin, FileText, AlertTriangle, Loader2 } from 'lucide-react'

function VendorApproval() {
  const dispatch = useDispatch<AppDispatch>()

  UseGetAllVendors()

  const [selectedVendor, setSelectedVendor] = useState<IUser | null>(null)
  const [loading, setLoading] = useState(false)
  const [rejectModel, setRejectModel] = useState(false)
  const [rejectedReason, setRejectedReason] = useState("")

  const openRejectReasonArea = () => {
    setRejectModel(true)
    setRejectedReason("")
  }

  const allVendorsData: IUser[] = useSelector((state: RootState) => state.vendor.allVendorsData)

  const pendingVendors = Array.isArray(allVendorsData) ?
    allVendorsData.filter((v) => v.verificationStatus === "pending") : []

  const handleApproved = async () => {
    if (!selectedVendor) return;
    setLoading(true)

    try {
      await axios.post("/api/admin/update-vendor-status", {
        vendorId: selectedVendor._id,
        status: "approved"
      })
      const updated = allVendorsData.filter((v) => v._id !== selectedVendor._id)
      dispatch(setAllVendorsData(updated))
      setSelectedVendor(null)
      setLoading(false)
      alert("Vendor approved successfully")
    } catch (error) {
      console.log(error)
      setLoading(false)
      alert("Approval failed")
    }
  }


  const handleRejected = async () => {
    if (!selectedVendor) return;
    setLoading(true)

    try {
      await axios.post("/api/admin/update-vendor-status", {
        vendorId: selectedVendor._id,
        status: "rejected",
        rejectedReason
      })
      const updated = allVendorsData.filter((v) => v._id !== selectedVendor._id)
      dispatch(setAllVendorsData(updated))
      setSelectedVendor(null)
      setRejectModel(false)
      setLoading(false)
      alert("Vendor rejected successfully")
    } catch (error) {
      console.log(error)
      setLoading(false)
      alert("Rejection failed")
    }
  }


  return (
    <div className="w-full min-h-screen px-4 sm:px-6 lg:px-10 py-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
          Vendor Approval Requests
        </h1>
        <p className="text-slate-400 mt-2 text-sm sm:text-base">
          Review and manage pending vendor applications
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
                <th className="p-5 text-sm font-semibold text-slate-300 uppercase tracking-wider">Vendor Name</th>
                <th className="p-5 text-sm font-semibold text-slate-300 uppercase tracking-wider">Shop Name</th>
                <th className="p-5 text-sm font-semibold text-slate-300 uppercase tracking-wider">Phone</th>
                <th className="p-5 text-sm font-semibold text-slate-300 uppercase tracking-wider">Status</th>
                <th className="p-5 text-sm font-semibold text-slate-300 uppercase tracking-wider text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingVendors.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                        <AlertTriangle className="w-8 h-8 text-slate-500" />
                      </div>
                      <p className="text-slate-400 text-lg">No pending vendor approval requests found</p>
                      <p className="text-slate-500 text-sm">New requests will appear here when vendors apply</p>
                    </div>
                  </td>
                </tr>
              ) : (
                pendingVendors.map((vendor, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-all duration-300 group"
                  >
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                          {vendor?.name?.charAt(0)?.toUpperCase() || "?"}
                        </div>
                        <span className="font-medium text-white">{vendor?.name || "-"}</span>
                      </div>
                    </td>
                    <td className="p-5 text-slate-300">{vendor?.shopName || "-"}</td>
                    <td className="p-5 text-slate-300">{vendor?.phone || "-"}</td>
                    <td className="p-5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-amber-500/15 text-amber-400 border border-amber-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                        {vendor?.verificationStatus}
                      </span>
                    </td>
                    <td className="p-5 text-center">
                      <button
                        onClick={() => setSelectedVendor(vendor)}
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
        {pendingVendors.length === 0 ? (
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
          pendingVendors.map((vendor, index) => (
            <motion.div
              key={ index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                    {vendor?.name?.charAt(0)?.toUpperCase() || "?"}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-white">{vendor?.name}</h3>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/15 text-amber-400 border border-amber-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                      {vendor?.verificationStatus}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5 mb-4">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Store className="w-4 h-4 text-slate-500" />
                  <span><span className="text-slate-500">Shop:</span> {vendor.shopName || "-"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Phone className="w-4 h-4 text-slate-500" />
                  <span><span className="text-slate-500">Phone:</span> {vendor.phone || "-"}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedVendor(vendor)}
                className="w-full bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600 hover:text-white py-3 rounded-xl text-sm font-medium transition-all duration-300"
              >
                Check Details
              </button>
            </motion.div>
          ))
        )}
      </div>


      {/* Vendor Details Modal */}
      <AnimatePresence>
        {selectedVendor && (
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
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                    {selectedVendor.name?.charAt(0)?.toUpperCase() || "?"}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Vendor Details</h3>
                    <p className="text-slate-400 text-sm">Review application details</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedVendor(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200"
                >
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              {/* Details Grid */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <User className="w-4 h-4 text-blue-400" />
                  <div className="flex-1">
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Name</p>
                    <p className="text-sm font-medium text-white">{selectedVendor.name || "-"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <div className="flex-1">
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Email</p>
                    <p className="text-sm font-medium text-white">{selectedVendor.email || "-"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <Phone className="w-4 h-4 text-teal-400" />
                  <div className="flex-1">
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Phone</p>
                    <p className="text-sm font-medium text-white">{selectedVendor.phone || "-"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <Store className="w-4 h-4 text-amber-400" />
                  <div className="flex-1">
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Shop Name</p>
                    <p className="text-sm font-medium text-white">{selectedVendor.shopName || "-"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <MapPin className="w-4 h-4 text-rose-400" />
                  <div className="flex-1">
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Shop Address</p>
                    <p className="text-sm font-medium text-white">{selectedVendor.shopAddress || "-"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <FileText className="w-4 h-4 text-purple-400" />
                  <div className="flex-1">
                    <p className="text-xs text-slate-500 uppercase tracking-wider">GSTIN</p>
                    <p className="text-sm font-medium text-white">{selectedVendor.gstNumber || "-"}</p>
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
                  onClick={() => setSelectedVendor(null)}
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
                  <h3 className="text-xl font-bold text-white">Reject Vendor</h3>
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
                  placeholder="Enter the reason for rejecting this vendor application..."
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

export default VendorApproval