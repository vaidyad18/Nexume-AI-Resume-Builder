import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="lg:pt-16 pt-4 sm:pt-8 pb-2 lg:pb-6 px-6 xsm:px-6 sm:px-10 md:px-20 lg:px-32 bg-[#444b52]">
      <div className=" pb-6 lg:pb-16 grid grid-cols-2 xsm:grid-cols-3 gap-x-20 xsm:gap-x-6 sm:gap-x-12 md:gap-x-32 lg:gap-x-52 ">
        <div>
          <p className="text-white font-semibold text-[13px] sm:text-[16px] lg:text-[18px] my-3">Nexume</p>
          <p className="lg:text-[15px] text-[10px] sm:text-[13px] text-[#a9aaab]">
            AI-driven resumes that highlight your strengths and get you hired
            faster.
          </p>
        </div>
        <div>
          <p className="text-white text-[13px] sm:text-[16px] lg:text-[18px] font-semibold my-3">
            Quick Links
          </p>
          <Link to={"/"}>
            <p className="lg:text-[15px] text-[10px] sm:text-[13px] text-[#a9aaab] duration-200 hover:text-white cursor-pointer">
              Home
            </p>
          </Link>
          <Link to={"/dashboard"}>
            <p className="lg:text-[15px] text-[10px] sm:text-[13px] text-[#a9aaab] duration-200 mt-1 hover:text-white cursor-pointer">
              Dashboard
            </p>
          </Link>
        </div>
        <div>
          <p className="text-white font-semibold text-[13px] sm:text-[16px] lg:text-[18px] my-3">
            Contact Us
          </p>
          <p className="lg:text-[15px] text-[10px] sm:text-[13px] text-[#a9aaab]">
            Email: vaidyadandriyal04@gmail.com
          </p>
        </div>
      </div>
      <div className="w-full bg-[#a9aaab] h-[0.01rem]"></div>
      <div className="text-center text-white text-sm sm:text-md lg:text-lg mt-6">
        © 2025 Nexume. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
