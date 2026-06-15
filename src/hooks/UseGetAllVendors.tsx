"use client"

import { AppDispatch } from '@/redux/store'
import { setAllVendorsData } from '@/redux/vendorSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function UseGetAllVendors() {
  
     const dispatch = useDispatch<AppDispatch>()

  useEffect(()=>{
    
 const fetchAllVendor = async () => {
        try {
          const result = await axios.get("/api/vendor/AllVendor")
          dispatch(setAllVendorsData(result.data.vendors))
        } catch (error) {
          console.log(error)
         dispatch(setAllVendorsData([]))
        }
        
      }
        fetchAllVendor()
  },[])
}

export default UseGetAllVendors