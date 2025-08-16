import { ActionIcon } from '@mantine/core';
import { IconPencil, IconPlus, IconX } from '@tabler/icons-react';
import React, { useState } from 'react'
import Certification from './Certification';
import CertiInput from './CertiInput';
import { useSelector } from 'react-redux';


function CertificationPage() {
    const profile=useSelector((state)=>state.profile)
    const [certi,setCerti]=useState(false);
    const [edit,setEdit]=useState(false)
    const handleEdit=()=>{
        
        setEdit(!edit)
    }

    
  return (
   <div className="px-3">
                <div className="text-2xl font-semibold mb-5 flex justify-between">Certification

                   <div className="flex  gap-2">
                    <ActionIcon variant="subtle" color="sun.4" size={"lg"} onClick={()=>setCerti(true)}>
                        {<IconPlus className="h-4/5 w-4/5" />}
                    </ActionIcon>
                     <ActionIcon variant="subtle" color="sun.4" size={"lg"} onClick={()=>handleEdit(3)}>
                        {edit?<IconX className="h-4/5 w-4/5"/>:<IconPencil className="h-4/5 w-4/5" />}
                    </ActionIcon>
                    </div>
                </div>
                <div className="flex flex-col gap-8">
    
                {profile?.certification?.map((exp,index)=><Certification key={index} {...exp} edit={edit}/>)}
                {certi&&<CertiInput setEdit={setCerti}/>}
                </div>
                
            </div>
  )
}

export default CertificationPage
