import { Divider } from "@mantine/core";
import Company from "../LandingPage/Company";
import DreamJob from "../LandingPage/DreamJob";
import JobCategory from "../LandingPage/JobCategory";
import Subscribe from "../LandingPage/Subscribe";
import Testimonials from "../LandingPage/Testimonials";
import Working from "../LandingPage/Working";
import { useEffect } from "react";
import axios from "axios";
import { setProfile } from "../Slices/ProfileSlice";
import { useDispatch, useSelector } from "react-redux";


function HomePage() {
  
const dispatch=useDispatch();
const user=useSelector((state:any)=>state.user)
  useEffect(() => {
    axios
      .get("http://localhost:8080/profiles/get/" + user.id)
      .then((res: any) => {
        dispatch(setProfile(res.data));
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-[100vh] bg-[#000000]">
      <DreamJob />
      <Company />
      <Divider mt={"xl"} />
      <JobCategory />
      <Working />
      <Testimonials />
      <Divider mt={"xl"} />
      <Subscribe />
      <Divider mt={"xl"} size={"sm"} />
    </div>
  );
}

export default HomePage;
