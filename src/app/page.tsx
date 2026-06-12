import { auth } from '@/auth'
import AdminDashboard from '@/components/Admin/AdminDashboard'
import EditRoleandPhone from '@/components/EditRoleandPhone'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import UserDashboard from '@/components/User/UserDashboard'
import VendorDashboard from '@/components/Vendor/VendorDashboard'
import connectDb from '@/lib/connectDb'
import User from '@/models/user.model'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function page() {
  await connectDb()
  const session = await auth()
  const user = await User.findById(session?.user?.id)
  if(!user){
    redirect("/login")
  }
  const inComplete = !user.role || !user.phone || (!user.phone && user.role == "user")
    if(inComplete){
      return <EditRoleandPhone/>
    }

      const plainUser = JSON.parse(JSON.stringify(user))

  return (
    <div className='flex min-h-screen items-center justify-center bg-linear-to-br from-gray-900 via-black to-gray-900 font-sans flex-col'>

      <Navbar user={plainUser}/>

      {user?.role == "user" ? <UserDashboard/> : user?.role == "vendor" ? <VendorDashboard/> : <AdminDashboard/>}
      <Footer user={plainUser}/>
    </div>
  )
}
