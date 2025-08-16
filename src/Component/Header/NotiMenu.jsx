import { Indicator, Menu, Notification, rem } from "@mantine/core"
import { IconBell, IconCheck, IconUserCircle } from "@tabler/icons-react"
import axios from "axios";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NotiMenu=()=>{
     const [opened,setOpened]=useState(false);
     const user=useSelector((state)=>state.user)
    const [notification,setNotification]=useState([])
   
     useEffect(()=>{
        axios.get("http://localhost:8080/notification/get/"+user.id)
        .then((res)=>setNotification(res.data))
        .catch((err)=>{throw err})
     },[user])

     const unread=(index)=>{
        let notis=[...notification];
        notis=notis.filter((noti,i)=>i!=index)
        setNotification(notis)
        axios.put("http://localhost:8080/read/"+notification[index].id)
        .then((res)=>console.log(res.data))
        .catch((err)=>console.log(err))
     }
    return (
       <Menu shadow="md" width={400} opened={opened} onChange={setOpened}>
             
            <Menu.Target>
               <Indicator disabled={notification.length<=0} color="sun.4" size={10} processing offset={6}>
                               <div className="bg-[#0d7a2e] p-1.5 rounded-full"><IconBell/></div>
               </Indicator>
            </Menu.Target>
            <Menu.Dropdown onChange={()=>setOpened(true)}>
               <div className="flex flex-col gap-1">
                {
                    notification.map((noti,index)=>
                    <Notification key={index} onClose={()=>unread(index)} onClick={()=>{unread(index);setOpened(false)}} className="w-full h-full hover:bg-[#3d3d3d] cursor-pointer " icon={<IconCheck  style={{width: rem(20),height:rem(20)}}/>} color="teal" title={noti.action} mt="md">
                       { noti.message}
                    </Notification>
                    )
                }
                {
                    notification.length==0&&<div className="text-center text-[#e1e1e1]">No Notification</div>
                }
                </div>
            <Menu.Divider />
       
               
               
              
             </Menu.Dropdown>
             
           </Menu>
    )
}

export default NotiMenu