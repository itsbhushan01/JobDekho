import {Carousel} from "@mantine/carousel"
import {jobCategory} from "../../assets/JobPortalResources/Data/Data"
function JobCategory() {
  return (
    <div className="mt-20 pb-5">
      <div className="text-4xl text-center font-semibold mb-5 text-[#e7e7e7]">Browse <span className="text-[#03C988]">Job</span> Category</div>
      <div className="text-lg mx-auto text-[#b0b0b0] text-center w-1/2 mb-10">Explore diverse job oppurtunities tailored to your skills. Start your carrer journey today</div>
      <Carousel slideSize="22%"  slideGap="md" >
        {
        
        jobCategory.map((category,index)=><Carousel.Slide>
          <div className="flex flex-col items-center w-64 gap-2  border border-[#03C988] p-5 rounded-xl hover:cursor-pointer hover:shadow-[0_0_5px_2px_black] my-5 !shadow-[#03C988] transition duration-200 ease-in-out" key={index}>
          <div className="p-2 bg-[#03C988] rounded-full">
              <img src={`/public/JobPortalResources/Category/${category.name}.png`} className="h-8 w-8" alt="" />
          </div>
          <div className="text-[#d1d1d1] text-xl font-semibold">{category.name}</div>
          <div className="text-[#b0b0b0] text-sm text-center">{category.desc}</div>
          <div className="text-[#03C988]">{category.jobs} new job posted</div>
        </div>
        </Carousel.Slide>
        )
        
      
      }
      </Carousel>
      
    </div>
  )
}

export default JobCategory
