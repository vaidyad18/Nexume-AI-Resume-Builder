import React from "react";

const PersonalDetails = ({ resumeInfo }) => {
  return (
    <div>
      <h1
        className="text-xl capitalize sm:text-2xl -mt-2 font-bold"
        style={{ color: resumeInfo?.theme }}
      >
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h1>
      <p className="font-semibold capitalize sm:text-[16px] text-sm">{resumeInfo?.jobTitle}</p>
      <p
        className="text-[10px] sm:text-xs font-semibold mt-1"
        style={{ color: resumeInfo?.theme }}
      >
        {resumeInfo?.address}
      </p>
      <div className="flex mb-2 font-semibold justify-between">
        <p className="text-[10px] sm:text-xs" style={{ color: resumeInfo?.theme }}>
          {resumeInfo?.phone}
        </p>
        <p className="text-[8px] xsm:text-[10px] sm:text-xs" style={{ color: resumeInfo?.theme }}>
           <a href={`mailto:${resumeInfo?.email}`} target="_blank">{resumeInfo?.userMail}</a>
        </p>
      </div>
      {resumeInfo?.linkedin || resumeInfo?.github || resumeInfo?.website ? (
        <div className="flex justify-center mb-2 -mt-5 gap-2">
          {resumeInfo?.linkedin ? (
            <a
              href={resumeInfo?.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="sm:w-[14px] w-[12px] mt-[1px]"
                src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
                alt=""
              />
            </a>
          ) : (
            ""
          )}
          {resumeInfo?.github ? (
            <a
              href={resumeInfo?.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="sm:w-[15px] w-[13px]"
                src="https://cdn.prod.website-files.com/5f10ed4b2ae6bc09c03f5d7a/64959d5f65a257fb51a4259c_github.png"
                alt=""
              />
            </a>
          ) : (
            ""
          )}
          {resumeInfo?.website ? (
            <a
              href={resumeInfo?.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="sm:w-[14px] w-[12px] mt-[1px]"
                src="https://www.isani.com.my/marketing/wp-content/uploads/2019/09/kisspng-computer-icons-symbol-clip-art-website-logo-5b0c99a72da004.2539804115275524231869.png"
                alt=""
              />
            </a>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}

      <hr
        className="border-2 mb-2"
        style={{ borderColor: resumeInfo?.theme }}
      />
    </div>
  );
};

export default PersonalDetails;
