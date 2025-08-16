import { Button } from "@mantine/core"
import { IconArrowLeft } from "@tabler/icons-react"
import { Link, useParams } from "react-router-dom"
import AppliedJob from "../ApplyJob/AppliedJob"
import {useNavigate} from"react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

function ApplyJob() {
  const navigate=useNavigate();
  const [job,setJOb]=useState<any>(null);
  const {id}=useParams();
  useEffect(()=>{
    axios.get("http://localhost:8080/job/get/"+id)
    .then((res)=>{setJOb(res.data)})
    .catch((err)=>{throw err})
  },[id])
  return (
    <div className="min-h-[90vh] bg-[rgb(45,45,45)] p-4 ">
      <Link className="my-5 inline-block" to="/jobs">
        <Button color="sun.4" leftSection={<IconArrowLeft size={20}/>} variant="light" onClick={()=>navigate(-1)}>Back</Button>
        
      </Link>
      <div>
          <AppliedJob {...job}/>
        </div>
    </div>
  )
}

export default ApplyJob
