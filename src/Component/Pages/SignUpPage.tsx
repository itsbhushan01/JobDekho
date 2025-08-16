import { IconAnchor } from "@tabler/icons-react"
import SignUp from "../SignUp-Login/SignUp"
import Login from "../SignUp-Login/Login"
import { useLocation } from "react-router-dom"
function SignUpPage() {
    const location=useLocation();
  return (
    <div className="min-h-[90vh] bg-[#000] overflow-hidden">
      <div className={`w-[100vw] h-[100vh] flex [&>*]:flex-shrink-0 transition-all ease-in-out duration-1000 ${location.pathname=='/signup'?'-translate-x-1/2':'translate-x-0'}`}>
        <Login/>
        <div className={`w-1/2 h-full transition-all ease-in-out duration-1000 ${location.pathname=="/signup"?"rounded-r-[200px]":"rounded-l-[200px]"} bg-[#0d0d0d] flex items-center gap-5 justify-center flex-col`}>
            <div className="flex gap-2 items-center ">
                <IconAnchor className="h-16 w-16 text-[#03C988]" stroke={2}/>
                <div className="text-6xl font-semibold text-[#03C988]">JobDekho</div>
            </div>
            <div className="text-2xl text-[#d1d1d1] font-semibold">Find the made for you</div>
        </div>
      <SignUp/>
      </div>
    </div>
  )
}

export default SignUpPage
