import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Profile from './Profile';
import { ActionIcon, Textarea } from '@mantine/core';
import { IconCheck, IconPencil, IconX } from '@tabler/icons-react';
import { changeProfile } from '../Slices/ProfileSlice';
import { notifications } from '@mantine/notifications';
import axios from "axios"
function About() {
    const dispatch=useDispatch();
       const [edit,setEdit]=useState(false)
       const profile=useSelector((state)=>state.profile)
       const [about,setAbout]=useState("");
     const handleEdit=()=>{
        if(!edit)
        {
            setEdit(true)   
            setAbout(profile.about)
            // form.setValues({jobTitle:profile.jobTitle,company:profile.company,location:profile.location}) 
        }
        else{
            setEdit(false)
        }
    }

    
    const handleSave=()=>{
            setEdit(false);
            let updatedProfile={...profile,about:about}
            axios.put("http://localhost:8080/profiles/update",updatedProfile)
                   .then((res)=>
                       {
                       dispatch(changeProfile(updatedProfile))
                       notifications.show({
                      title:'Success',
                      message:"Profile Upadated Successfully.",
                      withCloseButton:true,
                      icon:<IconCheck style={{width:"90%",height:"90%"}}/>,
                      color:"teal",
                      withBorder:true,
                      className:"!border-green-500"
                    })
                       }
                   )
                   .catch((err)=>{throw err})
                     
        }
  return (
    <>
      <div className="px-3">
                     <div className="text-2xl font-semibold mb-3 flex justify-between">About<div>
                                       {edit&&<ActionIcon variant="subtle" color="sun.4" size={"lg"} onClick={handleSave}>
                                             {edit?<IconCheck className="h-4/5 w-4/5"/>:<IconPencil className="h-4/5 w-4/5" />}
                                         </ActionIcon>}
                                         <ActionIcon variant="subtle" color={edit?"sun.8":"sun.4"} size={"lg"} onClick={handleEdit}>
                                             {edit?<IconX className="h-4/5 w-4/5"/>:<IconPencil className="h-4/5 w-4/5" />}
                                         </ActionIcon>                    
                                     </div></div>
                     {
                             edit
                             ?
                             <>
                                 <Textarea value={about} autosize minRows={4} placeholder="Enter about yourself" onChange={(e)=>setAbout(e.target.value)}/>                                                
                             </>
                             :
                             <>
                                 <div className="text-sm text-[#b1b1b1] text-justify">{profile.about}</div>
                             </>
                     }
                     
         
                 </div>
    </>
  )
}
export default About
