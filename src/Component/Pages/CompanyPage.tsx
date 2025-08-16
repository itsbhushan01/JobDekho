import { Button } from "@mantine/core"
import { IconArrowLeft } from "@tabler/icons-react"
import {  useNavigate, useParams } from "react-router-dom"
import Company from "../CompanyProfile/Company"
import SimilarCompany from "../CompanyProfile/SimilarCompany";
import { useEffect, useState } from "react";
import axios from "axios";

function CompanyPage() {
    const {id}=useParams();
    const navigate=useNavigate();
    const [job,setJob]=useState([]);
    useEffect(()=>{
      axios.get("http://localhost:8080/job/get/"+id)
      .then((res)=>setJob(res.data))
      .catch((err)=>{throw err})
    },[id])
  return (
    <div className="min-h-[90vh] bg-[#000] p-4">
              
                
                <Button leftSection={<IconArrowLeft size={20}/>} color='sun.4' my="mr" variant='light' onClick={()=>navigate(-1)}>Back</Button>
             
             
              <div className='flex gap-5 justify-between'>
                    <Company {...job}/>
                    <SimilarCompany/>
              </div>
        </div>
  )
}

export default CompanyPage
