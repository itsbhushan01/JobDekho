import { IconAnchor, IconBrandFacebook, IconBrandInstagram, IconBrandX } from "@tabler/icons-react"
import { footerlink } from "../../Data/Data"
import { useLocation } from "react-router-dom"

function Footer() {
  const location=useLocation();
  return location.pathname!="/signup"&&location.pathname!="/login"&&location.pathname!="/"?<div className="py-20 pb-5 flex gap-5 justify-around bg-[#0c0c0c]">
      <div className="w-1/4 flex flex-col gap-4">
        <div className="flex gap-1 items-center text-[#03C988]">
            <IconAnchor className="h-6 w-6" stroke={2.5}/>
            <div className="text-xl font-semibold">JobHook</div>
        </div>
        <div className="text-sm text-[#b1b1b1]">Job portal with user profiles, skill update, certification, work experience and admin job posting.</div>
        <div className="flex gap-3 text-[#03C988]">
            <div className="text-[#03C988] rounded-full bg-[#1c1c1c] hover:bg-[#0c0c0c] p-2 hover:cursor-pointer"><IconBrandFacebook/></div>
            <div className="text-[#03C988] rounded-full bg-[#1c1c1c] hover:bg-[#0c0c0c] p-2 hover:cursor-pointer"><IconBrandInstagram/></div>
            <div className="text-[#03C988] rounded-full bg-[#1c1c1c] hover:bg-[#0c0c0c] p-2 hover:cursor-pointer"><IconBrandX/></div>
        </div>
      </div>
      {
        footerlink.map((value,index)=>
          <div key={index}>
            <div className="text-lg font-semibold mb-4 text-[#03C988]">{value.title}</div>
            {
              value.link.map((link,index)=>
              <div key={index} className="text-[#b1b1b1] mb-1 hover:translate-x-2 transition duration-300 text-sm hover:text-[#03C988] cursor-pointer">
                {link}
              </div>
              )
            }
          </div>  
        )
      }
      </div>:<></>
  
}

export default Footer
