import { formatDate } from "../Services/Utilities"

function Certification(props:any) {
  return (
   
      <div className='flex justify-between'  >
              <div className='flex gap-2 items-center'>
                  <div className='p-2 bg-[#454545]  rounded-md'>
                      <img className='h-7' src={`/public/JobPortalResources/Icons/${props.issuer}.png`} alt="its me" />
                  </div>
                  <div>
                      <div className='font-semibold'>{props.name}</div>
                      <div className='text-sm  text-[#e1e1e1]'>{props.issuer}</div>
                  </div>
              </div>
              <div className="flex flex-col items-end">
              <div className="text-sm text-[#d1d1d1]">{formatDate(props.issueDate)}</div>
              <div className="text-sm text-[#d1d1d1]">ID: {props.certificateId}</div>
              </div>
              
            </div>
          
   
  )
}

export default Certification
