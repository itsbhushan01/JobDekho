import {  Button, Indicator } from "@mantine/core"
import { IconAnchor, IconBell, IconSettings } from "@tabler/icons-react"
import NavLinks from "../routes/NavLinks"
import { Link, useLocation } from "react-router-dom"
import ProfileMenu from "./ProfileMenu"
import { useSelector } from "react-redux"
import NotiMenu from "./NotiMenu"
function Header() {
  const user=useSelector((state:any)=>state.user)
  const location=useLocation();
  return location.pathname!="/signup"&&location.pathname!="/login"&&location.pathname!="/"?<div className="px-6 w-full bg-[#0e0e0e] h-20 flex justify-between items-center text-white">
      <div className="flex gap-2 items-center ">
            <IconAnchor className="h-10 w-8" stroke={2}/>
            <div className="text-3xl font-semibold text-[#03C988]">JobDekho</div>
      </div>
      <NavLinks/>
      <div className="flex gap-3 items-center">
            
            
            {user?<ProfileMenu/>:<Link to="/login"><Button variant="subtle" color="sun.4">Login</Button></Link>}
           
            {user?<NotiMenu/>:<></>}
      </div>
    </div>:<></>
  
}

export default Header
