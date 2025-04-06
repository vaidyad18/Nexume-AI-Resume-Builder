import React, { useState } from "react";
import PersonalDetailForm from "./forms/PersonalDetailForm";
import SummaryForm from "./forms/SummaryForm";
import ExperienceForm from "./forms/ExperienceForm";
import ProjectForm from "./forms/ProjectForm";
import EducationForm from "./forms/EducationForm";
import SkillsForm from "./forms/SkillsForm";
import { Link, Navigate, useParams } from "react-router-dom";
import { Home } from "lucide-react";
import Theme from "./Theme";

const FormSection = () => {
  const [formSectionIndex, setFormSectionIndex] = useState(1);
  const { resumeId } = useParams();
  return (
    <div className="">
      <div className="flex items-center my-5 px-3 justify-between">
        <div className="flex justify-center items-center gap-2">
          <Link to={"/dashboard"}>
            <button className="bg-blue-500 hover:bg-blue-600 cursor-pointer duration-150 text-white font-semibold gap-2 py-[8px] px-3 rounded-md">
              <Home className="w-5 h-5" />
            </button>
          </Link>
          <Theme/>
        </div>
        <div className="flex gap-3 items-center">
          {formSectionIndex > 1 ? (
            <button
              onClick={() => setFormSectionIndex(formSectionIndex - 1)}
              className="bg-blue-500 hover:bg-blue-600 cursor-pointer duration-150 text-white font-semibold gap-2 py-[6px] px-3 rounded-sm"
            >
              <i className="fa-solid fa-arrow-left"></i>
            </button>
          ) : (
            ""
          )}
          <button
            onClick={() => setFormSectionIndex(formSectionIndex + 1)}
            className="flex bg-blue-500 hover:bg-blue-600 cursor-pointer duration-150 disabled:bg-blue-300 text-white font-semibold text-md gap-2 py-[6px] px-3 rounded-sm justify-center items-center"
          >
            <p>Next</p> <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
      <div>
        {formSectionIndex == 1 ? (
          <PersonalDetailForm />
        ) : formSectionIndex == 2 ? (
          <SummaryForm />
        ) : formSectionIndex == 3 ? (
          <ExperienceForm />
        ) : formSectionIndex == 4 ? (
          <ProjectForm />
        ) : formSectionIndex == 5 ? (
          <EducationForm />
        ) : formSectionIndex == 6 ? (
          <SkillsForm />
        ) : formSectionIndex == 7 ? (
          <Navigate to={"/dashboard/" + resumeId + "/view-resume"} />
        ) : (
          NULL
        )}
      </div>
    </div>
  );
};

export default FormSection;
