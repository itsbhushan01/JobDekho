import { Divider } from "@mantine/core"
import SearchBar from "../FindTalent/SearchBar"
import Talents from "../FindTalent/Talents"

function FindTalent() {
  return (
    <div className="min-h-[90vh] bg-[#000000]">
       <Divider size="xs" color='grey'/>
       <SearchBar/>
       <Divider size="xs" color='grey'/>
       <Talents/>
    </div>
  )
}

export default FindTalent
