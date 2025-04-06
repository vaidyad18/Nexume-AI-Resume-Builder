import React, { useEffect, useState } from "react";
import Header from "../Header";
import PreviewSection from "../PreviewSection";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../service/GlobalApi";

const ViewResume = () => {
  const [resumeInfo, setResumeInfo] = useState();
  const { resumeId } = useParams();

  useEffect(() => {
    GetResumeInfo();
  }, []);

  const GetResumeInfo = () => {
    GlobalApi.GetResumeById(resumeId).then((response) => {
      setResumeInfo(response.data.data);
    });
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="bg-[url('https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjg4Mi1zYXNpLTEzLmpwZw.jpg')] bg-cover">
        <div id="noprint">
          <Header />
          <div>
            <p className="text-center text-white pt-6 font-semibold text-xl">
              Congratulations 🥳 Your AI generated Resume is ready ✅
            </p>
            <p className="text-center text-md text-gray-300">
              Now you are ready to download your resume.
            </p>
            <div className="flex py-6 items-center justify-center gap-10">
              <button
                className="flex bg-blue-500 hover:bg-blue-600 duration-150 cursor-pointer disabled:bg-blue-300 text-white font-semibold gap-2 py-[6px] px-3 rounded-sm justify-center items-center"
                onClick={handleDownload}
              >
                Download
              </button>
            </div>
          </div>
        </div>
        <div id="print" className="xl:mx-[370px] pb-12">
          <PreviewSection />
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default ViewResume;
