import connectDb from "@/lib/connectDb";
import User from "@/models/user.model";
import { NextResponse } from "next/server";


export async function GET() {
    try {
      await connectDb()
      const vendors = await User.find({role:"vendor"}).sort({createdAt:-1})
      if (!vendors) {
        return NextResponse.json({message:"Vendors are not found"},{status:400})
      }
      return NextResponse.json({vendors},{status:200})
    } catch (error) {
      return NextResponse.json({message:`get all vendors error ${error}`},{status:500})
    }
}