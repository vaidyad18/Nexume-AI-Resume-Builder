import React, { useEffect, useState } from "react";
import AddResume from "./AddResume";
import { useUser } from "@clerk/clerk-react";
import GlobalApi from "./../../service/GlobalApi";
import ResumeCard from "./ResumeCard";

const Dashboard = () => {

  const {user} =useUser();
  const [resumeList, setResumeList] = useState([])

  useEffect(() => {
    user && GetResumeList()
  }, [user])
  

  const GetResumeList=()=>{
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress).then(response=>{
      setResumeList(response.data.data)
    })
  }
  return (
    <div className="lg:px-36 px-5 min-h-screen xs:px-8 sm:px-20 -mt-4 xs:-mt-0 py-8">
      <p className="sm:text-3xl text-xl xs:text-2xl font-bold text-white">My Resume</p>
      <p className="sm:text-md text-xs xs:text-sm text-white">Start creating your AI resume for your next Job role</p>
      <div className="flex flex-wrap gap-3 xs:gap-4 sm:gap-8 lg:gap-12 mt-8">
        <AddResume />
        {resumeList.length>0 && resumeList.map((resume,index)=>(
          <ResumeCard resume={resume} key={index} refreshData={GetResumeList}/>
        ))
        }
      </div>
    </div>
  );
};

export default Dashboard;
