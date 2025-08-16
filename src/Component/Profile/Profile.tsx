import { ActionIcon,  Divider, TagsInput, Textarea } from "@mantine/core"
import { IconBriefcase, IconDeviceFloppy, IconMapPin, IconPencil, IconPlus, IconX } from "@tabler/icons-react"
import ExperiCard from "./ExperiCard"
import Certification from "./Certification"
import { useEffect, useState } from "react"
import { SelectInput } from "../PostJob/SelectInput"
import fields from "../../assets/JobPortalResources/Data/Profile"
import ExpInput from "./ExpInput"
import CertiInput from "./CertiInput"
import { useDispatch, useSelector } from "react-redux"
import { getProfile } from "../Services/ProfileService"
import { setProfile } from "../Slices/ProfileSlice"
import Info from "./Info"
import axios from "axios"
import About from "./About"
import Skills from "./Skills"
import Experience from "./Experience"
import CertificationPage from "./CertificationPage"
function Profile(props:any) {
    const dispatch=useDispatch();
    const user=useSelector((state:any)=>state.user)
    const profile=useSelector((state:any)=>state.profile)
    const [data,setData]=useState(profile)
    const[edit,setEdit]=useState([false,false,false,false,false])
    const [about,setAbout]=useState(props.about);
    const [skills,setSkills]=useState(props.skills);
    const [add,setAdd]=useState(false)
    const [certi,setCerti]=useState(false)
    const handleEdit=(index:any)=>{
        const newEdit={...edit};
        newEdit[index]=!newEdit[index];
        setEdit(newEdit)
    }

 useEffect(()=>{
    axios.get("http://localhost:8080/profiles/get/"+user.id).then((res:any)=>{
            dispatch(setProfile(res.data))
            console.log(res.data)
                }).catch((err)=>
            console.log(err)
        )
   },[])  

  return (
    <div className="w-2/3 mx-auto bg-[#000] pb-10" >
          <div className="relative">
            <img src="/public/JobPortalResources/Profile/banner.jpg" alt="" className="rounded-t-2xl"/>
            <img src="/public/JobPortalResources/avatar.png" alt="" className="rounded-full h-48 w-48 -bottom-1/3 absolute left-3 border bg-[#000] border-[#888888]"/>
            
          </div>
         
         
         
         
         
          <div className="px-3 mt-16">
             <Info/>
            </div>
         
            <Divider size="xs" my="xl" mx={"xs"} color='grey'/>
         
         
         
           <About/>
         
         
            <Divider size="xs" my="xl" mx={"xs"} color='grey'/>
         
         
            <Skills/>
         
            <Divider size="xs" my="xl" mx={"xs"} color='grey'/>
         
            <Experience/>
            <Divider size="xs" my="xl" mx={"xs"} color='grey'/>
             <CertificationPage/>
            
        </div>
  )
}

export default Profile
