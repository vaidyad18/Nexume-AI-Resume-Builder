import { Loader2 } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "./../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const EducationForm = () => {
  const [educationList, setEducationList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();

  useEffect(() => {
    resumeInfo && setEducationList(resumeInfo?.education);
  }, []);

  const handleChange = (index, e) => {
    const newEntries = educationList.slice();
    const { name, value } = e.target;
    newEntries[index][name] = value;
    setEducationList(newEntries);
  };

  const addNewEducation = () => {
    setEducationList([
      ...educationList,
      {
        universityName: "",
        state: "",
        startDate: "",
        endDate: "",
        major: "",
        degree: "",
      },
    ]);
  };

  const removeNewEducation = () => {
    setEducationList((educationList) => educationList.slice(0, -1));
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      education: educationList,
    });
  }, [educationList]);

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        education: educationList.map(({ id, ...rest }) => rest),
      },
    };

    GlobalApi.UpdateResumeDetail(data, params?.resumeId)
      .then((response) => {
        setLoading(false);
        toast("Details updated. ✅");
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  return (
    <div
      className="py-5 px-10 bg-white shadow-xl rounded-xl border-t-[15px] mt-4 -mb-4"
      style={{ borderColor: "#2b7fff" }}
    >
      <p className="font-bold text-xl sm:text-2xl">Education</p>
      <p className="text-gray-600 text-xs sm:text-sm mt-1">
        Add your Educational details.
      </p>
      {educationList.map((item, i) => (
        <div key={i} className="">
          <div className="grid outline-1 rounded-xl p-3 sm:p-5 grid-cols-2 gap-x-10 gap-y-4 mt-5 mb-3">
            <div className="flex-col">
              <label className="font-semibold text-xs sm:text-sm">University Name</label>
              <input
                required
                onChange={(event) => handleChange(i, event)}
                name="universityName"
                defaultValue={item?.universityName}
                className="w-full bg-gray-100 outline text-sm sm:text-[16px] rounded-sm py-2 px-3 mt-1"
                type="text"
                id=""
              />
            </div>
            <div className="flex-col">
              <label className="font-semibold capitalize text-xs sm:text-sm">State</label>
              <input
                required
                onChange={(event) => handleChange(i, event)}
                name="state"
                defaultValue={item?.state}
                className="w-full bg-gray-100 outline text-sm sm:text-[16px] rounded-sm py-2 px-3 mt-1"
                type="text"
                id=""
              />
            </div>
            <div className="flex-col">
              <label className="font-semibold text-xs sm:text-sm">Degree</label>
              <input
                required
                onChange={(event) => handleChange(i, event)}
                name="degree"
                defaultValue={item?.degree}
                className="w-full bg-gray-100 outline text-sm sm:text-[16px] rounded-sm py-2 px-3 mt-1"
                type="text"
                id=""
              />
            </div>

            <div className="flex-col">
              <label className="font-semibold text-xs sm:text-sm">Major</label>
              <input
                onChange={(event) => handleChange(i, event)}
                name="major"
                defaultValue={item?.major}
                className="w-full bg-gray-100 outline text-sm sm:text-[16px] rounded-sm py-2 px-3 mt-1"
                type="text"
                id=""
              />
            </div>
            <div className="flex-col">
              <label className="font-semibold text-xs sm:text-sm">Start Date</label>
              <input
                onChange={(event) => handleChange(i, event)}
                name="startDate"
                defaultValue={item?.startDate}
                className="w-full bg-gray-100 outline text-sm sm:text-[16px] rounded-sm py-2 px-3 mt-1"
                type="month"
                id=""
              />
            </div>
            <div className="flex-col">
              <label className="font-semibold text-xs sm:text-sm">End Date</label>
              <input
                onChange={(event) => handleChange(i, event)}
                name="endDate"
                defaultValue={resumeInfo?.endDate}
                className="w-full bg-gray-100 outline text-sm sm:text-[16px] rounded-sm py-2 px-3 mt-1"
                type="month"
                id=""
              />
            </div>
          </div>
        </div>
      ))}
      <div className="flex items-center mt-4 justify-between">
        <div className="flex gap-2">
          <button
            onClick={addNewEducation}
            className="flex text-xs sm:text-sm hover:bg-gray-100 duration-150 cursor-pointer justify-center items-center border-[2px] text-blue-500 font-semibold border-gray-300 py-[6px] rounded-md px-3 gap-2"
          >
            <i className="fa-solid fa-plus"></i>
            <p>Add More Education</p>
          </button>
          {educationList.length > 0 && (
            <button
              onClick={removeNewEducation}
              className="flex text-xs sm:text-sm hover:bg-gray-100 duration-150 cursor-pointer justify-center items-center border-[2px] text-blue-500 font-semibold border-gray-300 py-[6px] rounded-md px-3 gap-2"
            >
              <i className="fa-solid fa-minus"></i>
              <p>Remove</p>
            </button>
          )}
        </div>
        <button
          onClick={() => onSave()}
          disabled={loading}
          type="submit"
          className=" bg-blue-500 hover:bg-blue-600 cursor-pointer duration-150 text-sm sm:text-[16px] text-white font-semibold py-[6px] px-8 rounded-sm"
        >
          {loading ? <Loader2 className="animate-spin" /> : "Save"}
        </button>
      </div>
    </div>
  );
};

export default EducationForm;
