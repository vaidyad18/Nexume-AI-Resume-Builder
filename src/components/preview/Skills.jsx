import React from "react";

const Skills = ({ resumeInfo }) => {
  return resumeInfo?.skill && resumeInfo.skill.length > 0 ? (
    <div className="mb-5">
      <p className="text-md sm:text-lg font-bold" style={{ color: resumeInfo?.theme }}>
        Skills
      </p>
      <hr
        className="border-2 my-1"
        style={{ borderColor: resumeInfo?.theme }}
      />
      <div className="grid grid-cols-2 gap-x-6 my-4 gap-y-2">
        {resumeInfo?.skill.map((skill, i) => (
          <div key={i} className="flex items-center gap-2 justify-between">
            <p className="text-[10px] sm:text-xs font-semibold">{skill?.name}</p>
            <div className="h-[6px] bg-gray-300 w-32">
              <div
                className="h-[6px]"
                style={{
                  backgroundColor: resumeInfo?.theme,
                  width: skill?.rating * 20 + "%",
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : null;
};

export default Skills;
