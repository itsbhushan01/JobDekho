import { Link, useParams } from "react-router-dom"
import { timeAgo } from "../Services/Utilities";

function PostedJobCard(props:any) {
  const {id}=useParams();
 
  return (
    <Link to={`/posted-job/${props.id}`} className={`bg-[#3d3d3d] rounded-xl p-2 border-l-2 border-l-[#ffd149] ${props.id==id?"bg-[#ffd949] text-black":"bg-[#3d3d3d] text-[#d1d1d1]"}`}>
      <div className="text-sm  font-semibold">{props.jobTitle}</div>
      <div className="text-xs  font-medium">{props.location}</div>
      <div className="text-xs ">{timeAgo(props.postTime)}</div>
    </Link>
  )
}

export default PostedJobCard
