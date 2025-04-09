import { Loader2 } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "./../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { toast } from "sonner";

const SkillsForm = () => {
  const [skillList, setSkillList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const { resumeId } = useParams();

  const addNewSkill = () => {
    setSkillList([
      ...skillList,
      {
        name: "",
        rating: 0,
      },
    ]);
  };

  const removeNewSkill = () => {
    setSkillList((skillList) => skillList.slice(0, -1));
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      skill: skillList,
    });
  }, [skillList]);

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        skill: skillList.map(({ id, ...rest }) => rest),
      },
    };

    GlobalApi.UpdateResumeDetail(data, resumeId)
      .then((response) => {
        setLoading(false);
        toast("Details updated. ✅");
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    resumeInfo && setSkillList(resumeInfo?.skill);
  }, []);

  const handleChange = (index, name, value) => {
    const newEntries = skillList.slice();
    newEntries[index][name] = value;
    setSkillList(newEntries);
  };
  return (
    <div
      className="py-5 px-10 bg-white shadow-xl rounded-xl border-t-[15px] mt-4 -mb-4"
      style={{ borderColor: "#2b7fff" }}
    >
      <p className="font-bold text-xl sm:text-2xl">Skills</p>
      <p className="text-gray-600 text-xs sm:text-sm mt-1">
        Add your Professional key skills.
      </p>
      {skillList.map((item, i) => (
        <div key={i} className="">
          <div className=" outline-1 rounded-xl p-3 sm:p-5 flex items-center justify-between mt-5 mb-3">
            <div className="flex-col">
              <label className="font-semibold text-xs sm:text-sm">Skill Name</label>
              <input
                required
                onChange={(event) =>
                  handleChange(i, "name", event.target.value)
                }
                name="name"
                defaultValue={item?.name}
                className="w-full bg-gray-100 text-sm sm:text-[16px] outline rounded-sm py-2 px-3 mt-1"
                type="text"
                id=""
              />
            </div>
            <div>
              <Rating
                style={{ maxWidth: 150 }}
                value={item.rating}
                onChange={(v) => handleChange(i, "rating", v)}
              />
            </div>
          </div>
        </div>
      ))}
      <div className="flex items-center mt-4 justify-between">
        <div className="flex gap-2">
          <button
            onClick={addNewSkill}
            className="flex text-xs sm:text-sm hover:bg-gray-100 duration-150 cursor-pointer justify-center items-center border-[2px] text-blue-500 font-semibold border-gray-300 py-[6px] rounded-md px-3 gap-2"
          >
            <i className="fa-solid fa-plus"></i>
            <p>Add Skills</p>
          </button>
          {skillList.length > 0 && (
            <button
              onClick={removeNewSkill}
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
          className=" bg-blue-500 text-sm sm:text-[16px] text-white font-semibold hover:bg-blue-600 cursor-pointer duration-150 py-[6px] px-8 rounded-sm"
        >
          {loading ? <Loader2 className="animate-spin" /> : "Save"}
        </button>
      </div>
    </div>
  );
};

export default SkillsForm;
