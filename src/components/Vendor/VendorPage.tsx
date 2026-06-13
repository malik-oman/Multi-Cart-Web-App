import React from 'react'
import { IUser } from '@/models/user.model'
import VendorDashboard from './VendorDashboard'

import { Clock, ShieldCheck, Hourglass, AlertCircle, CheckCircle2 } from 'lucide-react'

function VendorPage({ user }: { user: IUser }) {
 
    if (!user) {
      return (
         <div className='w-full min-h-screen flex items-center justify-center text-white bg-linear-to-br from-gray-900 via-black to-gray-900'>Loading....</div>
      )
     
    }

    if (user.verificationStatus == "approved") {
        return (
          <div className='w-full min-h-screen pt-16'>
            <VendorDashboard/>
          </div>
        )
    }

    if (user.verificationStatus == "pending") {
      return (
        <div className='w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white px-4 py-8 sm:px-6'>
          <div className='bg-white/[0.06] backdrop-blur-[20px] p-8 sm:p-14 rounded-[2rem] shadow-2xl shadow-black/50 border border-white/[0.1] max-w-xl w-full text-center relative overflow-hidden'>
            
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-8">
              <Hourglass size={14} className="text-amber-400" />
              <span className="text-amber-400 text-xs font-semibold uppercase tracking-widest">Under Review</span>
            </div>
    
            <div className="mx-auto mb-6 w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-amber-500/15 to-orange-500/15 border border-amber-500/20 flex items-center justify-center">
              <Clock size={40} className="text-amber-400" strokeWidth={1.2} />
            </div>
    
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight">
              Verification Pending
            </h2>
            
            <p className='text-gray-400 text-base sm:text-lg leading-relaxed mb-8 max-w-sm mx-auto'>
              Your vendor application is currently being reviewed by our team. You will gain access to the dashboard once <span className='text-white font-medium'>admin verification</span> is complete.
            </p>
    
            <div className='bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 mb-6'>
              <div className="flex items-center justify-center gap-3 mb-4">
                <ShieldCheck size={20} className="text-blue-400" />
                <span className="text-sm text-gray-400 uppercase tracking-wider font-medium">Current Status</span>
              </div>
              
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className='text-gray-300 text-sm'>Verification Status:</span>
                <span className='text-amber-400 font-bold uppercase text-sm tracking-wide px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20'>
                  {user.verificationStatus}
                </span>
              </div>
              
              <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                <AlertCircle size={14} />
                <span>Usually takes 2-3 business hours</span>
              </div>
            </div>
    
            <div className="flex items-center justify-center gap-2 sm:gap-4">
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                  <CheckCircle2 size={18} className="text-blue-400" />
                </div>
                <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider">Applied</span>
              </div>
              
              <div className="w-12 sm:w-16 h-[2px] bg-gradient-to-r from-blue-500/30 to-amber-500/30" />
              
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center animate-pulse">
                  <Hourglass size={18} className="text-amber-400" />
                </div>
                <span className="text-[10px] sm:text-xs text-amber-400 uppercase tracking-wider font-medium">Reviewing</span>
              </div>
              
              <div className="w-12 sm:w-16 h-[2px] bg-white/10" />
              
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <CheckCircle2 size={18} className="text-gray-600" />
                </div>
                <span className="text-[10px] sm:text-xs text-gray-600 uppercase tracking-wider">Approved</span>
              </div>
            </div>
    
          </div>
        </div>
      )
    }

  if (user.verificationStatus == "rejected") {
    return (
      <div className='w-full min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-black to-gray-900 text-white px-4'></div>
    )
  }

}

export default VendorPage