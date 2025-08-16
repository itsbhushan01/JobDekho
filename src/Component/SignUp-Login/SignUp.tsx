import { Anchor, Button, Checkbox, Group, LoadingOverlay, PasswordInput, Radio, rem, TextInput } from "@mantine/core"
import { IconAt, IconCheck, IconLock } from "@tabler/icons-react"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { signUpValidation } from "../Services/FormValidation";
import {notifications} from '@mantine/notifications'
import { registerUser } from "../Services/UserService";
const form={
    name:"",
    email:"",
    password:"",
    confirmPassword:"",
    accountType:"APPLICANT"
  }
function SignUp() {
  const navigate=useNavigate();
  const[value,setValue]=useState('APPLICANT')
  const [data,setData]=useState(form);
  const [formError,setformError]=useState(form)
  const [loader,setloader]=useState(false)
  const handleChange=(e:any)=>{

    const {name,value}=e.target;
    if(typeof(event)=="string")setData({...data,accountType:event});
    setData({...data,[name]:value})
    setformError({...formError,[name]:signUpValidation(name,value)})
    if(name==="password"&&data.confirmPassword!==""){
      if(data.confirmPassword!== value)setformError({...formError,confirmPassword:"Password does not match"});
      else setformError({...formError,confirmPassword:""});
      
    }
    if(name==="confirmPassword"){
      if(data.password!==value)setformError({...formError,[name]:"Password do not match."})
    }
  }

  const handleSubmit=()=>{
    
    let valid=true,newFormError:{[key:string]:string}={};
    for(let key in data){
      if(key==="accountType")continue;
      if(key!=="confirmPassword")newFormError[key]=signUpValidation(key,data[key]);
      else if(data[key]!==data["password"])newFormError[key]="Password does not match";
      if(newFormError[key])valid=false;
    }

    
    setformError(newFormError);
    if(valid===true){
        setloader(true)
        registerUser(data).then((res)=>{

            // console.log(res)
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
                setloader(false)
                navigate("/login")
              },4000)
      }).catch((err)=>{
          setloader(false)
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
        className="translate-x-1/2"
        overlayProps={{radius:'sm',blur:2}}
        loaderProps={{color:'sun.4',type:"bars"}}
        />
    <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
      <div className="text-2xl font-semibold">Create Account</div>
      <TextInput withAsterisk value={data.name} error={formError.name} label="Name" name="name"  placeholder="Name" onChange={handleChange}/>
      <TextInput withAsterisk value={data.email} error={formError.email}  name="email" leftSection={<IconAt style={{width:rem(16),height:rem(16)}}/>} label="Email" placeholder="Your email" onChange={handleChange}/>
      <PasswordInput withAsterisk value={data.password} error={formError.password} name="password" leftSection={<IconLock style={{width:rem(18),height:rem(18)}} stroke={1.5}/>} label="Password" placeholder="Password" onChange={handleChange}/>
      <PasswordInput withAsterisk value={data.confirmPassword} error={formError.confirmPassword} name="confirmPassword" leftSection={<IconLock style={{width:rem(18),height:rem(18)}} stroke={1.5}/>} label="Confirm Password" placeholder="Confirm Password" onChange={handleChange}/>
      <Radio.Group
      value={value}
      onChange={setValue}
      label="You are"
      withAsterisk
      >
        <Group mt="xs">
          <Radio className="px-6 py-4 border border-[#4d4d4d] has-[:checked]:bg-[#ffd149]/5 rounded-lg has-[:checked]:border-[#03C988]" autoContrast value="APPLICANT" label="Applicant"/>
          <Radio className="px-6 py-4 border border-[#4d4d4d] has-[:checked]:bg-[#ffd149]/5 rounded-lg has-[:checked]:border-[#03C988]" autoContrast value="EMPLOYER" label="Employer" />
        </Group>
      </Radio.Group>
      <Checkbox autoContrast label={<>I accept{' '}<Anchor>terms & conditions</Anchor></>}/>
      <Button variant="filled" autoContrast onClick={handleSubmit} loading={loader}>SignUp</Button>
      <div className="mx-auto">Have a account? <span onClick={()=>{navigate("/login");setData(form);setformError(form)}} className="text-[#03C988] hover:underline">Login</span></div>
    </div>
    </>
  )
}

export default SignUp
