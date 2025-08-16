import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Slices/UserSlice"
import profileReducer from "../Slices/ProfileSlice"
import filterReducer from "../Slices/FilterSlice"
import JobReducer from "../Slices/JobSlice"
 const Store= configureStore({
    reducer:{
        user:userReducer,
        profile:profileReducer,
        filter:filterReducer,
        job:JobReducer

    }
})

export default Store
