import { Button } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Profile from '../Talent-Profile/Profile'
import RecommendTalent from '../Talent-Profile/RecommendTalent'
import { profile } from '../../assets/JobPortalResources/Data/TalentData'
import { useEffect, useState } from 'react'
import axios from 'axios'

function TalentProfile() {
  const navigate=useNavigate();
  const {id}=useParams();
  const [talent,setTalent]=useState<any[]>([]);
  const [profile,setProfile]=useState<any[]>([]);
   useEffect(()=>{
      axios.get("http://localhost:8080/profiles/get/"+id).then((res:any)=>{
              setTalent(res.data)
                  }).catch((err)=>
              console.log(err)
          )
     },[id]) 
     useEffect(()=>{
      axios.get("http://localhost:8080/profiles/getall").then((res:any)=>{
              setProfile(res.data)
                  }).catch((err)=>
              console.log(err)
          )
     },[]) 
  return (
    <div className="min-h-[90vh] bg-[#000] p-4">
          
          <Link to="/find-talent" className='my-4 inline-block'>
            <Button onClick={()=>navigate(-1)} leftSection={<IconArrowLeft size={20}/>} color='yellow' variant='light'>Back</Button>
          </Link>      
         
          <div className='flex gap-5'>
                <Profile {...talent}/>
                <RecommendTalent talent={profile}/>
          </div>
    </div>
  )
}

export default TalentProfile
