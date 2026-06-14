"use client"

import React from 'react'
import UsetGetCurrentUser from './hooks/UsetGetCurrentUser'
import UseGetAllVendors from './hooks/UseGetAllVendors'

function InitUser() {
    UsetGetCurrentUser()
    UseGetAllVendors()
    return null
}

export default InitUser