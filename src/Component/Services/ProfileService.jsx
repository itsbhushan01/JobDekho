import axios from "axios"
const base_url="http://localhost:8080/profiles/"

const getProfile=async(id)=>{
    return await axios.post(`${base_url}get/${id}`).then(res=>console.log(res.data)).catch(error=>{throw error;});
}


const UpdateProfile=(profile)=>{
    console.log(profile)
     return  axios.put("http://localhost:8080/profiles/update",profile).then(res=>res.data).catch(error=>{throw error;});
}

export {getProfile,UpdateProfile}
