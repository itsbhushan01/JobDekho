import Marquee from "react-fast-marquee"
import { companies } from "../../Data/Data"

function Company() {
  return (
    <div className="mt-20 pb-5">
      <div className="text-4xl text-center font-semibold text-[#e7e7e7] mb-10">Trusted By <span className="text-[#03C988]">1000+</span> Companies</div>
           <Marquee pauseOnHover={true}>
                {
                companies.map((company,index)=>
                <div key={index} className="mx-8 px-2 py-1 hover:bg-[#3d3d3d] rounded-xl cursor-pointer">
                    <img src={`/public/JobPortalResources/Companies/${company}.png`} alt={company} className="h-14" />
                </div>
                )
                }
            </Marquee>
    </div>
  )
}

export default Company
