import axios from "axios"
import JobCard from "./JobCard"
import Sort from "./Sort"
import {  LoadingOverlay } from "@mantine/core"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { resetFilter } from "../Slices/FilterSlice"

function Job() {
  const dispatch=useDispatch();
  const [jobList,setJobList]=useState([{}])
  const [loader,setLoader]=useState(false)
  const filter=useSelector((state:any)=>state.filter)

  const [fiteredJobs,setFilteredJobs]=useState<any>([]);
  useEffect(()=>{
     setLoader(true);
     dispatch(resetFilter())
    axios.get("http://localhost:8080/job/getall").then((res)=>{
      setJobList(res.data.filter((job:any)=>job.jobStatus=="ACTIVE"));
        setTimeout(()=>{
          setLoader(false)                     
        },4000)
    }).catch((error)=>{
      setLoader(false)   
      throw error
    })
  },[])


  useEffect(()=>{
          let filtered=jobList;
          setFilteredJobs(filtered);
          
          if(filter["Job Title"] && filter["Job Title"].length>0){
            filtered=filtered.filter((talent:any)=>filter["Job Title"].some((title:any)=>talent.jobTitle?.toLowerCase().includes(title?.toLowerCase())));
          }
          if(filter.Location && filter.Location.length>0){
            filtered=filtered.filter((talent:any)=>filter.Location?.some((title:any)=>talent.location?.toLowerCase().includes(title?.toLowerCase())));
          }
          if(filter.Experience && filter.Experience.length>0){
            filtered=filtered.filter((talent:any)=>filter.Experience?.some((title:any)=>talent.experience?.toLowerCase().includes(title?.toLowerCase())));
          }
           if(filter["Job Type"] && filter["Job Type"].length>0){
            filtered=filtered.filter((talent:any)=>filter["Job Type"].some((title:any)=>talent.jobType?.toLowerCase().includes(title?.toLowerCase())));
          }
          if(filter.salary&&filter.salary.length>0){
          filtered=filtered.filter((talent:any)=>filter.salary[0]<=talent.packageOffered&&talent.packageOffered<=filter.salary[1])
        }
         },[filter,jobList])


  return (
    <>
    <LoadingOverlay 
        visible={loader}
        zIndex={1000}
        overlayProps={{radius:'sm',blur:3}}
        loaderProps={{color:'sun.4',type:"bars"}}
        />
    <div className="p-5">
      <div className="flex justify-between ">
        <div className="text-2xl font-bold">Recommeded Jobs</div>
        <Sort/>
      </div>
      <div className="m-10 flex flex-wrap justify-around gap-10">
        {fiteredJobs.map((job,index)=>
            <JobCard key={index} {...job}/>
            )}
      </div>
      
    </div>
    </>
  )
}

export default Job
