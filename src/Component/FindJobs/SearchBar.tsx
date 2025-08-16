import { Divider, RangeSlider } from "@mantine/core"
import { dropdown } from "../../Data/Data"
import MultiInput from "./MultiInput"
import { useState } from "react"
import { useDispatch } from "react-redux";
import { updateFilter } from "../Slices/FilterSlice";

function SearchBar() {
    const [value,setValue]=useState<[number,number]>([0,300]);
   const dispatch=useDispatch();
   
   const handleChange=(event:any)=>{
    dispatch(updateFilter({salary:event}))
   }
  return (
   
    <div className="flex px-5 py-8">
     {
      dropdown.map((item,index)=>
        <>
       <div className="w-1/5" key={index}>
        <MultiInput {...item}/>
      </div>
      <Divider mr="xs" size="xs" orientation="vertical"/>
      </>
      )
     }
     <div className="w-1/5">
        <div className="flex justify-between">
          <div>Salary</div>
          <div>&#8377;{value[0]}LPA - &#8377;{value[1]}LPA</div>
        </div>
       <RangeSlider size="xs" color="green" max={50} min={1} value={value} onChange={setValue} onChangeEnd={handleChange}/>
     </div>
    </div>
  )
}

export default SearchBar
