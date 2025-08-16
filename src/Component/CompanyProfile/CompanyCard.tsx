import { ActionIcon } from "@mantine/core"
import { IconExternalLink } from "@tabler/icons-react"

function CompanyCard(props:any) {
  return (
    <div>
      <div className='flex justify-between bg-[#3d3d3d] items-center rounded-lg p-2'  >
              <div className='flex gap-2 items-center'>
                  <div className='p-2 bg-[#454545]  rounded-md'>
                      <img className='h-7' src={`/public/JobPortalResources/Icons/${props.name}.png`} alt="its me" />
                  </div>
                  <div>
                      <div className='font-semibold'>{props.name}</div>
                      <div className='text-sm  text-[#e1e1e1]'>{props.employees} Employee.</div>
                  </div>
              </div>
              <ActionIcon color="sun.4" variant="subtle" >
                <IconExternalLink/>
              </ActionIcon>
              <div>
      
              </div>
            </div>
    </div>
  )
}

export default CompanyCard
