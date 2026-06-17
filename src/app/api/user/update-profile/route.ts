import { auth } from "@/auth";
import uploadOnCloudinary from "@/lib/cloudinary";
import connectDb from "@/lib/connectDb";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest) {
    try {
      await connectDb()
      const session = await auth()
      if (!session || !session?.user?.email || !session.user.id) {
        return NextResponse.json({message:"unauthorized user"},{status:400})
      }

      const formData = await req.formData()
      const name = formData.get("name") as string;
      const phone = formData.get("phone") as string;
      const file = formData.get("image") as File | null

      if (!name ||  !phone) {
        return NextResponse.json({message:"name and phone required"},{status:400})
      }

      let imageUrl;
      if (file) {
        imageUrl = await uploadOnCloudinary(file)
      }

      const updatedUser = await User.findOneAndUpdate({email:session.user.email},{
        name,
        phone,
        ...(imageUrl && {image:imageUrl})
      },{new:true})

      if (!updatedUser) {
        return NextResponse.json({message:"user not found"},{status:400})
      }

      return NextResponse.json(updatedUser,{status:200})

    } catch (error) {
      return NextResponse.json({message:`updated user error ${error}`},{status:500})
    }
}