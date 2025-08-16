import { Button,  Divider, FileInput, LoadingOverlay, Notification, NumberInput, rem, Textarea, TextInput } from "@mantine/core"
import { IconCheck, IconPaperclip } from "@tabler/icons-react"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import {isNotEmpty, useForm} from "@mantine/form"
import axios from "axios"
import { notifications } from "@mantine/notifications";
import {useSelector} from 'react-redux'

function AppliedJob(props) {
    const {id}=useParams();
    const [preview,setpreview]=useState(false)
    const [submit,setSubmit]=useState(false);
    const [sec,setSec]=useState(5)
    const navigate=useNavigate();
    const user=useSelector((state:any)=>state.user)
    // const handleSubmit=()=>{
    //     setSubmit(true);
    //     let x=5;
    //     setInterval(()=>{
    //         x--;
    //         setSec(x)
    //         if(x==0){
    //             navigate("/find-jobs")
    //         }
    //     },1000)
    // }

    const handlePreview=()=>{
        window.scrollTo({top:0,behavior:'smooth'})
        form.validate();
        if(!form.isValid())return;
        setpreview(!preview)
    }
    const handleSubmit=()=>{
        setSubmit(true);
        let applicant={...form.getValues(),applicantId:user.id}
        console.log("applicant",applicant)
        axios.post("http://localhost:8080/job/apply/"+id,applicant)
        .then((res)=>{
            setSubmit(false);
            console.log(res.data)
            notifications.show({
                title:'Success',
                message:"Application Submitted Successfully .",
                withCloseButton:true,
                icon:<IconCheck style={{width:"90%",height:"90%"}}/>,
                color:"teal",
                withBorder:true,
                className:"!border-green-500"
           })
           navigate("/job-history")
        }).catch((err)=>{
            setSubmit(false);
             notifications.show({
                title:'Error',
                message:err.response.data.errorMessage,
                withCloseButton:true,
                icon:<IconCheck style={{width:"90%",height:"90%"}}/> ,
                withBorder:true,
                className:"!border-green-500"
              })
        })
        
    }

    const form=useForm({
        mode:"controlled",
        validateInputOnChange:true,
        initialValues:{
            name:"",
            email:"",
            phone:"",
            website:"",
            
            coverLetter:""
        },
        validate:{
            name:isNotEmpty("Name is Required"),
            email:isNotEmpty("Email is Required"),
            phone:isNotEmpty("phone is Required"),
            website:isNotEmpty("website is Required"),
            coverLetter:isNotEmpty("coverLetter is Required")

        }
    })
  return (
    <>
    <div className="w-2/3 mx-auto pt-12">
    <LoadingOverlay
    className="!fixed"
    visible={submit}
    zIndex={1000}
    overlayProps={{radius:'sm',blur:2}}
    loaderProps={{color:'sun.4',type:'bars'}}
    />
      <div className='flex justify-between'  >
            <div className='flex gap-2 items-center'>
                <div className='p-3 bg-[#454545]  rounded-xl'>
                    <img className='h-14' src={`/public/JobPortalResources/Icons/${props.company}.png`} alt="its me" />
                </div>
                <div className="flex flex-col gap-1">
                    <div className='font-semibold text-2xl'>{props.jobTitle}</div>
                    <div className='text-md  text-[#e1e1e1]'>{props.company} &#x2022; {props.postTime} &#x2022; {props.applicant?props.applicant.length:0}.</div>
                </div>
            </div>
         </div>
         <Divider my="xl"/>
         <div className="text-xl font-semibold mb-5">Submit Your Application</div>
         <div className="flex flex-col gap-5">
            <div className="flex gap-10 [&>*]:w-1/2">
                <TextInput {...form.getInputProps("name")} label="Full Name" className={`${preview?"text-[#e1e1e1]  font-semibold":""}`} readOnly={preview} variant={preview?"unstyled":"default"} withAsterisk placeholder="Enter name"/>
                 <TextInput {...form.getInputProps("email")} label="Email" className={`${preview?"text-[#e1e1e1]  font-semibold":""}`} readOnly={preview} variant={preview?"unstyled":"default"} withAsterisk placeholder="Enter email"/>
            </div>
             <div className="flex gap-10 [&>*]:w-1/2">
                <NumberInput {...form.getInputProps("phone")} label="Phone Number" className={`${preview?"text-[#e1e1e1]  font-semibold":""}`} readOnly={preview} variant={preview?"unstyled":"default"} withAsterisk clampBehavior="strict" placeholder="Enter Phone Number" hideControls />
                 <TextInput {...form.getInputProps("website")} label="Personal Website" className={`${preview?"text-[#e1e1e1]  font-semibold":""}`} readOnly={preview} variant={preview?"unstyled":"default"} withAsterisk placeholder="Enter Url"/>
            </div>
            <Textarea
            {...form.getInputProps("coverLetter")}
            withAsterisk
            placeholder="Write Something About Yourself...."
            label="Cover Letter"
            autosize
            minRows={4}
            className={`${preview?"text-[#e1e1e1]  font-semibold":""}`}
            readOnly={preview} variant={preview?"unstyled":"default"}
            />
            {!preview && <Button color="sun.4" variant="light" onClick={handlePreview}>Preview</Button>}
            {
                preview && <div className="flex gap-5 [&>*]:w-1/2">
                    <Button color="sun.4" fullWidth variant="outline" onClick={()=>{setpreview(!preview); window.scrollTo({top:0,behavior:'smooth'})}}>Edit</Button>
                    <Button color="sun.4" fullWidth variant="light" onClick={handleSubmit}>Submit</Button>
                </div>
            }
         </div>
    </div>
    <Notification icon={<IconCheck style={{width:rem(20),height:rem(20)}}/>} color="teal" withBorder className={`z-[1091] !border-[#ffd149] !fixed top-0 left-[37%] -translate-y-20 transition duration-300 ease-in-out ${submit?"translate-y-0":"-translate-y-20"}`} title="Application Submitted!" mt="md" withCloseButton={false}>Redirecting to Find Jobs in {sec} secound...</Notification>
    </>
  )
}

export default AppliedJob
