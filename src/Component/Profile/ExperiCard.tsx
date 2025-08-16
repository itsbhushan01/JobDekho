import { Button } from "@mantine/core"
import { useState } from "react"
import ExpInput from "./ExpInput";
import { formatDate } from "../Services/Utilities";

function ExperiCard(props:any) {
  const [edit,setEdit]=useState(false);
  return !edit?
    <div className="flex flex-col gap-2">
      <div className='flex justify-between'  >
              <div className='flex gap-2 items-center'>
                  <div className='p-2 bg-[#454545]  rounded-md'>
                      <img className='h-7' src={`/public/JobPortalResources/Icons/${props.company}.png`} alt="its me" />
                  </div>
                  <div>
                      <div className='font-semibold'>{props.title}</div>
                      <div className='text-sm  text-[#e1e1e1]'>{props.company} &#x2022; {props.location}.</div>
                  </div>
              </div>
              
              <div className="text-sm  text-[#e1e1e1] text-justify">{formatDate(props.startDate)} - {formatDate(props.endDate)}</div>
            </div>
            <div className="text-sm text-[#d1d1d1] text-justify">
              {props.discription}
            </div>
            {
              props.edit
              &&
              <div className="flex gap-2">
              <Button color="sun.4" variant="outline" onClick={()=>setEdit(true)}>Edit</Button>
              <Button color="red" variant="filled" autoContrast>Delete</Button>
            </div>
               
            }
            
    </div>
    :
    <ExpInput setEdit={setEdit} {...props}/>
}

export default ExperiCard
