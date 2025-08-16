import { useNavigate, useParams } from "react-router-dom"
import PostedJob from "../PostedJob/PostedJob"
import PostedJobDesc from "../PostedJob/PostedJobDesc"
import { useDispatch, useSelector } from "react-redux";
import {  LoadingOverlay } from "@mantine/core"
import { useEffect, useState } from "react";
import axios from "axios";
import { setJob } from "../Slices/JobSlice";
function PostedJobPage() {
  const {id}=useParams();
 
   const user=useSelector((state:any)=>state.user);
  const [jobList,setJobList]=useState<any>([]);
   const [loader,setLoader]=useState(false)
  const [job,setJobs]=useState<any>({});
  const navigate=useNavigate();
  const dispatch=useDispatch();
  useEffect(()=>{
    window.scrollTo(0,0)
    setLoader(true)     
    axios.get("http://localhost:8080/job/postedby/"+user.id).then((res)=>{
      setJobList(res.data);
      if(res.data && res.data.length>0 && Number(id)==0)navigate(`/posted-jobs/${res.data[0].id}`);
      setJobs(res.data.find((item:any)=>item.id==id));
       setTimeout(()=>{
                         setLoader(false)                     
                       },4000)
    }).catch((err)=>{setLoader(false);throw err})
  },[id])


  useEffect(()=>{
    axios.get("http://localhost:8080/job/get/"+id)
    .then((res)=>dispatch(setJob(res.data)))
    .catch((err)=>{throw err})
  },[id])

  
 
  return (
    <>
     <LoadingOverlay 
                visible={loader}
                zIndex={1000}
                overlayProps={{radius:'sm',blur:2}}
                loaderProps={{color:'sun.4',type:"bars"}}
                />
    <div className="min-h-[90vh] bg-[#000] p-4">
                  <div className='flex gap-5 '>
                       <PostedJob job={job} jobList={jobList}/>
                       <PostedJobDesc {...job}/>
                  </div>
            </div>
            </>
  )
}

export default PostedJobPage
