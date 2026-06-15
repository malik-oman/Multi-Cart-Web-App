import { auth } from "@/auth";
import connectDb from "@/lib/connectDb";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req:NextRequest) {
  try {
    await connectDb()
    const session = await auth()
    const adminUser = await User.findById(session?.user?.id)
    if (!adminUser || adminUser.role !== "admin") {
      return NextResponse.json({message:"Only admin can approve vendors Or admin is not found"},{status:403})
    }

    const {vendorId, status, rejectReason} = await req.json()

    if(!vendorId || !status){
      return NextResponse.json({message:"vendor id and status are required"},{status:403})
    }

    const vendor = await User.findById(vendorId)

    if(status === "approved"){
      vendor.verificationStatus = "approved"
      vendor.isApproved = true,
      vendor.approvedAt = new Date(),
      vendor.rejectedReason = undefined
    }

    
    if(status === "rejected"){
      vendor.verificationStatus = "rejected"
      vendor.isApproved = false,
      vendor.rejectedReason = rejectReason || "rejected by admin"
    }

    await vendor.save()

    return NextResponse.json({message:"vendor status updated", vendor},{status:200})

  } catch (error) {
    return NextResponse.json({message:`vendor status updated error ${error}`},{status:500})
  }
}