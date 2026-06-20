import React from 'react'
import Slider from './Slider'
import CategorySlider from './CategorySlider'
import ProductCardPage from './ProductCardPage'

function UserDashboard() {
  return (
    <div className='min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-6'>
      <Slider />
      <CategorySlider />
      <ProductCardPage/>
    </div>
  )
}

export default UserDashboard