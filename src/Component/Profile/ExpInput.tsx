import React, { useEffect, useState } from 'react'
import { SelectInput } from '../PostJob/SelectInput'
import fields from '../../assets/JobPortalResources/Data/Profile'
import {  Button, Checkbox, Textarea } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { isNotEmpty, useForm } from '@mantine/form';
import { changeProfile } from '../Slices/ProfileSlice';
import { IconCheck } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import {MonthPickerInput} from "@mantine/dates"
import axios from 'axios';

function ExpInput(props:any) {
    const select=fields;
    const dispatch=useDispatch();
    const profile=useSelector((state:any)=>state.profile)
    const [checked,setChecked]=useState(false);
    const [startDate,setStartDate]=useState<Date|null>(new Date());
    const [endDate,setEndDate]=useState<Date|null>(new Date())
   
    
    const form=useForm({
      mode:'controlled',
      validateInputOnChange:true,
      initialValues:{title:'',company:'',location:'',discription:''},
      validate:{
        title:isNotEmpty("Title is required"),
        company:isNotEmpty("Company is required"),
        location:isNotEmpty("Location is required"),
        discription:isNotEmpty("Discription is required")
      },
    })

    const handleSave=()=>{
      
      // form.validate();
      // if(!form.isValid())return;
      let exp=[...profile.experience];
       if(props.add)
        {       
           exp.push(form.getValues());
          //  exp[exp.length-1].startDate=exp[exp.length-1].startDate.toISOString();
          //  exp[exp.length-1].endDate=exp[exp.length-1].endDate.toISOString();
        }    
         else exp[props.index]=form.getValues();
         {
          exp[props.index]=form.getValues();
           exp[props.index].startDate=exp[props.index].startDate?.toISOString();
           exp[props.index].endDate=exp[props.index].endDate?.toISOString();
         }
      let updatedProfile={...profile,experience:exp};
      console.log(updatedProfile)
      axios.put("http://localhost:8080/profiles/update",updatedProfile)
      .then((res)=>{
        dispatch(changeProfile(updatedProfile))
            notifications.show({
            title:'Success',
            message:`Experience ${props.add?"Added":"Updated"} Successfully.`,
            withCloseButton:true,
            icon:<IconCheck style={{width:"90%",height:"90%"}}/>,
            color:"teal",
            withBorder:true,
            className:"!border-green-500"
          })
        props.setEdit(false);
        }
      ).catch((err)=>
         notifications.show({
            title:'Success',
            message:"erorr",
            withCloseButton:true,
            icon:<IconCheck style={{width:"90%",height:"90%"}}/>,
            color:"red",
            withBorder:true,
            className:"!border-green-500"
          })
      )
      //  props.setEdit(false);
    }
    useEffect(()=>{
      if(!props.add)form.setValues({
        title:props.title,
        company:props.company,
        location:props.location,
        discription:props.discription,
        // startDate:new Date(props.startDate),
        // endDate:new Date(props.endDate),
        })
    },[])
    const [about,setAbout]=useState("As a Software Engineer at Google, I am responsible for designing, developing, and maintaining scalable software solutions that enhance user experience and improve operational efficiency. My role involves collaborating with cross-functional teams to define project requirements, develop technical specifications, and implement robust applications using cutting-edge technologies. I actively participate in code reviews, ensuring adherence to best practices and coding standards, and contribute to the continuous improvement of the development process")
  return (
    <div className='flex gap-2 flex-col'>
        <div className='text-lg font-semibold'>{props.add?"Add":"Edit"} Experience</div>
       <div className="flex gap-5 [&>*]:w-1/2">
                                  <SelectInput form={form} name="title" {...select[0]}/>
                                  <SelectInput form={form} name="company" {...select[1]}/>
                              </div>
                              
                              <SelectInput form={form} name="location" {...select[2]}/>
                              <Textarea {...form.getInputProps('discription')} autosize minRows={4} label="Summary" placeholder="Enter Smmary"/>  
                            {/* <div className="flex gap-5 [&>*]:w-1/2">
                              <MonthPickerInput label="Start Date" {...form.getInputProps("startDate")} maxDate={endDate||undefined} placeholder="Pick Date" />
                              <MonthPickerInput label="End Date" {...form.getInputProps("endDate")} minDate={form.getValues().startDate||undefined} maxDate={new Date()} placeholder="Pick Date"/>
                            </div>                       */}
                              <div className="flex gap-2">
                                <Button color="sun.4" variant="outline" onClick={handleSave}>Save</Button>
                              
                                <Button color="red" variant="filled" autoContrast onClick={()=>props.setEdit(false)}>Cancel</Button>
                              </div>

                              
    </div>
  )
}

export default ExpInput
