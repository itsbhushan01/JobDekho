import JobHistories from "../JobHistory/JobHistories"

function JobHistory() {
  return (
     <div className="min-h-[90vh] bg-[#000] p-4">
                      <div className='flex gap-5 '>
                          <JobHistories/>
                      </div>
                </div>
  )
}

export default JobHistory
