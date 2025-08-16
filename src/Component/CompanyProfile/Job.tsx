import { jobList } from "../../assets/JobPortalResources/Data/JobsData"
import JobCard from "../FindJobs/JobCard"

function Job() {
  return (
    <div className="flex mt-10 flex-wrap gap-5">
      {
        jobList.map((job,index)=><JobCard key={index} {...job}/>)
      }
    </div>
  )
}

export default Job
