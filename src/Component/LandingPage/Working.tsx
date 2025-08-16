import { Avatar } from "@mantine/core"
import { work } from "../../Data/Data"


function Working() {
  return (
    <div className="mt-20 pb-2">
      <div className="text-4xl text-center font-semibold mb-5 text-[#e7e7e7]">How it <span className="text-[#03C988]">Work</span></div>
      <div className="text-lg mx-auto text-[#b0b0b0] text-center">Explore diverse job oppurtunities tailored to your skills. Start your carrer journey today</div>
        <div className="flex py-10 justify-center items-center">
            
            <div className="flex flex-col gap-10 justify-center align-middle">
                {
                    work.map((value,index)=>
                    <div className="flex items-center gap-4" key={index}>
                        <div className="p-2.5 bg-[#03C988] rounded-full">
                            <img className="h-12 w-12" src={`/public/JobPortalResources/Working/${value.name}.png`} alt="build resume" />
                        </div>
                        <div>
                            <div className="text-[#d1d1d1] text-xl font-semibold">{value.name}</div>
                            <div className="text-[#b0b0b0]">{value.desc}.</div>
                        </div>
                    </div>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default Working
