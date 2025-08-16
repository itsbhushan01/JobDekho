import { Button, Divider, Text } from '@mantine/core'
import { IconBookmark, IconBookmarkFilled, IconCheck, IconClockHour3 } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import { timeAgo } from '../Services/Utilities'
import { useDispatch, useSelector } from 'react-redux'
import { changeProfile } from '../Slices/ProfileSlice'
import axios from 'axios'
import { notifications } from '@mantine/notifications'


function JobCard(props:any) {
    const profile=useSelector((state:any)=>state.profile)
    const dispatch=useDispatch();
    const handleSaveJob=()=>{
      let savedJob=Array.isArray(profile.savedJobs)?[...profile.savedJobs]:[];
      if(savedJob?.includes(props.id)){
        savedJob=savedJob?.filter((id:any)=>id!==props.id);
      }
      else{
        savedJob=[...savedJob,props.id];
      }
      let updatedProfile={...profile,savedJobs:savedJob}
      axios.put("http://localhost:8080/profiles/update",updatedProfile)
                  .then((res)=>{
                    dispatch(changeProfile(updatedProfile))
                        notifications.show({
                        title:'Success',
                        message:`Saved Jobs`,
                        withCloseButton:true,
                        icon:<IconCheck style={{width:"90%",height:"90%"}}/>,
                        color:"teal",
                        withBorder:true,
                        className:"!border-green-500"
                      })
                     
                    }
                  ).catch((err)=>
                  {
                        throw err
                      })
                  console.log(updatedProfile)
    }
  return (
    <div  className='bg-[#0d0d0d] p-4 w-72 flex flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_yellow] !shadow-[#03C988]'>
      <div className='flex justify-between'  >
        <div className='flex gap-2 items-center'>
            <div className='p-2 bg-[#1c1c1c]  rounded-md'>
                <img className='h-7' src={`/public/JobPortalResources/Icons/${props.company}.png`} alt="its me" />
            </div>
            <div>
                <div className='font-semibold'>{props.jobTitle}</div>
                <div className='text-sm  text-[#e1e1e1]'><Link to="/company" className='hover:text-[#d1d1d1]'>{props.company}</Link> &#x2022; {props.applicant?props.applicant.length:0} Applicants.</div>
            </div>
        </div>
       { profile.savedJobs?.includes(props.id)?<IconBookmarkFilled onClick={handleSaveJob} className='text-[#d1d1d1] hover:cursor-pointer text-[#03C988]' />
       :<IconBookmark onClick={handleSaveJob} className='text-[#d1d1d1] hover:cursor-pointer hover:text-[#03C988]' />}
        <div>

        </div>
      </div>
      <div className='flex gap-2'>
        <div className='py-1 px-2 bg-[#1c1c1c] text-[#03C988] rounded-lg text-xs'>{props.experience}</div>
        <div className='py-1 px-2 bg-[#1c1c1c] text-[#03C988] rounded-lg text-xs'>{props.jobType}</div>
        <div className='py-1 px-2 bg-[#1c1c1c] text-[#03C988] rounded-lg text-xs'>{props.location}</div>
      </div>
      <Text className='!text-xs text-justify text-[#e7e7e7] !font-semibold' lineClamp={3}>
        {props.about}
        </Text>
        <Divider size="xs" color='grey'/>
      <div className='flex justify-between'>
        <div className='font-semibold text-white'>
            &#8377; {props.packageOffered} LPA
        </div>
        <div className='flex gap-1 text-xs items-center text-[#888888]'>
           <IconClockHour3 stroke={1.5} className='h-4 w-4'/>Posted {timeAgo(props.postTime)} 
        </div>
      </div>
      <Link to={`/jobs/${props.id}`}>
        <Button fullWidth color='sun.4' variant='outline'>View Jobs</Button>
      </Link>
    </div> 
  )
}

export default JobCard
