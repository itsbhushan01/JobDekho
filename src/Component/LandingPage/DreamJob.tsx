import { Avatar, TextInput } from '@mantine/core'
import Boy from '../../assets/JobPortalResources/Boy.png'
import avatar from '../../assets/JobPortalResources/avatar.png'
import avatar1 from '../../assets/JobPortalResources/avatar1.png'
import avatar2 from '../../assets/JobPortalResources/avatar2.png'
import google from '../../assets/JobPortalResources/Icons/Google.png'
import { IconSearch } from '@tabler/icons-react'
function DreamJob() {
  return (
    <div >
     <div className='flex flex-col justify-center text-center gap-2 py-10 '>
            <div className='text-4xl font-bold text-[#e7e7e7] leading-tight'>Find your <span className='text-[#03C988]'>dream job</span> with us</div>
            <div className='text-[#d1d1d1] text-lg'>Good life begins with agood company. Start explore thosands of jobs in one place.</div>
            <div className='flex gap-3 mt-5 justify-center'>
                <TextInput className='bg-[#1d1d1d] rounded-lg p-1 px-2 text-[#e7e7e7]' variant='unstyled' label="Job Title" placeholder='Software Engineer'/>
                <TextInput className='bg-[#1d1d1d] rounded-lg p-1 px-2 text-[#e7e7e7]' variant='unstyled' label="Job Type" placeholder='Fulltime'/>
                <div className='flex items-center justify-center h-full w-20 bg-[#03C988] text-[#e7e7e7] rounded-lg p-2 hover:bg-[#03C988]'>
                    <IconSearch className='h-[85%] w-[85%]'/>
                </div>
            </div>
      </div>
    <div className='flex gap-5 items-center justify-center'>
     <div className="relative">
                     <img src="/public/JobPortalResources/Working/Girl.png" alt="girl" className="w-[30rem]"/>
                     <div className="w-36 flex flex-col top-[15%] right-0 absolute items-center gap-1 border-[#03C988] border rounded-xl py-3 px-1 backdrop-blur-md">
                         <Avatar src="/public/JobPortalResources/avatar1.png" alt="it me" className="!h-16 !w-16"/>
                         <div className="text-center text-sm font-semibold text-[#e7e7e7]">Complete your profile</div>
                         <div className="text-xs text-[#d1d1d1]">70% Completed</div>
                     </div>
                 </div>
      <div className=' flex items-center justify-center'>
        <div className='w-[30rem] relative'>
            <img src={Boy} alt="boy" />
            <div className='w-fit absolute -right-10 top-[50%] border-[#03C988] border rounded-lg p-2 backdrop-blur-md'>
              <div className='text-center mb-1 text-sm text-[#e7e7e7]'>10K+ got job</div>
              <Avatar.Group>
                <Avatar src={avatar}  alt='avtar'/>
                <Avatar src={avatar1} alt='avtar'/>
                <Avatar src={avatar2} alt='avtar'/>
                <Avatar>+5</Avatar>
              </Avatar.Group>
            </div>
            <div className='w-fit absolute -left-10 top-[30%] border-[#03C988] border rounded-lg p-2 backdrop-blur-md gap-3 flex flex-col'>
                <div className='flex gap-2 items-center '>
                    <div className='w-10 h-10 p-1 bg-[#3d3d3d] rounded-lg'>
                      <img src={google} alt="" />
                    </div>
                    <div className='text-sm text-[#e7e7e7]'>
                      <div>Software Engineer</div>
                      <div className='text-[#d1d1d1]'>New York</div>
                    </div>
                </div>
                <div className='flex text-[#d1d1d1] text-xs justify-around'>
                  <span>1 day ago </span>
                  <span>120 Applicants</span>
                </div>
            </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default DreamJob
