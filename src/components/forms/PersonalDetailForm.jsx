import React from "react";
import { useContext, useState, useEffect } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import GlobalApi from "././../../../service/GlobalApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const PersonalDetailForm = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setResumeInfo({
      ...resumeInfo,
      [name]: value,
    });
  };

  const handleLink = (e) => {
    const { name, value } = e.target;  
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  
    setResumeInfo((prev) => ({
      ...prev,
      [name]: value,
      href: {
        ...(prev.href || {}),
        [name]: value,
      },
    }));
  };  

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      formData: formData,
    });
  }, [formData]);



  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      data: formData
    };
console.log("Payload:", JSON.stringify(data, null, 2));

    GlobalApi.UpdateResumeDetail(data, params?.resumeId)
      .then((response) => {
        setLoading(false);
        toast("Details updated. ✅");
      })
      
  };

  return (
    <div
      className="py-5 bg-white px-10 shadow-xl rounded-xl border-t-[15px] mt-4 -mb-4"
      style={{ borderColor: "#2b7fff" }}
    >
      <p className="font-bold text-xl sm:text-2xl">Personal Details</p>
      <p className="text-gray-600 text-xs sm:text-sm mt-1">
        Let's get started by entering your personal details.
      </p>
      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 gap-x-10 gap-y-4 my-5">
          <div className="flex-col">
            <label className="font-semibold text-xs sm:text-sm">First Name *</label>
            <input
              required
              name="firstName"
              defaultValue={resumeInfo?.firstName}
              onChange={handleInputChange}
              className="w-full capitalize bg-gray-100 outline rounded-sm text-sm sm:text-[16px] py-2 px-3 mt-1"
              placeholder="John"
              type="text"
              id=""
            />
          </div>
          <div className="flex-col">
            <label className="font-semibold  text-xs sm:text-sm">Last Name *</label>
            <input
              required
              name="lastName"
              defaultValue={resumeInfo?.lastName}
              onChange={handleInputChange}
              placeholder="Williams"
              className="w-full bg-gray-100 capitalize outline rounded-sm text-sm sm:text-[16px] py-2 px-3 mt-1"
              type="text"
              id=""
            />
          </div>
          <div className="col-span-2">
            <label className="font-semibold capitalize text-xs sm:text-sm">Job Title *</label>
            <input
              required
              name="jobTitle"
              defaultValue={resumeInfo?.jobTitle}
              onChange={handleInputChange}
              placeholder="Software Engineer"
              className="w-full bg-gray-100 outline text-sm sm:text-[16px] rounded-sm py-2 px-3 mt-1"
              type="text"
              id=""
            />
          </div>
          <div className="col-span-2">
            <label className="font-semibold capitalize text-xs sm:text-sm">Address *</label>
            <input
              required
              name="address"
              defaultValue={resumeInfo?.address}
              onChange={handleInputChange}
              placeholder="XYZ Toronto, Canada"
              className="w-full bg-gray-100 outline text-sm sm:text-[16px] rounded-sm py-2 px-3 mt-1"
              type="text"
              id=""
            />
          </div>
          <div className="flex-col">
            <label className="font-semibold text-xs sm:text-sm">Phone Number *</label>
            <input
              required
              name="phone"
              defaultValue={resumeInfo?.phone}
              onChange={handleInputChange}
              placeholder="(987)-654-3210"
              className="w-full bg-gray-100 outline text-sm sm:text-[16px] rounded-sm py-2 px-3 mt-1"
              type="text"
              id=""
            />
          </div>
          <div className="flex-col">
            <label className="font-semibold text-xs sm:text-sm">Email ID *</label>
            <input
              required
              name="userMail"
              defaultValue={resumeInfo?.userMail}
              onChange={handleInputChange}
              placeholder="example@gmail.com"
              className="w-full bg-gray-100 outline text-sm sm:text-[16px] rounded-sm py-2 px-3 mt-1"
              type="email"
              id=""
            />
          </div>
          <div className="col-span-2">
            <label className="font-semibold capitalize text-xs sm:text-sm">LinkedIn URL</label>
            <input
              name="linkedin"
              defaultValue={resumeInfo?.linkedin}
              onChange={handleLink}
              placeholder="https://www.linkedin.com/.../"
              className="w-full bg-gray-100 outline text-sm sm:text-[16px] rounded-sm py-2 px-3 mt-1"
              type="text"
              id=""
            />
          </div>
          <div className="col-span-2">
            <label className="font-semibold capitalize text-xs sm:text-sm">Github URL</label>
            <input
              name="github"
              defaultValue={resumeInfo?.github}
              onChange={handleLink}
              placeholder="https://github.com/..."
              className="w-full bg-gray-100 outline text-sm sm:text-[16px] rounded-sm py-2 px-3 mt-1"
              type="text"
              id=""
            />
          </div>
          <div className="col-span-2">
            <label className="font-semibold capitalize text-xs sm:text-sm">Other Website</label>
            <input
              name="website"
              defaultValue={resumeInfo?.website}
              onChange={handleLink}
              placeholder="https://www..."
              className="w-full bg-gray-100 outline text-sm sm:text-[16px] rounded-sm py-2 px-3 mt-1"
              type="text"
              id=""
            />
          </div>
        </div>

        <div className="flex  justify-end">
          <button
            disabled={loading}
            type="submit"
            className=" bg-blue-500 text-white hover:bg-blue-600 text-sm sm:text-[16px] cursor-pointer duration-150 font-semibold py-[6px] px-8 rounded-sm"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetailForm;
