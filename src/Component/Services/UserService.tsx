import axios from "axios"
const base_url="http://localhost:8080/users/"
const registerUser=async(user:any)=>{
    return  axios.post(`${base_url}register`,user).then(res=>res.data).catch(error=>{throw error;});
}


const loginUser=async(user:any)=>{
    return  axios.post(`${base_url}login`,user).then(res=>res.data).catch(error=>{throw error;});
}

const sendOtp=async (email:any)=>{
    return axios.post(`${base_url}sendOTP/${email}`).then(res=>res.data).catch(err=>{throw err;})
}

const verifyOtp=async (email:any,otp:any)=>{
    return axios.get(`${base_url}verifyOTP/${email}/${otp}`).then(res=>res.data).catch(err=>{throw err;})
}

const changePassword=async (email:any,password:any)=>{
    console.log(email)
    console.log(password)
    return axios.put(`${base_url}changePass`,{email,password}).then(res=>res.data).catch(err=>{throw err;})
}
export {loginUser,registerUser,sendOtp,verifyOtp,changePassword} 