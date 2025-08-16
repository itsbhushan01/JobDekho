import { talents } from "../../assets/JobPortalResources/Data/TalentData"
import TalentCard from "../FindTalent/TalentCard"

function CompanyEmloyee() {
  return (
    <div className="flex mt-10 flex-wrap gap-10">
      {
            talents.map((talent,index)=>index<6&&<TalentCard key={index} {...talent}/>)
      }
    </div>
  )
}

export default CompanyEmloyee
