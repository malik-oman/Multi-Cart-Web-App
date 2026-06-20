"use client"

import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import Image from 'next/image';
import { UploadIcon, X, Plus, Package, Tag, DollarSign, Layers, Shirt, RotateCcw, ShieldCheck, Truck, CreditCard, Check } from 'lucide-react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

function UpdateProduct() {



  const router = useRouter()

  const categories = [
    "Fashion and Lifestyle",
    "Electronics and Gadgets",
    "Home and Furniture",
    "Beauty and Personal Care",
    "Grocery and Essentials",
    "Sports and Fitness",
    "Books and Stationery",
    "Toys and Baby Care",
    "Automotive and Accessories",
    "Health and Wellness",
    "Others"
  ];

  const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];

  const params = useParams()
  const productId = params.id as string

  const {allProductsData} = useSelector((state:RootState)=>state.vendor)

  const product = allProductsData?.find((p)=> String(p._id)=== String(productId))


  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [stock, setStock] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [customCategory, setCustomCategory] = useState("")
  const [isWearable, setIsWearable] = useState(false)
  const [sizes, setSizes] = useState<string[]>([])
  const [replacementDays, setReplacementDays] = useState("")
  const [warranty, setWarranty] = useState("")
  const [freeDelivery, setFreeDelivery] = useState(false)
  const [payOnDelivery, setPayOnDelivery] = useState(false)

  const [image1, setImage1] = useState<File | null>(null)
  const [image2, setImage2] = useState<File | null>(null)
  const [image3, setImage3] = useState<File | null>(null)
  const [image4, setImage4] = useState<File | null>(null)

  const [preview1, setPreview1] = useState<string | null>(null)
  const [preview2, setPreview2] = useState<string | null>(null)
  const [preview3, setPreview3] = useState<string | null>(null)
  const [preview4, setPreview4] = useState<string | null>(null)

  const [detailPoint, setDetailPoints] = useState<string[]>([])
  const [currentPoints, setCurrentPoint] = useState("")
  const [pointIndex, setPointIndex] = useState(0)
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
      if (!product) return;

      setTitle(product.title)
      setDescription(product.description)
      setPrice(String(product.price))
      setStock(String(product.stock))
      setCategory(product.category)
      setIsWearable(Boolean(product.isWearable))
      setSizes(product.sizes || [])
      setReplacementDays(product.replacementDays ? String(product.replacementDays) : "")
      setFreeDelivery(Boolean(product.freeDelivery))
      setWarranty(product.warranty || "")
      setPayOnDelivery(Boolean(product.payOnDelivery))
      setDetailPoints(product.detailPoint || [])
      setPointIndex(product.detailPoint?.length || 0)
      setPreview1(product.image1)
      setPreview2(product.image2)
      setPreview3(product.image3)
      setPreview4(product.image4)

  },[])


  const toggleSize = (size: string) => {
    setSizes((prev) => prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size])
  }

  const handleAddPoint = async () => {
    if (!currentPoints.trim()) return;

    setDetailPoints((prev) => {
      const updated = [...prev]
      updated[pointIndex] = currentPoints
      return updated
    })
    setCurrentPoint("")
    setPointIndex((prev) => prev + 1)
  }


  const handleRemove = (i: number) => {
    setDetailPoints((prev) => prev.filter((_, index) => index !== i))
  }


  const handleSubmit = async () => {
   
    if(isWearable && sizes.length === 0){
      alert("Please select at least one size")
      return;
    }
    setLoading(true)
    const formData = new FormData()
    formData.append("productId", productId)
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("category", category === "Others" ? customCategory : category);
    formData.append("isWearable", String(isWearable));
    sizes.forEach((size)=> formData.append("sizes", size))
    formData.append("replacementDays", replacementDays)
    formData.append("freeDelivery",   String(freeDelivery))
    formData.append("warranty", warranty)
    formData.append("payOnDelivery", String(payOnDelivery))
    detailPoint.forEach((point)=>formData.append("detailPoint", point))

    if (image1 && image2 && image3 && image4) {
      formData.append("image1", image1)
      formData.append("image2", image2)
      formData.append("image3", image3)
      formData.append("image4", image4)
    }

    try {
        const result = await axios.post("/api/vendor/updateProduct", formData)
       
        setLoading(false)
        alert("Product UPDATE successfully, Waiting for admin approval")
        router.push("/")
    } catch (error) {
     setLoading(false) 
     console.log("UPDATE PRODUCT ERROR:", error)
     alert("❌PRODUCT UPDATE FAILED")
    }
  }


  return (
    <div className='min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-900 text-white px-4 pt-20 pb-10'>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='max-w-3xl mx-auto bg-white/5 backdrop-blur-2xl p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl shadow-black/40'>

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">
            <Package size={24} className="text-white" />
          </div>
          <div>
            <h1 className='text-2xl sm:text-3xl font-bold tracking-tight'>Add New Product</h1>
            <p className="text-gray-400 text-sm mt-1">Fill in the details to list your product</p>
          </div>
        </div>

        {/* Basic Info Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Tag size={18} className="text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-200">Basic Information</h2>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div className="relative group">
              <Package size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors duration-300" />
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                className='w-full p-3.5 pl-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300'
                placeholder='Product Title'
              />
            </div>

            <div className="relative group">
              <DollarSign size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors duration-300" />
              <input
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                type="number"
                className='w-full p-3.5 pl-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300'
                placeholder='Product Price'
              />
            </div>

            <div className="relative group">
              <Layers size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors duration-300" />
              <input
                onChange={(e) => setStock(e.target.value)}
                value={stock}
                type="number"
                className='w-full p-3.5 pl-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300'
                placeholder='Stock Quantity'
              />
            </div>

            <div className="relative group">
              <Tag size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors duration-300" />
              <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className='w-full p-3.5 pl-12 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300 appearance-none cursor-pointer'
              >
                <option className='bg-gray-900' value="">Select Category</option>
                {categories.map((cat) => (
                  <option className='bg-gray-900' key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {category === "Others" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              <input
                onChange={(e) => setCustomCategory(e.target.value)}
                value={customCategory}
                type='text'
                placeholder='Enter Custom Category'
                className='w-full p-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300'
              />
            </motion.div>
          )}

          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            placeholder='Product Description'
            className='mt-4 w-full p-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300 resize-none'
            rows={4}
          />
        </div>

        {/* Wearable Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
            <div
              onClick={() => setIsWearable(!isWearable)}
              className={`w-12 h-7 rounded-full cursor-pointer transition-all duration-300 flex items-center p-1 ${isWearable ? 'bg-white/20' : 'bg-white/10'}`}
            >
              <motion.div
                animate={{ x: isWearable ? 20 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="w-5 h-5 rounded-full bg-white shadow-lg"
              />
            </div>
            <div className="flex items-center gap-2">
              <Shirt size={18} className="text-gray-400" />
              <span className='text-sm font-medium'>This is a wearable / clothing product</span>
            </div>
          </div>

          {isWearable && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              <p className='mb-3 text-sm font-semibold text-gray-300'>Select Sizes</p>
              <div className='flex flex-wrap gap-2'>
                {sizeOptions.map((size) => (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type='button'
                    className={`px-5 py-2 rounded-xl border transition-all duration-300 font-medium text-sm ${sizes.includes(size)
                      ? "bg-white/15 border-white/30 text-white shadow-lg shadow-white/5"
                      : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20"
                      }`}
                    onClick={() => toggleSize(size)} key={size}>{size}</motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Additional Info */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck size={18} className="text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-200">Additional Details</h2>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div className="relative group">
              <RotateCcw size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors duration-300" />
              <input
                onChange={(e) => setReplacementDays(e.target.value)}
                value={replacementDays}
                type="text"
                className='w-full p-3.5 pl-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300'
                placeholder='Replacement Days (e.g. 7 days)'
              />
            </div>

            <div className="relative group">
              <ShieldCheck size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors duration-300" />
              <input
                onChange={(e) => setWarranty(e.target.value)}
                value={warranty}
                type="text"
                className='w-full p-3.5 pl-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300'
                placeholder='Warranty (e.g. 1 Year)'
              />
            </div>
          </div>
        </div>

        {/* Checkboxes */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Truck size={18} className="text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-200">Delivery Options</h2>
          </div>
          <div className='flex flex-wrap items-center gap-6'>
            <div
              onClick={() => setFreeDelivery(!freeDelivery)}
              className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all duration-300 ${freeDelivery ? 'bg-white/10 border-white/30' : 'bg-white/5 border-white/10 hover:bg-white/8'}`}
            >
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-300 ${freeDelivery ? 'bg-white/20' : 'bg-white/5 border border-white/20'}`}>
                {freeDelivery && <Check size={14} className="text-white" />}
              </div>
              <div className="flex items-center gap-2">
                <Truck size={18} className="text-gray-400" />
                <span className='text-sm font-medium'>Free Delivery</span>
              </div>
            </div>

            <div
              onClick={() => setPayOnDelivery(!payOnDelivery)}
              className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all duration-300 ${payOnDelivery ? 'bg-white/10 border-white/30' : 'bg-white/5 border-white/10 hover:bg-white/8'}`}
            >
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-300 ${payOnDelivery ? 'bg-white/20' : 'bg-white/5 border border-white/20'}`}>
                {payOnDelivery && <Check size={14} className="text-white" />}
              </div>
              <div className="flex items-center gap-2">
                <CreditCard size={18} className="text-gray-400" />
                <span className='text-sm font-medium'>Pay On Delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Image Upload */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <UploadIcon size={18} className="text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-200">Product Images</h2>
            <span className="text-xs text-gray-500 ml-2">(Upload 4 images)</span>
          </div>
          <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>

            {/* IMAGE1======================================== */}
            <motion.div whileHover={{ scale: 1.02 }} className="group">
              <input
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setImage1(file)
                  setPreview1(URL.createObjectURL(file))
                }}
                type="file" hidden id='img1' accept='image/*' />
              <label htmlFor="img1" className='cursor-pointer bg-white/5 p-3 rounded-2xl h-36 flex items-center justify-center border border-white/10 hover:border-white/25 transition-all duration-300 block overflow-hidden relative'>
                {preview1 ? (
                  <Image src={preview1} alt='img1' width={120} height={120} className='w-full h-full object-cover rounded-xl' />
                ) : (
                  <div className='flex flex-col items-center text-gray-500 group-hover:text-gray-300 transition-colors duration-300'>
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-2">
                      <UploadIcon size={20} />
                    </div>
                    <span className="text-xs font-medium">Image 1</span>
                  </div>
                )}
              </label>
            </motion.div>

            {/* IMAGE2======================================== */}
            <motion.div whileHover={{ scale: 1.02 }} className="group">
              <input
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setImage2(file)
                  setPreview2(URL.createObjectURL(file))
                }}
                type="file" hidden id='img2' accept='image/*' />
              <label htmlFor="img2" className='cursor-pointer bg-white/5 p-3 rounded-2xl h-36 flex items-center justify-center border border-white/10 hover:border-white/25 transition-all duration-300 block overflow-hidden relative'>
                {preview2 ? (
                  <Image src={preview2} alt='img2' width={120} height={120} className='w-full h-full object-cover rounded-xl' />
                ) : (
                  <div className='flex flex-col items-center text-gray-500 group-hover:text-gray-300 transition-colors duration-300'>
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-2">
                      <UploadIcon size={20} />
                    </div>
                    <span className="text-xs font-medium">Image 2</span>
                  </div>
                )}
              </label>
            </motion.div>

            {/* IMAGE3======================================== */}
            <motion.div whileHover={{ scale: 1.02 }} className="group">
              <input
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setImage3(file)
                  setPreview3(URL.createObjectURL(file))
                }}
                type="file" hidden id='img3' accept='image/*' />
              <label htmlFor="img3" className='cursor-pointer bg-white/5 p-3 rounded-2xl h-36 flex items-center justify-center border border-white/10 hover:border-white/25 transition-all duration-300 block overflow-hidden relative'>
                {preview3 ? (
                  <Image src={preview3} alt='img3' width={120} height={120} className='w-full h-full object-cover rounded-xl' />
                ) : (
                  <div className='flex flex-col items-center text-gray-500 group-hover:text-gray-300 transition-colors duration-300'>
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-2">
                      <UploadIcon size={20} />
                    </div>
                    <span className="text-xs font-medium">Image 3</span>
                  </div>
                )}
              </label>
            </motion.div>

            {/* IMAGE4======================================== */}
            <motion.div whileHover={{ scale: 1.02 }} className="group">
              <input
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setImage4(file)
                  setPreview4(URL.createObjectURL(file))
                }}
                type="file" hidden id='img4' accept='image/*' />
              <label htmlFor="img4" className='cursor-pointer bg-white/5 p-3 rounded-2xl h-36 flex items-center justify-center border border-white/10 hover:border-white/25 transition-all duration-300 block overflow-hidden relative'>
                {preview4 ? (
                  <Image src={preview4} alt='img4' width={120} height={120} className='w-full h-full object-cover rounded-xl' />
                ) : (
                  <div className='flex flex-col items-center text-gray-500 group-hover:text-gray-300 transition-colors duration-300'>
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-2">
                      <UploadIcon size={20} />
                    </div>
                    <span className="text-xs font-medium">Image 4</span>
                  </div>
                )}
              </label>
            </motion.div>

          </div>
        </div>

        {/* Product Details Points */}
        <div className='mb-8'>
          <div className="flex items-center gap-2 mb-4">
            <Plus size={18} className="text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-200">Product Details Points</h2>
          </div>
          <div className='flex gap-3'>
            <div className="relative flex-1 group">
              <Plus size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors duration-300" />
              <input
                onChange={(e) => setCurrentPoint(e.target.value)}
                value={currentPoints}
                placeholder={`Point ${pointIndex + 1}`}
                type="text"
                className='w-full p-3.5 pl-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300'
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddPoint}
              type='button'
              className='px-6 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/25 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2'
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Add</span>
            </motion.button>
          </div>

          {detailPoint.length > 0 && (
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='mt-4 space-y-2'
            >
              {detailPoint.map((point, index) => (
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className='flex justify-between items-center bg-white/5 p-3.5 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300'
                  key={index}
                >
                  <span className='text-sm text-gray-300'><span className="text-gray-500 font-medium mr-2">{index + 1}.</span>{point}</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type='button'
                    onClick={() => handleRemove(index)}
                    className='text-gray-500 hover:text-red-400 transition-colors duration-300 p-1'
                  >
                    <X size={16} />
                  </motion.button>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </div>

        {/* Submit Button */}
        <motion.button
        onClick={handleSubmit}
        disabled={loading}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className='w-full mt-4 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 py-4 rounded-2xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-black/20'
        >
          <Package size={20} />
          {loading ? "Submiting ..." : "Update Product"}
        </motion.button>

      </motion.div>
    </div>
  )
}

export default UpdateProduct