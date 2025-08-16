import { Tabs } from "@mantine/core"
import Card from "./Card"

import { useEffect, useState } from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { setJob } from "../Slices/JobSlice"

function savedHistories() {
  const dispatch=useDispatch();
  const jobList=useSelector((state:any)=>state.job)
  const profile=useSelector((state:any)=>state.profile)
  const [activeTab,setActiveTab]=useState("APPLIED")
  const [showList,setShowList]=useState<any>([])
  const user=useSelector((state:any)=>state.user)
  useEffect(()=>{
    axios.get("http://localhost:8080/job/getall")
    .then((res)=>{
      dispatch(setJob(res.data))
      setShowList(jobList?.filter((job:any)=>{
        let found=false;
        job.applicant?.filter((applicant:any)=>{
          if(applicant.applicationStatus=="APPLIED"){
            found=true;
            console.log(job);
          }
        })
        return found;
      }))     
  })
    .catch((err)=>{throw err})
  },[])

  const handleTabChange=(value:any)=>{
      setActiveTab(value)
      if(value=="SAVED"){
        setShowList(jobList?.filter((job:any)=>profile.savedJobs?.includes(job.id)))
      }
      else{
        console.log(value)
        setShowList(jobList?.filter((job:any)=>{
        let found=false;
        job.applicant?.forEach((applicant:any)=>{
          if(applicant.applicationStatus==value){
            found=true;
          }
        })
        return found;
      }))  
      }
  }

  return (
    <div>
        <div className="text-2xl font-semibold mb-5">saved History</div>
        <div>
            <Tabs variant="outline" radius="lg" value={activeTab} onChange={handleTabChange}>
                  <Tabs.List className="[&_button]:!text-lg font-semibold [&_button[data-active='true']]:!text-[#03C988]">
                      <Tabs.Tab value="APPLIED">Applied</Tabs.Tab>
                      <Tabs.Tab value="SAVED">saveds</Tabs.Tab>
                      <Tabs.Tab value="OFFERED">offered</Tabs.Tab>
                       <Tabs.Tab value="INTERVIEWING">interviewing</Tabs.Tab>
                  </Tabs.List>

                      <Tabs.Panel value={activeTab}>
                        <div className="flex mt-10 flex-wrap gap-10 justify-center">
                        {
                            showList.map((job:any,index:any)=><Card key={index} {...job} {...{[activeTab.toLowerCase()]:true}}/>)
                        }
                        </div>
                      </Tabs.Panel>
                    </Tabs>
              </div>
    </div>
  )
}

export default savedHistories
