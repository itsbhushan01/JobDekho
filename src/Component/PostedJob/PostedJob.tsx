import { Tabs } from "@mantine/core"
import { activeJobs, drafts } from "../../assets/JobPortalResources/Data/PostedJob"
import PostedJobCard from "./PostedJobCard"
import {  LoadingOverlay } from "@mantine/core"
import { act, useEffect, useState } from "react"
import { IconTemperature } from "@tabler/icons-react";

function PostedJob(props:any) {
  const [activeTab,setActiveTab]=useState<string|any>('active');
  const [loader,setLoader]=useState(false)

  useEffect(()=>{
    setActiveTab(props.job?.jobStatus||"active")
  },[props.job])
 
  return (
    <>

    <div className="w-1/6 mt-5">
      <div className="text-2xl font-semibold mb-5">Jobs</div>
      <div>
         <Tabs autoContrast variant="pills" value={activeTab} onChange={setActiveTab}>
                            <Tabs.List className="[&_button[aria-selected='false']]:bg-[#3d3d3d] font-medium">
                                <Tabs.Tab value="active">Active [{props.jobList?.filter((job:any)=>job?.jobStatus=="ACTIVE").length}]</Tabs.Tab>
                                <Tabs.Tab value="draft">Draft [{props.jobList?.filter((job:any)=>job?.jobStatus=="DRAFT").length}]</Tabs.Tab>
                                
                            </Tabs.List>
                           
                                <Tabs.Panel value={activeTab}>
                                    <div className="flex flex-col gap-5 mt-5">
                                        {
                                          
                                            props.jobList?.filter((job:any)=>job?.jobStatus!=activeTab).map((item,index)=><PostedJobCard key={index} {...item}/>)
                                        }
                                    </div>
                                </Tabs.Panel>
                        </Tabs>
      </div>
    </div>
    </>
  )
}

export default PostedJob
