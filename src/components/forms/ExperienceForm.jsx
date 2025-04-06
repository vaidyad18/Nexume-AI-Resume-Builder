import { Loader2 } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import RichTextEditor from "./RichTextEditor";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "./../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const ExperienceForm = () => {
  const [experienceList, setExperienceList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();

  useEffect(() => {
    resumeInfo?.experience.length > 0 &&
      setExperienceList(resumeInfo?.experience);
  }, []);

  const handleChange = (index, e) => {
    const newEntries = experienceList.slice();
    const { name, type, checked, value } = e.target;
    newEntries[index][name] = type === "checkbox" ? checked : value;
    setExperienceList(newEntries);
  };

  const addNewExperience = () => {
    setExperienceList([
      ...experienceList,
      {
        workTitle: "",
        company: "",
        city: "",
        startDate: "",
        endDate: "",
        currentlyWorking: false,
        workSummary: "",
      },
    ]);
  };

  const removeNewExperience = () => {
    setExperienceList((experienceList) => experienceList.slice(0, -1));
  };

  const handleRichTextEditor = (e, name, index) => {
    const newEntries = experienceList.slice();
    newEntries[index][name] = e.target.value;
    setExperienceList(newEntries);
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      experience: experienceList,
    });
  }, [experienceList]);

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        experience: experienceList.map(({ id, ...rest }) => rest),
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
      className="py-5 bg-white px-10 shadow-xl rounded-xl border-t-[15px] mt-4 -mb-4"
      style={{ borderColor: "#2b7fff" }}
    >
      <p className="font-bold text-2xl">Work Experience</p>
      <p className="text-gray-600 text-sm mt-1">
        Add your previous Professional Work Experiences.
      </p>
      <div>
        {experienceList.map((item, i) => (
          <div key={i} className="">
            <div className="grid outline-1 rounded-xl p-5 grid-cols-2 gap-x-10 gap-y-4 mt-5 mb-3">
              <div className="flex-col col-span-2">
                <label className="font-semibold capitalize text-sm">Position Title</label>
                <input
                  required
                  onChange={(event) => handleChange(i, event)}
                  name="workTitle"
                  defaultValue={item?.workTitle}
                  className="w-full bg-gray-100 outline rounded-sm py-2 px-3 mt-1"
                  type="text"
                  id=""
                />
              </div>
              <div className="flex-col">
                <label className="font-semibold capitalize text-sm">Company Name</label>
                <input
                  required
                  onChange={(event) => handleChange(i, event)}
                  name="company"
                  defaultValue={item?.company}
                  className="w-full bg-gray-100 outline rounded-sm py-2 px-3 mt-1"
                  type="text"
                  id=""
                />
              </div>
              <div className="flex-col">
                <label className="font-semibold capitalize text-sm">City</label>
                <input
                  required
                  onChange={(event) => handleChange(i, event)}
                  name="city"
                  defaultValue={item?.city}
                  className="w-full bg-gray-100 outline rounded-sm py-2 px-3 mt-1"
                  type="text"
                  id=""
                />
              </div>

              <div className="flex-col">
                <label className="font-semibold text-sm">Start Date</label>
                <input
                  required
                  onChange={(event) => handleChange(i, event)}
                  name="startDate"
                  defaultValue={item?.startDate}
                  className="w-full bg-gray-100 outline rounded-sm py-2 px-3 mt-1"
                  type="month"
                  id=""
                />
              </div>
              <div className="flex-col">
                <label className="font-semibold text-sm">End Date</label>
                <input
                  onChange={(event) => handleChange(i, event)}
                  name="endDate"
                  defaultValue={item?.endDate}
                  className="w-full bg-gray-100 outline rounded-sm py-2 px-3 mt-1"
                  type="month"
                  id=""
                />
              </div>
              <div className="flex col-span-2 mt-1 justify-center gap-5 items-center">
                <label className="font-semibold text-sm">
                  Currently Working ?
                </label>
                <input
                  type="checkbox"
                  name="currentlyWorking"
                  defaultValue={item?.currentlyWorking}
                  checked={experienceList[i].currentlyWorking}
                  onChange={(event) => handleChange(i, event)}
                />
              </div>
              <div className="col-span-2">
                <RichTextEditor
                  index={i}
                  defaultValue={item?.workSummary}
                  onrichTextEditorChange={(event) =>
                    handleRichTextEditor(event, "workSummary", i)
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center mt-4 justify-between">
        <div className="flex gap-2">
          <button
            onClick={addNewExperience}
            className="flex text-sm justify-center items-center border-[2px] hover:bg-gray-100 duration-150 cursor-pointer text-blue-500 font-semibold border-gray-300 py-[6px] rounded-md px-3 gap-2"
          >
            <i className="fa-solid fa-plus"></i>
            <p>Add More Experience</p>
          </button>
          {experienceList.length > 0 && (
            <button
              onClick={removeNewExperience}
              className="flex text-sm justify-center items-center border-[2px] hover:bg-gray-100 duration-150 cursor-pointer text-blue-500 font-semibold border-gray-300 py-[6px] rounded-md px-3 gap-2"
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
          className=" bg-blue-500 text-white font-semibold hover:bg-blue-600 cursor-pointer duration-150 py-[6px] px-8 rounded-sm"
        >
          {loading ? <Loader2 className="animate-spin" /> : "Save"}
        </button>
      </div>
    </div>
  );
};

export default ExperienceForm;
