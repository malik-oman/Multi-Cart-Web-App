import { auth } from "@/auth";
import connectDb from "@/lib/connectDb";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest) {
    try {
      await connectDb()
      const session = await auth()
      if (!session || !session?.user?.email || !session.user.id) {
        return NextResponse.json({message:"unauthorized user"},{status:400})
      }
    } catch (error) {
      
    }
}