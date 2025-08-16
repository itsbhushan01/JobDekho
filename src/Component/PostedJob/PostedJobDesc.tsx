import { Badge, Tabs } from "@mantine/core"
import { talents } from "../../assets/JobPortalResources/Data/TalentData"
import TalentCard from "../FindTalent/TalentCard"
import JobDesc from "../JobDesc/JobDesc"
import { useEffect, useState } from "react"

function PostedJobDesc(props:any) {
    const [tab,setTab]=useState("overview");
    const [arr,setArr]=useState<any>([])

 
    const handleTab=(value:any)=>{
        setTab(value)
        if(value=="applicant"){
            setArr(props.applicant?.filter((x:any)=>x.applicationStatus=="APPLIED"))
        }
        else if(value=="invited"){
            setArr(props.applicant?.filter((x:any)=>x.applicationStatus=="INTERVIEWING"))
        }
         else if(value=="offered"){
            setArr(props.applicant?.filter((x:any)=>x.applicationStatus=="OFFERED"))
        }
         else if(value=="rejected"){
            setArr(props.applicant?.filter((x:any)=>x.applicationStatus=="REJECTED"))
        }

    }

    useEffect(()=>{
        handleTab("overview")
    },[props])
  return (
    <div className="mt-5 w-3/4 p-5">
    {props.jobTitle?<>
      <div className="text-2xl font-semibold flex items-center">{props.jobTitle} <Badge variant="light" color="sun.4" ml="sm" size="sm">{props.jobStatus}</Badge></div>
        
        <div className="font-medium text-[#d1d1d1] mb-5">{props.location}</div>
        <div>
            <Tabs variant="outline" radius="lg" value={tab} onChange={handleTab}>
                                <Tabs.List className="[&_button]:!text-lg font-semibold [&_button[data-active='true']]:!text-[#03C988]">
                                    <Tabs.Tab value="overview">Overview</Tabs.Tab>
                                    <Tabs.Tab value="applicant">Applicants</Tabs.Tab>
                                    <Tabs.Tab value="invited">Invited</Tabs.Tab>
                                    <Tabs.Tab value="offered">Offered</Tabs.Tab>
                                    <Tabs.Tab value="rejected">Rejected</Tabs.Tab>
                                </Tabs.List>
                               
                                    <Tabs.Panel value="overview" className="[&>div]:w-full [&>div]:pt-5">
                                        <JobDesc {...props} edit/>
                                    </Tabs.Panel>
                                    <Tabs.Panel value="applicant">
                                        <div className="flex mt-10 flex-wrap gap-5 justify-around">
                                            {

                                                arr?.length?arr.map((talent,index)=>index<6&&<TalentCard key={index} {...talent} posted />):<div className="text-2xl font-bold">No Invited Candidates</div>
                                            }
                                        </div>
                                    </Tabs.Panel>
                                    <Tabs.Panel value="invited">
                                        <div className="flex mt-10 flex-wrap gap-5 justify-around">
                                            {
                                               arr?.length?arr.map((talent,index)=>index<6&&<TalentCard key={index} {...talent} invited />):<div className="text-2xl font-bold">No Invited Candidates</div>
                                            }
                                        </div>
                                    </Tabs.Panel>
                                    <Tabs.Panel value="offered">
                                        <div className="flex mt-10 flex-wrap gap-5 justify-around">
                                            {
                                                arr?.length?arr.map((talent,index)=>index<6&&<TalentCard key={index} {...talent} offered />):<div className="text-2xl font-bold">No Offered Candidates</div>
                                            }
                                        </div>
                                    </Tabs.Panel>
                                    <Tabs.Panel value="rejected">
                                        <div className="flex mt-10 flex-wrap gap-5 justify-around">
                                            {
                                                arr?.length?arr.map((talent,index)=>index<6&&<TalentCard key={index} {...talent} rejected />):<div className="text-2xl font-bold">No Rejected Candidates</div>
                                            }
                                        </div>
                                    </Tabs.Panel>
                            </Tabs>
        </div>
    </>:<div className="text-2xl font-semibold flex justify-center items">No Job Selected</div>}
    </div>
  )
}

export default PostedJobDesc
