import { Button, NumberInput, TagsInput, Textarea } from "@mantine/core";
import { content, fields } from "../../assets/JobPortalResources/Data/PostJob"
import { SelectInput } from "./SelectInput"
import TextEditor from "./RichTextEditor";
import {isNotEmpty, useForm} from "@mantine/form"
import { postJob } from "../Services/JobService";
import { IconCheck } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import {useNavigate, useParams} from "react-router-dom"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setJob } from "../Slices/JobSlice";
function PostJobs() {
  const {id}=useParams();
  const [editorData,setEditorData]=useState(content);
  const select=fields;
  const dispatch=useDispatch();
  const user=useSelector((state:any)=>state.user)
  const navigate=useNavigate();

  useEffect(()=>{
    window.scrollTo(0,0)
    if(id!=="0"){
      axios.get("http://localhost:8080/job/get/"+id)
      .then((res)=>{
        form.setValues(res.data)
        setEditorData(res.data.description)
      })
      .catch((err)=>{throw err})
    }
    else{
      form.reset();
      setEditorData(content)
    }
  },[id])
  const form=useForm({
    mode:"controlled",
    validateInputOnChange:true,
    initialValues:{
      jobTitle:'',
      company:"",
      experience:'',
      jobType:"",
      location:"",
      packageOffered:"",
      skills:[],
      about:'',
      description:content
    },
    validate: {
        jobTitle:isNotEmpty("JobTitle is Required"),
        company:isNotEmpty("Company is Required"),
        experience:isNotEmpty("experience is Required"),
        jobType:isNotEmpty("jobType is Required"),
        location:isNotEmpty("location is Required"),
        packageOffered:isNotEmpty("packageOffered is Required"),
        skills:isNotEmpty("skills is Required"),
        about:isNotEmpty("about is Required"),
        description:isNotEmpty("description is Required"),
    },
  })

  const handlePost=()=>{
    form.validate();
    if(!form.isValid())return;
    const updatedProfile={...form.getValues(),id,postedBy:user.id,jobStatus:"ACTIVE"}
    axios.post("http://localhost:8080/job/post",updatedProfile).then((res)=>{
      notifications.show({
                  title:'Success',
                  message:"Post Upload Successfully .",
                  withCloseButton:true,
                  icon:<IconCheck style={{width:"90%",height:"90%"}}/>,
                  color:"teal",
                  withBorder:true,
                  className:"!border-green-500"
                })
                navigate(`/postedJob/${res.data.id}`)
    }).catch((err)=>{
      notifications.show({
                  title:'Post Failed',
                  message:err.response.data.errorMessage,
                  withCloseButton:true,
                  icon:<IconCheck style={{width:"90%",height:"90%"}}/>,
                  color:"teal",
                  withBorder:true,
                  className:"!border-green-500"
                })
    })
  }

  const handleDraft=()=>{
    console.log("hello");
    const updatedProfile={...form.getValues(),postedBy:user.id,jobStatus:"DRAFT"}
    axios.post("http://localhost:8080/job/post",updatedProfile).then((res)=>{

      notifications.show({
                  title:'Success',
                  message:"JOB Drafted Successfully .",
                  withCloseButton:true,
                  icon:<IconCheck style={{width:"90%",height:"90%"}}/>,
                  color:"teal",
                  withBorder:true,
                  className:"!border-green-500"
                })
                navigate(`/posted-job/${res.data.id}`)
    }).catch((err)=>{
      notifications.show({
                  title:'Post Failed',
                  message:err.response.data.errorMessage,
                  withCloseButton:true,
                  icon:<IconCheck style={{width:"90%",height:"90%"}}/>,
                  color:"teal",
                  withBorder:true,
                  className:"!border-green-500"
                })
    })
  }
  return (
    <div className="w-4/5 mx-auto">
        <div className="text-2xl font-semibold">Post Job</div>
        <div className="flex flex-col gap-5">
            <div className="flex gap-5 [&>*]:w-1/2">
              <SelectInput form={form} name="jobTitle" {...select[0]}/>
              <SelectInput form={form} name="company" {...select[1]}/>
            </div>
            <div className="flex gap-5 [&>*]:w-1/2">
              <SelectInput form={form} name="experience"{...select[2]}/>
              <SelectInput form={form} name="jobType" {...select[3]}/>
            </div>
            <div className="flex gap-5 [&>*]:w-1/2">
              <SelectInput form={form} name="location" {...select[4]}/>
              <NumberInput {...form.getInputProps("packageOffered")} label="Salary" placeholder="Enter Salary" hideControls withAsterisk min={1} max={200} clampBehavior="strict"/>
            </div> 
            <TagsInput {...form.getInputProps("skills")} withAsterisk label="Skills" placeholder="Enter skill" clearable acceptValueOnBlur splitChars={[',',' ','|']}/>
            <Textarea {...form.getInputProps("about")} autosize minRows={4} label="About Job" placeholder="Enter About Job" color="mineShaft.10"/>  
                           
            <div className="[&_button[data-active='true']]:!text-[#03C988] [&_button[data-active='true']]:!bg-[#03C988]/20">
              <div className="text-sm font-medium">Job Description</div>
              <TextEditor form={form} data={editorData}/>
            </div>
            <div>
              <Button  color='sun.4' my="mr" variant='light' onClick={handlePost}>Publish Job</Button>
              <Button  color='sun.4' my="mr" variant='outline' onClick={handleDraft}>Save as Draft</Button>           
            </div>
        </div>
    </div>
  )
}

export default PostJobs
