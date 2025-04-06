import React from "react";

const Projects = ({ resumeInfo }) => {
  return resumeInfo?.project && resumeInfo.project.length > 0 ? (
    <div className="my-5">
      <p className="text-lg font-bold" style={{ color: resumeInfo?.theme }}>
        Projects
      </p>
      <hr
        className="border-2 my-1"
        style={{ borderColor: resumeInfo?.theme }}
      />

      {resumeInfo.project.map((proj, index) => (
        <div className="my-4" key={index}>
          <p
            style={{ color: resumeInfo?.theme }}
            className="font-bold text-sm text-left"
          >
            {proj?.projectName}
          </p>
          <p className="text-left text-xs font-semibold">{proj?.techUsed}</p>
          <div className="text-left mt-1 text-[12px]" dangerouslySetInnerHTML={{ __html: proj?.projectSummary }}></div>
        </div>
      ))}
    </div>
  ) : null;
};

export default Projects;
