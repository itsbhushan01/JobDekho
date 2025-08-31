import { Button, Modal,LoadingOverlay, PasswordInput, PinInput, TextInput } from '@mantine/core'
import { IconAt, IconCheck, IconLock } from '@tabler/icons-react';
import React, { useState } from 'react'
import { changePassword, sendOtp, verifyOtp } from '../Services/UserService';
import { signUpValidation } from '../Services/FormValidation';
import { notifications } from '@mantine/notifications';
import axios from 'axios';

function ResetPassword(props) {
  const [email,setEmail]=useState("");
  const [otpSent,setOtpSent]=useState(false);
  const [otpSending,setOtpSending]=useState(false)
  const [verified,setVerified]=useState(false)
  const [passErr,setPassErr]=useState("")
  const [loader,setLoader]=useState(false)
  const [password,setPassword]=useState("");
  const [resendLoader,setResendLoader]=useState(false);
  const handleSubmit=()=>{
      setOtpSending(true)
      sendOtp(email).then((res)=>{
        setResendLoader(true)
      setOtpSent(true)
       setOtpSending(false)
       notifications.show({
          title:'OTP Sent SuccessFully',
          message:"Redirecting to login page...",
          withCloseButton:true,
          icon:<IconCheck style={{width:"90%",height:"90%"}}/>,
          color:"teal",
          withBorder:true,
          className:"!border-green-500"
        }) 
    }).catch((err)=>{
      notifications.show({
          title:'OTP Sent Fialed',
          message:err.response.data.errorMessage,
          withCloseButton:true,
          icon:<IconCheck style={{width:"90%",height:"90%"}}/>,
          color:"red",
          withBorder:true,
          className:"!border-green-500"
        }) ;
      console.log(err)
  })
  }

  const handleverifyOtp=(otp:any)=>{
    console.log(otp);
    verifyOtp(email,otp).then((res)=>{
      console.log(res)
      notifications.show({
          title:'OTP Verified.',
          message:"Enter New Password",
          withCloseButton:true,
          icon:<IconCheck style={{width:"90%",height:"90%"}}/>,
          color:"teal",
          withBorder:true,
          className:"!border-green-500"
        }) ;
    }).catch((err)=>
      {
        console.log(err)
        notifications.show({
          title:'OTP Verification Fialed',
          message:"Error",
          withCloseButton:true,
          icon:<IconCheck style={{width:"90%",height:"90%"}}/>,
          color:"red",
          withBorder:true,
          className:"!border-green-500"
        }) ;
      })
    
    setVerified(true);
  }

  const resendOtp=()=>{
    handleSubmit();
  }

  const handleResetPassword=()=>{
	setLoader(true)
    axios.post("http://localhost:8080/users/changePass",{email,password}).then((res)=>{
      console.log(res);
	  setLoader(false)
      notifications.show({
          title:'Password Changed.',
          message:"Login with new Password",
          withCloseButton:true,
          icon:<IconCheck style={{width:"90%",height:"90%"}}/>,
          color:"teal",
          withBorder:true,
          className:"!border-green-500"
        });
    }).catch((err)=>{
		setLoader(false)
      notifications.show({
          title:'Password Change Failed',
          message:"Error",
          withCloseButton:true,
          icon:<IconCheck style={{width:"90%",height:"90%"}}/>,
          color:"red",
          withBorder:true,
          className:"!border-green-500"
        }) ;
    })
  }

  const changeEmail=()=>{
      setOtpSent(false);
  }
  return (
  <>
	<LoadingOverlay 
    visible={loader}
    zIndex={1000}
    overlayProps={{radius:'sm',blur:2}}
    loaderProps={{color:'sun.4',type:"bars"}}
    />
    <Modal opened={props.opened} onClose={props.close} title="Reset Password">
      <div className='flex flex-col gap-6'>
        <TextInput 
        size='md'
        withAsterisk 
        value={email} 
        label="Email" 
        name="email" 
        leftSection={<IconAt size={16}/>}  
        rightSection={<Button onClick={handleSubmit} loading={otpSending && !otpSent} autoContrast size='xs' className='mr-1' disabled={email===""||otpSent} variant='filled' value={"Reset"}>Reset</Button>}
        rightSectionWidth="xl"
        placeholder="Your Email" 
        onChange={(e)=>setEmail(e.target.value)}/>
        {otpSent&& <PinInput length={6} className='mx-auto' onComplete={handleverifyOtp} type="number" size='md' gap="md"/>}      
        { otpSent&&
        <div className='flex gap-2'>
           <Button fullWidth onClick={resendOtp} loading={otpSending} autoContrast   variant='light'>Resend</Button>
          <Button fullWidth onClick={changeEmail} loading={otpSending} autoContrast   variant='filled' value={"Reset"}>Change Email</Button>
        
        </div>
        }
        {
          verified&& <PasswordInput 
          withAsterisk 
          value={password}
           error={passErr} 
           name="password"
            leftSection={<IconLock size={16}/>} 
            label="Password" 
            placeholder="Password"
             onChange={(e)=>{setPassword(e.target.value);setPassErr(signUpValidation("password",e.target.value))}}/>
          
        }
        {
          verified&&<Button fullWidth onClick={handleResetPassword} loading={otpSending} autoContrast   variant='light'>Reset Password</Button>
        }
      </div>
    </Modal>
	</>
  )
}

export default ResetPassword
