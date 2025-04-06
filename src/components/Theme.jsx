import React, { useContext, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "./../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const Theme = () => {
  const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A1",
    "#A133FF",
    "#33FFA1",
    "#FF7133",
    "#71FF33",
    "#7133FF",
    "#FF3371",
    "#33FF71",
    "#3371FF",
    "#A1FF33",
    "#33A1FF",
    "#FF5733",
    "#5733FF",
    "#33FF5A",
    "#5A33FF",
    "#FF335A",
    "#335AFF",
  ];

  const{resumeInfo, setResumeInfo}=useContext(ResumeInfoContext)
  const [selectedColour, setSelectedColour] = useState()
  const {resumeId}=useParams()

  const onColorSelect=(color)=>{
    setSelectedColour(color)
    setResumeInfo({
        ...resumeInfo,
        theme:color
    })
    const data={
        data:{
            theme:color
        }
    }

    GlobalApi.UpdateResumeDetail(data,resumeId).then(response=>{

        toast('Theme Colour Updated ✅')
    })
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex hover:bg-gray-700 cursor-pointer duration-150 justify-center items-center border-[2px] font-semibold border-gray-300 py-[6px] rounded-md px-3 gap-2">
          <img
            className="w-6"
            src="https://cdn-icons-png.flaticon.com/512/6930/6930865.png"
            alt=""
          />
          <p className="text-white">Theme </p>
        </button>
      </PopoverTrigger>
      <PopoverContent className="ml-5">
      <p className="font-semibold mb-2 text-center text-gray-600 text-sm">Select theme colour</p>
        <div className="grid grid-cols-5 gap-y-2">
            
          {colors.map((item, i) => (
            <div
            onClick={()=>onColorSelect(item)}
              className={`w-8 h-8 rounded-full ${selectedColour==item && 'border-2 border-black'}`}
              style={{ background: item }}
            ></div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Theme;
