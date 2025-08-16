import { Divider, Input, RangeSlider } from "@mantine/core"
import MultiInput from "../FindJobs/MultiInput";
import { useState } from "react"
import { IconUserCircle } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { updateFilter } from "../Slices/FilterSlice";
import { searchFields } from "../../assets/JobPortalResources/Data/TalentData";
import { dropdown } from "../../Data/Data";

function SearchBar() {
   const [value,setValue]=useState<[number,number]>([0,50]);
   const [name,setName]=useState("");
   const dispatch=useDispatch();
   
   const handleChange=(name:any,event:any)=>{
    if(name=="exp"){
      dispatch(updateFilter({exp:event}))
    }
    else{
      setName(event.currentTarget.value);
      dispatch(updateFilter({name:event.currentTarget.value}))

    }
   }
  return (
    
      
      <div className="flex px-5 py-8 !text-[#e7e7e7] items-center ">
        <div className="flex items-center">
          <div className="text-[#03C988] bg-[#2d2d2d] rounded-full mr-2 p-1">
            <IconUserCircle size={20}/>
          </div>
          <Input onChange={(e)=>handleChange("name",e)} defaultValue={name} variant="unstyled" placeholder="Talent Name" className="!placeholder-[#e7e7e7]"/>
      </div>
      {
        searchFields.map((value,index)=>
          <>
        <div className="w-1/5" key={index}>
          <MultiInput {...value}/>
        </div>
        <Divider mr="xs" size="xs" orientation="vertical"/>
        </>
        )
      }
      <div className="w-1/5">
          <div className="flex justify-between">
            <div>Experience (Year)</div>
            <div>{value[0]} - {value[1]}</div>
          </div>
        <RangeSlider size="xs" onChangeEnd={(e)=>handleChange("exp",e)} color="sun.4" max={50} min={1} value={value} onChange={setValue}/>
      </div>
      </div>
   
  )
}

export default SearchBar
