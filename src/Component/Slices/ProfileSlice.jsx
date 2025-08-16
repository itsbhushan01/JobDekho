import {  setItem } from "../Services/LocalStorageService";
import { createSlice } from "@reduxjs/toolkit";
import { UpdateProfile } from "../Services/ProfileService";
const profileSlice=createSlice({
    name:"profile",
    initialState:{},
    reducers:{
        changeProfile:(state,action)=>{
            setItem("user",action.payload);
            state=action.payload;
            return state;
        },
        setProfile:(state,action)=>{
            state=action.payload;
            return state;
        },
    }
})

export const {changeProfile,setProfile}=profileSlice.actions;
export default profileSlice.reducer;