import React from "react";

const Education = ({ resumeInfo }) => {
  return resumeInfo?.education && resumeInfo.education.length > 0 ? (
    <div className="mt-5 mb-1">
      <p className="text-md sm:text-lg font-bold" style={{ color: resumeInfo?.theme }}>
        Education
      </p>
      <hr
        className="border-2 my-1"
        style={{ borderColor: resumeInfo?.theme }}
      />
      {resumeInfo?.education.map((edu, i) => (
        <div className="mt-4 mb-2" key={i}>
          <div className="flex justify-between">
            <p
              style={{ color: resumeInfo?.theme }}
              className="text-left text-xs sm:text-sm font-bold"
            >
              {edu?.universityName}, {edu?.state}
            </p>
            <p className="sm:text-[12px] text-[10px] font-semibold ">
              {edu?.startDate ? edu?.startDate : ""}
              {edu?.endDate ? `- ${edu?.endDate}` : "- Present"}
            </p>
          </div>
          <p className="sm:text-xs text-[10px] text-left font-semibold">
            {edu?.degree}
            {edu?.major ? " in " + edu?.major : ""}
          </p>
        </div>
      ))}
    </div>
  ) : null;
};

export default Education;
