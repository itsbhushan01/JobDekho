import { useParams } from "react-router-dom"
import { jobList } from "../../assets/JobPortalResources/Data/JobsData"
import JobCard from "../FindJobs/JobCard"
import { useEffect, useState } from "react";
import axios from "axios";

function RecommendedJob() {
  const {id}=useParams();
  const [jobList,setJobList]=useState<any>([{}])
  useEffect(()=>{
      axios.get("http://localhost:8080/job/getall").then((res)=>{
        setJobList(res.data);
      }).catch((error)=>{
        throw error
      })
    },[])
  return (
    <div>
      <div className='text-xl font-semibold mb-5'>Recommend Jobs</div>
            <div className="flex flex-col flex-wrap gap-5 justify-between">
              {jobList.map((talent,index)=>index<4&& id!=talent.id &&<JobCard key={index} {...talent}/>)}
            </div>
    </div>
  )
}

export default RecommendedJob
