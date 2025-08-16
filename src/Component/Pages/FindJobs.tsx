import { Divider } from "@mantine/core"
import SearchBar from "../FindJobs/SearchBar"
import Job from "../FindJobs/Job"


function FindJobs() {
  return (
    <div className="min-h-[100vh] bg-[#000000]">
      
        <SearchBar/>
        <Divider size="xs" mx="md"/>
        <Job/>
    </div>
  )
}

export default FindJobs
