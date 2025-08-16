import { ActionIcon, TagsInput } from '@mantine/core'
import { IconCheck, IconPencil, IconX } from '@tabler/icons-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeProfile } from '../Slices/ProfileSlice';
import { notifications } from '@mantine/notifications';
import axios from "axios"
function Skills() {
    const dispatch=useDispatch();
           const [edit,setEdit]=useState(false)
           const profile=useSelector((state)=>state.profile)
           const [skills,setSkill]=useState([]);

           const handleEdit=()=>{
                   if(!edit)
                   {
                       setEdit(true)   
                       setSkill(profile.skills)
                        
                       // form.setValues({jobTitle:profile.jobTitle,company:profile.company,location:profile.location}) 
                   }
                   else{
                       setEdit(false)
                   }
               }
           
               
               const handleSave=()=>{
                       setEdit(false);
                       let updatedProfile={...profile,skills:skills}
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
    <div className="px-3">
                    <div className="text-2xl font-semibold mb-3 flex justify-between">Skills<div>
                                      {edit&&<ActionIcon variant="subtle" color="sun.4" size={"lg"} onClick={handleSave}>
                                            {edit?<IconCheck className="h-4/5 w-4/5"/>:<IconPencil className="h-4/5 w-4/5" />}
                                        </ActionIcon>}
                                        <ActionIcon variant="subtle" color={edit?"sun.8":"sun.4"} size={"lg"} onClick={handleEdit}>
                                            {edit?<IconX className="h-4/5 w-4/5"/>:<IconPencil className="h-4/5 w-4/5" />}
                                        </ActionIcon>                    
                                    </div>
                    </div>
                    {
                        edit
                        ?
                        <>
                            <TagsInput placeholder="Add Skills" splitChars={[","," ","|"]} value={skills} onChange={setSkill}/>
                        </>
                        :
                        <>
                        <div className="flex flex-wrap gap-2">
                        {
                          profile?.skills?.map((skill,index)=>
                          <div className="bg-[#565246] text-sm font-medium bg-opacity-15 rounded-3xl text-[#ffbd20] px-3 py-1" key={index}>{skill}</div>
                        
                          )
                        }
                        </div>
                        </>
                    }
                    
                </div>
  )
}

export default Skills
