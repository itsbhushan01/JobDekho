import { useParams } from "react-router-dom"
import { talents } from "../../assets/JobPortalResources/Data/TalentData"
import TalentCard from "../FindTalent/TalentCard"

function RecommendTalent(props:any) {
  const {id}=useParams();
  console.log(props.talent)
  return (
    <div>
      <div className='text-xl font-semibold mb-5'>Recommend Talent</div>
      <div className="flex flex-col flex-wrap gap-5 ">
        {props.talent?.map((talent:any,index:any)=>index<4&& id!=talent.id &&<TalentCard key={index} {...talent}/>)}
      </div>
    </div>
  )
}

export default RecommendTalent
