import { Button } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import JobDesc from '../JobDesc/JobDesc'
import RecommendedJob from '../JobDesc/RecommendedJob'
import {useParams} from "react-router-dom"
import { useEffect, useState } from 'react'
import axios from 'axios'

function JobDescPage() {
  const {id}=useParams();
  const [job,setJob]=useState({});
  
  useEffect(()=>{
    window.scrollTo(0,0);
    axios.get("http://localhost:8080/job/get/"+id).then((res)=>{
      console.log(res.data);
      setJob(res.data)}
    ).catch((err)=>{
      throw err
    })
  },[id])
  return (
    <div className="min-h-[90vh] bg-[#000] p-4">

          <Link to="/find-jobs" className='my-4 inline-block'>
            <Button leftSection={<IconArrowLeft size={20}/>} color='yellow' variant='light'>Back</Button>
          </Link>      
         
          <div className='flex gap-5 justify-around'>
               <JobDesc {...job}/>
               <RecommendedJob/>
          </div>
    </div>
  )
}

export default JobDescPage
