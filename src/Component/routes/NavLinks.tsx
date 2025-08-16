

import { Link, useLocation } from 'react-router-dom';
function NavLinks() {
    const links=[
        {name:"Home",url:"home"},
        {name:"Find Jobs",url:"find-jobs"},
        {name:"Find Talent",url:"find-talent"},
        {name:"Post Job",url:"post-job/0" },
        {name:"Job History",url:"job-history"}
        
    ]
    const location=useLocation();
  return (
    <div className='flex gap-5 h-full items-center text-[#d1d1d1]'>
      
      {
      links.map((link,index)=>
      <div key={index} className={`${location.pathname==link.url?"border-[#ffbd20] text-[#ffbd20]":"border-amber-300"}border-t-[3px] h-full flex items-center`}>
        <Link key={index} to={`/${link.url}`}>{link.name}</Link>
      </div>
      )
      }
      
    </div>
  )
}

export default NavLinks
