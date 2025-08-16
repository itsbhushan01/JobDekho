import { companyData } from "../../assets/JobPortalResources/Data/Company"

function AboutCompany() {
    const company:{[key:string]:any}=companyData;
  return (
    <div className="flex flex-col gap-5 mt-5">
      {
        Object.keys(company).map((key,index)=>key!="Name" && <div key={index}>
        <div className="text-xl mb-3 px-2 font-semibold">{key}</div>
        {key!="Website" &&<div className="text-md px-2 text-[#e1e1e1] text-justify">{key!="Specialties"? company[key]:company[key].map((item:string,index:number)=><span key={index}> &bull; {item}</span>)}</div>}
        {key=="Website" &&<a href={company[key]} target="_blank" className="px-2 text-md text-[#03C988] text-justify">{company[key]}</a>}
      </div>
            )
        }
    </div>
  )
}

export default AboutCompany
