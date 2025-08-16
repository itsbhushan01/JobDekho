import { Button, Divider, Text } from '@mantine/core'
import { IconBookmark, IconBookmarkFilled, IconCalendarMonth, IconClockHour3 } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import { timeAgo } from '../Services/Utilities'
import { useDispatch, useSelector } from 'react-redux'
import { changeProfile } from '../Slices/ProfileSlice'


function Card(props:any) {
  const profile=useSelector((state:any)=>state.profile)
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
    <div  className='bg-[#0d0d0d] p-4 w-72 flex flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_yellow] !shadow-[#03C988]'>
      <div className='flex justify-between'  >
        <div className='flex gap-2 items-center'>
            <div className='p-2 bg-[#1d1d1d]  rounded-md'>
                <img className='h-7' src={`/public/JobPortalResources/Icons/${props.company}.png`} alt="its me" />
            </div>
            <div>
                <div className='font-semibold'>{props.jobTitle}</div>
                <div className='text-sm  text-[#e1e1e1]'>{props.company} &#x2022; {props.applicant?props.applicant.length:0} Applicants.</div>
            </div>
        </div>
        { profile.savedJobs?.includes(props.id)?<IconBookmarkFilled onClick={handleSaveJob} className='text-[#d1d1d1] hover:cursor-pointer text-[#ffd919]' />
       :<IconBookmark onClick={handleSaveJob} className='text-[#d1d1d1] hover:cursor-pointer hover:text-[#03C988]' />}
        <div>

        </div>
      </div>
      <div className='flex gap-2'>
        <div className='py-1 px-2 bg-[#1d1d1d] text-[#03C988] rounded-lg text-xs'>{props.experience}</div>
        <div className='py-1 px-2 bg-[#1d1d1d] text-[#03C988] rounded-lg text-xs'>{props.jobType}</div>
        <div className='py-1 px-2 bg-[#1d1d1d] text-[#03C988] rounded-lg text-xs'>{props.location}</div>
      </div>
      <Text className='!text-xs text-justify text-[#e7e7e7] !font-semibold' lineClamp={3}>
        {props.about}
        </Text>
        <Divider size="xs" color='grey'/>
      <div className='flex justify-between'>
        <div className='font-semibold text-white'>
            &#8377; {props.packageOffered} 
        </div>
        <div className='flex gap-1 text-xs items-center text-[#888888]'>
           <IconClockHour3 stroke={1.5} className='h-4 w-4'/> {props.applied?"Applied":props.offered?"Interviewed":"Posted"} {timeAgo(props.postTime)} 
        </div>
      </div>
      {
        (props.offered || props.interviewing)&&<Divider size="xs" color='grey'/>
      }
      {
        props.offered&&<div className='flex gap-2'>
            <Button color="sun.4" variant='outline' fullWidth>Accept</Button>
            <Button color="sun.4" variant='light' fullWidth>Reject</Button>
        </div>
      }
      {
        props.interviewing&&<div className='flex gap-1  text-sm items-center'>
                      <IconCalendarMonth className='text-[#03C988] w-5 h-5' stroke={1.5}/>Sun, 27  August 2024 &bull; <span className='text-[#e1e1e1]'> 10:00 AM</span>
                    </div>
      }
       <Link to={`/jobs/${props.id}`}>
        <Button fullWidth color='sun.4' variant='outline'>View Jobs</Button>
      </Link>
    </div>
  )
}

export default Card
