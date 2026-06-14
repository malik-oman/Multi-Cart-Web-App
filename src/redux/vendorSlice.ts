import { IUser } from "@/models/user.model"
import { createSlice } from "@reduxjs/toolkit"



interface IUserData {
  allVendorsData : IUser[]
}


const initialState : IUserData = {
  allVendorsData: []
}

const vendorSlice = createSlice({
  name:"vendor",
  initialState,
  reducers:{
    setAllVendorsData:(state,action)=>{
      state.allVendorsData = action.payload
    }
  }
})

export const {setAllVendorsData} = vendorSlice.actions
export default vendorSlice.reducer