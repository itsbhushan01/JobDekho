import { Button, Divider } from "@mantine/core"
import { IconBriefcase, IconMapPin } from "@tabler/icons-react"
import ExperiCard from "./ExperiCard"
import Certification from "./Certification"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import axios from "axios"

function Profile(props:any) {
  const id=useParams();
  const [profile,setProfile]=useState<any>({});
  useEffect(()=>{
    window.scrollTo(0,0);
    axios.get("http://localhost:8080/job/get/"+id)
    .then((res)=>{
      setProfile(res.data)
    }).catch((err)=>{
      throw err
    })
  },[id])
  return (
    <div className="w-2/3">
      <div className="relative">
        <img src="/public/JobPortalResources/Profile/banner.jpg" alt="" className="rounded-t-2xl"/>
        <img src="/public/JobPortalResources/avatar.png" alt="" className="rounded-full h-48 w-48 -bottom-1/3 absolute left-3 border bg-[#2d2d2d] border-[#888888]"/>
        
      </div>
      <div className="px-3 mt-16">
            <div className="text-3xl font-semibold flex justify-between">{props.name} 
                
                            <Button  color='sun.4'  variant='filled'>Messsage</Button>
                
            </div>
            <div className="text-xl flex items-center"><IconBriefcase className="h-5 w-5 gap-1"/>{props.role}  &bull; {props.company}</div>
             <div className='flex gap-1  items-center text-[#b1b1b1] text-lg'>
                <IconMapPin stroke={1.5} className='h-4 w-4'/> {props.location}
            </div>
            <div className='flex gap-1  items-center text-[#b1b1b1] text-lg'>
                <IconBriefcase stroke={1.5} className='h-4 w-4'/>Exp: {props.totalExperience} Years
            </div>
        </div>
        <Divider size="xs" my="xl" mx={"xs"} color='grey'/>
        <div className="px-3">
            <div className="text-2xl font-semibold mb-3">About</div>
            <div className="text-sm text-[#b1b1b1] text-justify">{props.about}</div>

        </div>
        <Divider size="xs" my="xl" mx={"xs"} color='grey'/>
        <div className="px-3">
            <div className="text-2xl font-semibold mb-3">Skills</div>
            <div className="flex flex-wrap gap-2">
                {
                  props.skills?.map((skill:any,index:any)=>
                  <div className="bg-[#565246] text-sm font-medium bg-opacity-15 rounded-3xl text-[#03C988] px-3 py-1" key={index}>{skill}</div>
                
                  )
                }
               
            </div>
        </div>
        <Divider size="xs" my="xl" mx={"xs"} color='grey'/>
        <div className="px-3">
            <div className="text-2xl font-semibold mb-5">Experience</div>
            <div className="flex flex-col gap-8">

            {props.experience?.map((exp:any,index:any)=><ExperiCard key={index} {...exp}/>)}
            </div>
        </div>
        <Divider size="xs" my="xl" mx={"xs"} color='grey'/>
         <div className="px-3">
            <div className="text-2xl font-semibold mb-5">Certification</div>
            <div className="flex flex-col gap-8">

            {props.certifications?.map((exp:any,index:any)=><Certification key={index} {...exp}/>)}
            </div>
            
        </div>
    </div>
  )
}

export default Profile
