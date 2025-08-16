
import { createSlice } from "@reduxjs/toolkit";;
const JobSlice=createSlice({
    name:"job",
    initialState:{},
    reducers:{
       
        setJob:(state,action)=>{
            state=action.payload;
            return state;
        },
    }
})

export const {setJob}=JobSlice.actions;
export default JobSlice.reducer;