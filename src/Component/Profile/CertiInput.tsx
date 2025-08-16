import { SelectInput } from '../PostJob/SelectInput'
import fields from '../../assets/JobPortalResources/Data/Profile'
import {  Button, TextInput } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { MonthPickerInput } from '@mantine/dates';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeProfile } from '../Slices/ProfileSlice';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import axios from 'axios';

function CertiInput(props:any) {
    const select=fields;
    const profile=useSelector((state:any)=>state.profile)
    const [issueDate,setIssueDate]=useState(new Date())
    const dispatch=useDispatch();
    const form=useForm({
              mode:'controlled',
              validateInputOnChange:true,
              initialValues:{name:'',issuer:'',certificateId:''},
              validate:{
                name:isNotEmpty("Name is Required"),
                issuer:isNotEmpty("Issuer is Reqired"),
                
                certificateId:isNotEmpty("CertificateId is Reqired")
              },
            })
    const handleSave=()=>{
     
      let certi=[...profile.certification];
      certi.push(form.getValues());
      
      let updatedProfile={...profile,certification:certi}
      console.log(form.getValues());

      props.setEdit(false);
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
                  title:'Failed',
                  message:"Error",
                  withCloseButton:true,
                  icon:<IconCheck style={{width:"90%",height:"90%"}}/>,
                  color:"teal",
                  withBorder:true,
                  className:"!border-green-500"
                })
            )
    }
     return (
    <div className='flex gap-2 flex-col'>
        <div className='text-lg font-semibold'>Add Certificate</div>
       <div className="flex gap-5 [&>*]:w-1/2">
            <TextInput label="Title" {...form.getInputProps("name")} name="name" withAsterisk placeholder='Enter title'/>
            <SelectInput {...select[1]} form={form} name="issuer"/>
        </div>
                            <div className="flex gap-5 [&>*]:w-1/2">
                               <TextInput {...form.getInputProps("certificateId")} label="Certificate Id" withAsterisk placeholder='Enter Id'/>
                            </div>                      
                                <div className="flex gap-2">
                                <Button color="sun.4" variant="outline" onClick={handleSave}>Save</Button>
                                 <Button color="red" variant="filled" autoContrast onClick={()=>props.setEdit(false)}>Cancel</Button>
                                </div>

                              
    </div>


































































































































































































































































































































































































































































































































































































































  )
}

export default CertiInput
