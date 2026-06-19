import { auth } from "@/auth";
import connectDb from "@/lib/connectDb";
import Product from "@/models/product.mode";
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

    const {productId, status, rejectReason} = await req.json()

    if(!productId || !status){
      return NextResponse.json({message:"product id and status are required"},{status:403})
    }

    const product = await Product.findById(productId)

    if(status === "approved"){
      product.verificationStatus = "approved"
     
      product.approvedAt = new Date(),
      product.rejectedReason = undefined
    }

    
    if(status === "rejected"){
      product.verificationStatus = "rejected"
   
      product.rejectedReason = rejectReason || "rejected by admin"
    }

    await product.save()

    return NextResponse.json({message:"product status updated", product},{status:200})

  } catch (error) {
    return NextResponse.json({message:`Product status updated error ${error}`},{status:500})
  }
}