import { ActionIcon, Button, Divider } from "@mantine/core"
import {  IconBookmark, IconBookmarkFilled, IconMapPin } from "@tabler/icons-react"
import { Link } from "react-router-dom"
import { card, desc, skills } from "../../assets/JobPortalResources/Data/JobDescData"
import { useDispatch, useSelector } from "react-redux"
import { changeProfile } from "../Slices/ProfileSlice"
import { useEffect, useState } from "react"
import { timeAgo } from "../Services/Utilities"

//@ts-ignore
// import DOMPurify from 'dompurify'


function JobDesc(props:any|[]) {
  // const data= DOMPurify.sanitize(desc);
  const profile=useSelector((state:any)=>state.profile)
  const [applied,setApplied]=useState(false);
  const user=useSelector((state:any)=>state.user)
  useEffect(()=>{
    if(props.applicant?.filter((applicant:any)=>applicant.applicantId==user.id).length>0){
      setApplied(true)
    }
    else{
      setApplied(false)
    }
  },[props.id])
  const dispatch=useDispatch();
    const handleSaveJob=()=>{
      let savedJobs=[...profile.savedJobs];
      if(savedJobs?.includes(props.id)){
        savedJobs=savedJobs?.filter((id:any)=>id!==props.id);
      }
      else{
        savedJobs=[...savedJobs,props.id];
      }
      let updatedProfile={...profile,savedJobs:savedJobs}
      dispatch(changeProfile(updatedProfile));
    }
  return (
    
    <div className='w-2/3'>
            <div className='flex justify-between'  >
              <div className='flex gap-2 items-center'>
                  <div className='p-3 bg-[#454545]  rounded-xl'>
                      <img className='h-14' src={`/public/JobPortalResources/Icons/${props.company}.png`} alt="its me" />
                  </div>
                  <div>
                      <div className='font-semibold text-2xl'>{props.jobTitle}</div>
                      <div className='text-md  text-[#e1e1e1]'>{props.company} &#x2022; {timeAgo(props.postTime)} &#x2022; {props.applicant?.length} Applicants.</div>
                  </div>
              </div>
              <div className="flex flex-col gap-2 items-center">
               { (props.edit||!applied)&&<Link to={props.edit?`/post-job/${props.id}`:`/apply/${props.id}`}>
                
                 <Button color="sun.4" variant="light" size="sm">{props.edit?"Edit":"Apply"}</Button>
                </Link>}
                {
                 (!props.edit&&applied)&&<Button color="green" size="sm" variant="light">Applied</Button>
                }
                {props.edit?<Button color="red"  variant="light" size="sm">Close</Button>:profile.savedJobs?.includes(props.id)?<IconBookmarkFilled onClick={handleSaveJob} className='text-[#d1d1d1] hover:cursor-pointer text-[#ffd919]' />
       :<IconBookmark onClick={handleSaveJob} className='text-[#d1d1d1] hover:cursor-pointer hover:text-[#ffd919]' />}
       
              </div>
            </div>
             <Divider my="xl"/>
             <div className="flex justify-between">
              {
                card.map((item,index)=>
                  <div className="flex flex-col items-center gap-1" key={index}>
                  <ActionIcon className="!h-12 !w-12" color="sun.4" variant="light" size="lg" radius="xl" arial-label="setting">
                    <item.icon className="h-4/5 w-4/5" style={{width: '70%',height: '70%'}} stroke={1.5}/>
                  </ActionIcon>
                  <div className="text-[#e1e1e1] text-sm">{item.name}</div>
                  <div className="font-semibold"> {props?props[item.id]:"NA"} {item.id=="packageOffered"?<> LPA</>:""}</div>
                </div>
                )
              }

                
             </div>
             <Divider my="xl"/>
             <div>
                <div className="text-xl font-semibold mb-5">Required Skills</div>
                <div className="flex flex-wrap gap-2">
                 
                       {
                        props.skills?.map((skill,index)=>
                        <ActionIcon  key={index} color="sun.4" className="!font-medium !h-fit !w-fit" variant="light" radius="xl" arial-label="Setting" p="xs">
                        {skill}
                      </ActionIcon>
                        )
                       }
                      
                </div>
             </div>
              <Divider my="xl"/>
              <div  className="[&_h4]:text-xl [&_h4]:my-5 [&_h4]:font-semibold [&_h4]:text-[#e1e1e1 ] [&_p]:text-justify [&_*]:text-[#e1e1e1] [&_li]:marker:text-[#ffd149] [&_li]:mb-1" dangerouslySetInnerHTML={{__html:props.description}}>
              </div>
                <Divider my="xl"/>
                <div>
                  <div className="text-xl font-semibold mb-5">About Company</div>
                   <div>
                      <div className='flex justify-between mb-3 text-justify'  >
                      <div className='flex gap-2 items-center'>
                          <div className='p-3 bg-[#454545]  rounded-xl'>
                              <img className='h-8' src={`/public/JobPortalResources/Icons/${props.company}.png`} alt="its me" />
                          </div>
                          <div className="flex flex-col gap-1">
                              <div className='font-medium text-lg'>{props.company}</div>
                              <div className='text-lg  text-[#e1e1e1]'>10k+ Employees</div>
                          </div>
                      </div>
                      <div className="flex flex-col gap-2 items-center">
                        <Link to={`/company/${props.id}`}>
                        
                        <Button color="sun.4" variant="light" size="sm">Company Page</Button>
                        </Link>
                        
                      </div>
                      
                    </div>
                    
                  </div> 
                </div>
              
    </div>
  )
}

export default JobDesc
