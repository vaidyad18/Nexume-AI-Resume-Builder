import React from "react";

const PersonalDetails = ({ resumeInfo }) => {
  return (
    <div>
      <h1
        className="text-2xl -mt-2 font-bold"
        style={{ color: resumeInfo?.theme }}
      >
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h1>
      <p className="font-semibold">{resumeInfo?.jobTitle}</p>
      <p
        className="text-xs font-semibold mt-1"
        style={{ color: resumeInfo?.theme }}
      >
        {resumeInfo?.address}
      </p>
      <div className="flex font-semibold justify-between">
        <p className="text-xs" style={{ color: resumeInfo?.theme }}>
          {resumeInfo?.phone}
        </p>
        <p className="text-xs" style={{ color: resumeInfo?.theme }}>
          {resumeInfo?.email}
        </p>
      </div>
      <div className="flex justify-center -mt-2 gap-2">
        <a className="" href="">
          <img
            className="w-[14px] mt-[1px]"
            src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
            alt=""
          />
        </a>
        <a className="" href="">
          <img
            className="w-[15px]"
            src="https://cdn.prod.website-files.com/5f10ed4b2ae6bc09c03f5d7a/64959d5f65a257fb51a4259c_github.png"
            alt=""
          />
        </a>
        <a className="" href="">
          <img
            className="w-[14px] mt-[1px]"
            src="https://www.isani.com.my/marketing/wp-content/uploads/2019/09/kisspng-computer-icons-symbol-clip-art-website-logo-5b0c99a72da004.2539804115275524231869.png"
            alt=""
          />
        </a>
      </div>

      <hr
        className="border-2 my-2"
        style={{ borderColor: resumeInfo?.theme }}
      />
    </div>
  );
};

export default PersonalDetails;
