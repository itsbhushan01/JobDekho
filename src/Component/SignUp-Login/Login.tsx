import {  Button,  LoadingOverlay,  PasswordInput, rem, TextInput } from "@mantine/core"
import {  IconCheck, IconLock } from "@tabler/icons-react"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import { loginValidation } from "../Services/FormValidation";
import { notifications } from "@mantine/notifications";
import { loginUser } from "../Services/UserService";
import { useDisclosure } from "@mantine/hooks";
import ResetPassword from "./ResetPassword";
import { useDispatch } from "react-redux";
import { setUser } from "../Slices/UserSlice";
const form={
   
    email:"",
    password:""
  }
function Login() {
    const dispatch=useDispatch();
    const [loader,setLoader]=useState(false)
   const [data,setData]=useState(form);
     const navigate=useNavigate();
    const [formError,setformError]=useState(form)
    const [opened,{open,close}]=useDisclosure(false);
   const handleChange=(e:any)=>{
    const {name,value}=e.target;
     if(typeof(event)=="string")setData({...data,accountType:event});
     setData({...data,[name]:value})
    }
   const handleSubmit=()=>{
    
     let valid=true,newFormError:{[key:string]:string}={};
        for(let key in data){
          newFormError[key]=loginValidation(key,data[key]);
          if(newFormError[key])valid=false;
        }
        setformError(newFormError);
        if(valid===true){
        setLoader(true);
          loginUser(data).then((res)=>{
         
                     console.log(res)
                     setData(form);
                     notifications.show({
                         title:'Registered Successfully',
                         message:"Redirecting to login page...",
                         withCloseButton:true,
                         icon:<IconCheck style={{width:"90%",height:"90%"}}/>,
                         color:"teal",
                         withBorder:true,
                         className:"!border-green-500"
                       })

                       setTimeout(()=>{
                        setLoader(false)
                        dispatch(setUser(res))
                         navigate("/home")
                       },4000)
               }).catch((err)=>{
                  setLoader(false)
                   notifications.show({
                   title:"Registration Failed",
                   message:err.response.data.errorMessage,
                   withCloseButton:true,
                   icon:<IconCheck style={{width:"90%",height:"90%"}}/>,
                   color:"red",
                   withBorder:true,
                   className:"!border-green-500"
                 })
               
               })
     
   }
  }
  return (
  <>
    <LoadingOverlay 
    visible={loader}
    zIndex={1000}
    overlayProps={{radius:'sm',blur:2}}
    loaderProps={{color:'sun.4',type:"bars"}}
    />
    <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
      <div className="text-2xl font-semibold">Login Account</div>
      <TextInput withAsterisk label="Name" name="email" error={formError.email} value={data.email}  placeholder="Name" onChange={handleChange}/>
      <PasswordInput withAsterisk name="password" error={formError.password} value={data.password} onChange={handleChange} leftSection={<IconLock style={{width:rem(18),height:rem(18)}} stroke={1.5}/>} label="Password" placeholder="Password"/>
      <Button variant="filled" autoContrast onClick={handleSubmit} loading={loader}>Login</Button>
      <div className="mx-auto">Don't have a account? <span onClick={()=>{navigate("/signup");setData(form);setformError(form)}} className="text-[#03C988] hover:underline">signUp</span></div>
    <div onClick={open} className="text-[#03C988] hover:underline cursor-pointer text-center">Forget Password?</div>
   </div>
   <ResetPassword opened={opened} close={close}/>
  </>
  )

  }
export default Login
