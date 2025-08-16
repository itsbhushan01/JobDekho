import { Avatar, Rating } from "@mantine/core"
import { testimonial } from "../../Data/Data"

function Testimonials() {
  return (
     <div className="mt-20 pb-5">
      <div className="text-4xl text-center font-semibold mb-10 text-[#e7e7e7]">What <span className="text-[#03C988]">Users </span>Say About us</div>
      <div className="text-lg mx-auto text-[#b0b0b0] text-center">Explore diverse job oppurtunities tailored to your skills. Start your carrer journey today</div>
       <div className="flex justify-evenly">
       {
        testimonial.map((value,index)=>
        <div className="flex flex-col gap-3 w-[23%] border-[#03C988] border p-3 rounded-xl mt-10" key={index}>
            <div className="flex gap-2 items-center">
                <Avatar src="/public/JobPortalResources/avatar.png" alt="it me"/>
                <div >
                    <div className="text-lg text-[#e7e7e7] font-semibold">{value.name}</div>
                    <Rating value={value.rating} fractions={2} readOnly/>
                </div>
            </div>
            <div className="text-xs text-[#b0b0b0]">
            {value.testimonials}
            </div>
       </div>
        )
       }
       </div>
    </div>
  )
}

export default Testimonials
