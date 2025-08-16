import { Divider } from "@mantine/core"
import Profile from "../Profile/Profile"
import { profile } from "../../assets/JobPortalResources/Data/TalentData"

function ProfilePage() {
  return (
    <div className="min-h-[90vh] bg-[#000] ">
      <Divider mx={"md"} mb={"xl"}/>

      
      <Profile {...profile}/>
    </div>
  )
}

export default ProfilePage
