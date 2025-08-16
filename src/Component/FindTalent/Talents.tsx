import React, { useEffect, useState } from "react";
import Sort from "../FindJobs/Sort";
import TalentCard from "./TalentCard";
import { talents } from "../../assets/JobPortalResources/Data/TalentData";
import axios from "axios";
import {  LoadingOverlay } from "@mantine/core"
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../Slices/FilterSlice";

function Talents() {
  const dispatch = useDispatch();
  const [talents, setTalent] = useState<any>([]);
    const [loader,setLoader]=useState(false)
  const filter = useSelector((state: any) => state.filter);
  const [fiterTalents, setFilterTalents] = useState<any>([]);
  useEffect(() => {
    setLoader(true)  
    dispatch(resetFilter());
    axios
      .get("http://localhost:8080/profiles/getall")
      .then((res) =>{
         setTalent(res.data)
          setTimeout(()=>{
                   setLoader(false)                     
                 },4000)
    })
      .catch((err) => {
        throw err;
        setLoader(false)
      });
  }, []);

  useEffect(() => {
    let filtered = talents;
    setFilterTalents(talents);
    console.log(filter);
    if (filter.name) {
      filtered = filtered.filter((talent: any) =>
        talent.name.toLowerCase().includes(filter.name?.toLowerCase())
      );
      setFilterTalents(filtered);
    }
    if (filter["Job Title"] && filter["Job Title"].length > 0) {
      filtered = filtered.filter((talent: any) =>
        filter["Job Title"].some((title: any) =>
          talent.jobTitle?.toLowerCase().includes(title?.toLowerCase())
        )
      );
      setFilterTalents(filtered);
    }
    if (filter.Location && filter.Location.length > 0) {
      filtered = filtered.filter((talent: any) =>
        filter.Location?.some((title: any) =>
          talent.location?.toLowerCase().includes(title?.toLowerCase())
        )
      );
      setFilterTalents(filtered);
    }
    if (filter.Skills && filter.Skills.length > 0) {
      filtered = filtered.filter((talent: any) =>
        filter.Skills?.some((title: any) =>
          talent.jobTitle
            ?.some((talentSkill) => talentSkill?.toLowerCase())
            .includes(title.toLowerCase())
        )
      );
      setFilterTalents(filtered);
    }
    if (filter.exp && filter.exp.length > 0) {
      filtered = filtered.filter(
        (talent: any) =>
          filter.exp[0] <= talent.totalExperience &&
          talent.totalExperience <= filter.exp[1]
      );
      setFilterTalents(filtered);
    }
  }, [filter, talents]);

  return (
    <>
     <LoadingOverlay 
            visible={loader}
            zIndex={1000}
            overlayProps={{radius:'sm',blur:2}}
            loaderProps={{color:'sun.4',type:"bars"}}
            />
    <div className="p-5">
      <div className="flex justify-between ">
        <div className="text-2xl font-bold">Talents</div>
        <Sort />
      </div>
      <div className="m-10 flex flex-wrap justify-around gap-10">
        {fiterTalents.length ? (
          fiterTalents.map((talent, index) => (
            <TalentCard key={index} {...talent} />
          ))
        ) : (
          <div className="text-2xl">No Telent Found</div>
        )}
      </div>
    </div>
    </>
  );
}

export default Talents;
