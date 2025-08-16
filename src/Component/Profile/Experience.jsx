import { ActionIcon } from '@mantine/core'
import { IconDeviceFloppy, IconPencil, IconPlus, IconX } from '@tabler/icons-react'
import React, { useState } from 'react'
import ExpInput from './ExpInput'
import { useSelector } from 'react-redux'
import ExperiCard from './ExperiCard'

function Experience() {
    const profile=useSelector((state)=>state.profile)
    const [edit,setEdit]=useState(false);
    const [addExp,setAdd]=useState(false)
    const handleEdit=()=>{
        setEdit(!edit)
    }
    
  return (
    <div className="px-3">
                    <div className="text-2xl font-semibold mb-5 flex justify-between">Experience
    
                        <div className="flex  gap-2">
                        <ActionIcon variant="subtle" color="sun.4" size={"lg"} onClick={()=>setAdd(true)}>
                            {<IconPlus className="h-4/5 w-4/5" />}
                        </ActionIcon>
                         <ActionIcon variant="subtle" color="sun.4" size={"lg"} onClick={handleEdit}>
                            {edit?<IconX className="h-4/5 w-4/5"/>:<IconPencil className="h-4/5 w-4/5" />}
                        </ActionIcon>
                        </div>
                    </div>
                    <div className="flex flex-col gap-8">
                        {profile?.experience?.map((exp,index)=><ExperiCard key={index} index={index} {...exp} edit={edit}/>)}
                        {addExp&&<ExpInput add setEdit={setAdd}/>}
                    </div>
                    
             
                </div>
  )
}

export default Experience
