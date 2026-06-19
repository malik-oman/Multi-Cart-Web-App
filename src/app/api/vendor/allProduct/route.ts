import connectDb from "@/lib/connectDb";
import Product from "@/models/product.mode";
import { NextResponse } from "next/server";

export async function GET() {
    try {
      await connectDb()
      const products = await Product.find().populate("vendor", "name email shopName").sort({createdAt: -1})


      return NextResponse.json(products,{status:201})
    } catch (error) {
      return NextResponse.json({message:`failed to get all products ${error}`},{status:500})
    }
}