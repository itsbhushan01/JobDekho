import axios from "axios"
const base_url="http://localhost:8080/job";
const getJob=async(id)=>{
    return await axios.get(`${base_url}/get/`+id).then((res)=>res.data).catch((err)=>{throw err})
}

const postJob=async(Job)=>{
    return await axios.get(`${base_url}/post`,Job).then((res)=>res.data).catch((err)=>{throw err})
}

const getAllJob=async()=>{
    return await axios.get(`${base_url}/getall`).then((res)=>res.data).catch((err)=>{throw err})
}

export{getAllJob,getJob,postJob}