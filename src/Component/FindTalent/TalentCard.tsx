import { Avatar, Button, Divider, Modal, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {   IconCalendarMonth, IconCheck, IconHeart, IconMapPin } from '@tabler/icons-react'
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom'
import {DateInput, TimeInput} from "@mantine/dates"
import { notifications } from '@mantine/notifications';
import { formateInterviewTime } from '../Services/Utilities';
import { useSelector } from 'react-redux';
import JobDesc from '../JobDesc/JobDesc';

function TalentCard(props:any) {
  const ref=useRef<HTMLInputElement>(null)
  const [opened,{open,close}]=useDisclosure(false);
  const job=useSelector((state:any)=>state.job);
  const [profile,setProfile]=useState<any>({});
  const [date,setDate]=useState<any>(new Date());
  const [time,setTime]=useState<any>(null)
  const {id}=useParams();
  
  
  useEffect(()=>{
    if(props.applicantId){
      axios.get("http://localhost:8080/profiles/get/"+props.applicantId)
      .then((res)=>setProfile(res.data))
      .catch((err)=>{throw err})
      
    }
    else{
      setProfile(props);
    }
  },[props])
  
  const handleOffered=(status:string)=>{
    let updatedJob={...job,applicant:job.applicant.map(app=>app.applicantId===profile?.id ? {...app,applicationStatus:status}:app)}
    if(status=="INTERVIEWING"){
      const [hour,minute]=time.split(":").map(Number);
      date?.setHours(hour,minute);
      updatedJob={...job,applicant:job.applicant.map(app=>app.applicantId===profile?.id ? {...app,applicationStatus:status,interviewTime:date}:app)}
    }
    if(status=="OFFERED"){
      console.log("true");
    }
   console.log(updatedJob);
    axios.put("http://localhost:8080/job/updatedjob",updatedJob)
    .then((res)=>{
       notifications.show({
         message:"Success",
         title:'Success',
         withCloseButton:true,
         icon:<IconCheck style={{width:"90%",height:"90%"}}/>,
         color:"teal",
         withBorder:true,
         className:"!border-green-500"
       })
     
    }).catch((err)=>{
      notifications.show({
         message:"Error",
         title:'Failed',
         withCloseButton:true,
         icon:<IconCheck style={{width:"90%",height:"90%"}}/>,
         color:"red",
         withBorder:true,
         className:"!border-green-500"
       })
    })
  }
  return (
  
       <div className='bg-[#0d0d0d] p-4 w-96 flex flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_yellow] !shadow-[#03C988]'>
         <div className='flex justify-between'  >
           <div className='flex gap-2 items-center'>
               <div className='p-2 bg-[#1c1c1c]  rounded-full'>
                   <Avatar size="lg" src={`/public/JobPortalResources/Icons/abc.png`} alt="its me" />
               </div>
               <div>
                   <div className='font-semibold text-lg'>{profile?.name}</div>
                   <div className='text-sm  text-[#e1e1e1]'>{profile?.role} &#x2022; {profile?.company}.</div>
               </div>
           </div>
           <IconHeart className='text-[#d1d1d1] hover:cursor-pointer'/>
           <div>
   
           </div>
         </div>
          <div className='flex gap-2'>
           {
            profile?.skills?.map((skill:any,index:any)=>
                index<4&&<div className='py-1 px-2 bg-[#1c1c1c] text-[#03C988] rounded-lg text-xs' key={index}>{skill}</div>
            )
          }
         </div>
         <div>
          <Text className='!text-xs text-justify text-[#e7e7e7] !font-semibold' lineClamp={3}>
           {profile?.about}
           </Text>
         </div>
           <Divider size="xs" color='grey'/>
           {
            props.invited?<div className='flex gap-1 text-[#e1e1e1] text-sm items-center'>
              <IconCalendarMonth stroke={1.5}/>Interview: {formateInterviewTime(props.interviewTime)}
            </div>:
            <div className='flex justify-between'>
           <div className='font-semibold text-white'>
              Exp: {props.totalExperience?props.totalExperience:"1"} Years
           </div>
           <div className='flex gap-1 text-xs items-center text-[#888888]'>
              <IconMapPin stroke={1.5} className='h-4 w-4'/> {profile?.location}
           </div>
         </div>
           }
         
         <Divider size="xs" color='grey'/>
         <div className='flex'>
            {
              !props.invited&&<>
              <NavLink to={`/talent-profile/${profile?.id}`} className='p-1 w-1/2'>
                <Button  color="sun.4" fullWidth variant='outline'>Profile</Button>
            </NavLink>
            <div className='p-1 w-1/2'>
                {props.posted?<Button onClick={open} rightSection={<IconCalendarMonth className='w-5 h-5'/>} color='sun.4' fullWidth variant='light'>Schedule</Button>:<Button   fullWidth variant='filled'>Messsage</Button>}
            </div>
              </>
            }
            {
              props?.invited&&<>
              <div>
                <Button  color="sun.4" fullWidth onClick={()=>handleOffered("OFFERED")} variant='outline'>Accept</Button>
              </div>
              <div>
                <Button  color="sun.4" fullWidth onClick={()=>handleOffered("REJECTED")} variant='light'>Reject</Button>
              </div>
              </>
            }
            </div>
            <Modal opened={opened} onClose={close} title="Schedule Interview" centered>
                <div className='flex flex-col gap-4'>
                  <DateInput value={date} onChange={setDate} minDate={new Date()} label="Date" placeholder='Enter Date'/>
                  <TimeInput label="Time" ref={ref} value={time} minTime='' onChange={(e)=>setTime(e.currentTarget.value)} onClick={()=>ref.current?.showPicker()}/>
                  <Button color='sun.4' variant='light' onClick={()=>handleOffered("INTERVIEWING")} fullWidth>Schedule</Button>  
                  
                </div>
            </Modal>
       </div>
   
  )
}

export default TalentCard
