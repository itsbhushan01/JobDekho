import { ActionIcon, NumberInput } from '@mantine/core'
import { IconBriefcase, IconCheck, IconDeviceFloppy, IconMapPin, IconPencil, IconX } from '@tabler/icons-react'
import React, { useState } from 'react'
import { SelectInput } from '../PostJob/SelectInput'
import fields from '../../assets/JobPortalResources/Data/Profile'
import {hasLength, isEmail, useForm} from '@mantine/form';
import Profile from './Profile'
import { useDispatch, useSelector } from 'react-redux'
import { changeProfile } from '../Slices/ProfileSlice'
import { notifications } from '@mantine/notifications'
import axios from 'axios'

function Info(props) {
    const dispatch=useDispatch();
    const select=fields;
    const [edit,setEdit]=useState(false)
    const profile=useSelector((state:any)=>state.profile)
    const user=useSelector((state:any)=>state.user)
    
    const handleEdit=()=>{
        if(!edit)
        {
            setEdit(true)   
            form.setValues({role:profile.role,company:profile.company,location:profile.location,totalExperience:profile.totalExperience}) 
        }
        else{
            setEdit(false)
            console.log(form.getValues())
            let updatedProfile={...profile,...form.getValues()}
            dispatch(changeProfile(updatedProfile));
        }
    }
    const form = useForm({
        mode: 'controlled',
        initialValues: {role:'',company:'',location:'',totalExperience:1},
        
    })

    const handleSave=()=>{
        setEdit(false);
        let updatedProfile={...profile,...form.getValues()}
       
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
                <div className="text-3xl font-semibold flex justify-between">{profile.name}<div>
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
                        <div className="flex gap-5 [&>*]:w-1/2">
                            <SelectInput form={form} name="role" {...select[0]}/>
                            <SelectInput form={form} name="company" {...select[1]}/>
                        </div>
                        <div className="flex gap-5 [&>*]:w-1/2">
                        <NumberInput label="Experience" withAsterisk name='totalExperience' {...form.getInputProps("totalExperience")}/>
                        <SelectInput form={form} name="location" {...select[2]}/>
                        </div>
                                                
                        </>
                        :
                        <>
                        <div className="text-xl flex items-center"><IconBriefcase className="h-5 w-5 gap-1"/>{profile.role}  &bull; {profile.company}</div>
                         <div className='flex gap-1  items-center text-[#b1b1b1] text-lg'>
                                <IconMapPin stroke={1.5} className='h-4 w-4'/> {profile.location}
                         </div>
                         <div className='flex gap-1  items-center text-[#b1b1b1] text-lg'>
                                <IconBriefcase stroke={1.5} className='h-4 w-4'/>Exp: {profile.totalExperience} Years
                         </div>
                        </>
                    }
                
            </>
  )
}

export default Info
