import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormSection from "../FormSection";
import PreviewSection from "../PreviewSection";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import dummy from "@/data/dummy";
import GlobalApi from "./../../../service/GlobalApi";

const EditResume = () => {
  const {resumeId} = useParams();
  const [resumeInfo, setResumeInfo] = useState()

  useEffect(() => {
    GetResumeInfo()
  }, []);

  const GetResumeInfo=()=>{
    GlobalApi.GetResumeById(resumeId).then(response=>{
      setResumeInfo(response.data.data)
    })
  }

  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
      <div className="grid  grid-cols-1 lg:grid-cols-2 px-5 min-h-screen pb-8 gap-10">
        <FormSection />
        <PreviewSection />
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default EditResume;
