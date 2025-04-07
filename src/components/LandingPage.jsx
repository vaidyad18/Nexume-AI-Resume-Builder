import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="flex -mt-10 h-[695px] justify-center items-center">
      <div className="flex flex-col items-center text-center">
        <img
          className="grayscale invert-0 w-20 xsm:w-28 md:w-32 xsm:my-4 my-2  hover:animate-[spin_4s_linear_infinite] transition-all duration-100"
          src="/Screenshot_2025-04-05_001033-removebg-preview.png"
          alt=""
        />

        <p className="md:text-7xl text-5xl xsm:text-6xl text-white hover:text-blue-500 font-saira hover:scale-105 cursor-default duration-200 font-bold">Nexume</p>
        <p className="font-lexend hover:text-blue-500 text-white hover:scale-105 duration-200 cursor-default font-semibold text-lg xsm:text-2xl md:text-[32px]">
          NEXT GEN RESUME
        </p>
        <Link to={"/dashboard"}>
          <button className="flex cursor-pointer hover:bg-white hover:text-black duration-300 my-5 xsm:my-10 gap-2 font-semibold md:text-lg text-sm xsm:text-md bg-blue-500 text-white hover:scale-105 py-2 md:py-3 px-4 md:px-6 items-center justify-center rounded-xl">
            Create Resume <ArrowRight />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
