import { Avatar, Divider, Tabs } from "@mantine/core"
import {  IconMapPin } from "@tabler/icons-react"
import AboutCompany from "./AboutCompany"
import Job from "./Job"
import CompanyEmloyee from "./CompanyEmloyee"

function Company(props:any) {
  console.log(props)
  return (
    <div className="w-3/4 pt-5">
      <div className="relative">
              <img src="/public/JobPortalResources/Profile/banner.jpg" alt="" className="rounded-t-2xl"/>
              <img src={`/public/JobPortalResources/Icons/${props.company}.png`} alt="" className="bg-[#2d2d2d] rounded-3xl h-36 w-36 -bottom-1/4 absolute left-5 p-2"/>
              
            </div>
            <div className="px-3 mt-12">
                  <div className="text-3xl font-semibold flex justify-between">{props.company} 
                      
                                  <Avatar.Group>
                                    <Avatar src="/public/JobPortalResources/avatar.png"/>
                                    <Avatar src="/public/JobPortalResources/avatar1.png"/>
                                    <Avatar src="/public/JobPortalResources/avatar2.png"/>
                                    <Avatar>+5</Avatar>
                                  </Avatar.Group>
                      
                  </div>
                   <div className='flex gap-1  items-center text-[#b1b1b1] text-lg'>
                      <IconMapPin stroke={1.5} className='h-4 w-4'/> {props.location}
                  </div>
              </div>
              <Divider size="xs" my="xl" mx={"xs"} color='grey'/>
              <div>
                <Tabs variant="outline" radius="lg" defaultValue="about">
                    <Tabs.List className="[&_button]:!text-lg font-semibold [&_button[data-active='true']]:text-[#03C988]">
                        <Tabs.Tab value="about">About</Tabs.Tab>
                        <Tabs.Tab value="jobs">Jobs</Tabs.Tab>
                        <Tabs.Tab value="employee">Employee</Tabs.Tab>
                    </Tabs.List>
                   
                        <Tabs.Panel value="about"><AboutCompany /></Tabs.Panel>
                        <Tabs.Panel value="jobs"><Job/></Tabs.Panel>
                        <Tabs.Panel value="employee"><CompanyEmloyee/></Tabs.Panel>
                </Tabs>
              </div>
    </div>
  )
}

export default Company
