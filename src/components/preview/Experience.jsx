import React from "react";

const Experience = ({ resumeInfo }) => {
  return (
    resumeInfo?.experience && resumeInfo.experience.length > 0 ? (
      <div className="my-5">
        <p className="text-lg font-bold" style={{ color: resumeInfo?.theme }}>
          Work Experience
        </p>
        <hr className="border-2 my-1" style={{ borderColor: resumeInfo?.theme }} />
        {resumeInfo?.experience.map((exp, index) => (
          <div className="my-4" key={index}>
            <p style={{ color: resumeInfo?.theme }} className="font-bold text-sm text-left">
              {exp?.workTitle}
            </p>
            <div className="flex justify-between">
              <p className="text-left text-xs font-semibold">
                {exp?.company}, {exp?.city}
              </p>
              <p className="text-[12px] font-semibold">
                {exp?.startDate} &nbsp;- &nbsp;
                {exp?.currentlyWorking ? "Present" : exp?.endDate}
              </p>
            </div>
            <div className="text-left mt-1 text-[12px]" dangerouslySetInnerHTML={{ __html: exp?.workSummary }}></div>
          </div>
        ))}
      </div>
    ) : null
  );
};

export default Experience;
