"use client"

import React from 'react'
import UsetGetCurrentUser from './hooks/UsetGetCurrentUser'
import UseGetAllVendors from './hooks/UseGetAllVendors'
import UseGetAllProducts from './hooks/UseGetAllProductsData'

function InitUser() {
    UsetGetCurrentUser()
    UseGetAllVendors()
    UseGetAllProducts()
    return null
}

export default InitUser