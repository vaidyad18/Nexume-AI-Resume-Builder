import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="pt-16 pb-6 px-44 bg-[#444b52]">
      <div className=" pb-16 grid grid-cols-3 gap-x-52 ">
        <div>
          <p className="text-white font-semibold text-[18px] my-3">Nexume</p>
          <p className="text-[15px] text-[#a9aaab]">
            AI-driven resumes that highlight your strengths and get you hired
            faster.
          </p>
        </div>
        <div>
          <p className="text-white text-[18px] font-semibold my-3">
            Quick Links
          </p>
          <Link to={"/"}>
            <p className="text-[15px] text-[#a9aaab] duration-200 hover:text-white cursor-pointer">
              Home
            </p>
          </Link>
          <Link to={"/dashboard"}>
            <p className="text-[15px] text-[#a9aaab] duration-200 mt-1 hover:text-white cursor-pointer">
              Dashboard
            </p>
          </Link>
        </div>
        <div>
          <p className="text-white font-semibold text-[18px] my-3">
            Contact Us
          </p>
          <p className="text-[15px] text-[#a9aaab]">
            Email: vaidyadandriyal04@gmail.com
          </p>
        </div>
      </div>
      <div className="w-full bg-[#a9aaab] h-[0.01rem]"></div>
      <div className="text-center text-white text-lg mt-6">
        © 2025 Nexume. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
