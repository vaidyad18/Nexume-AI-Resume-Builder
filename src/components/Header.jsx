import { UserButton, useUser } from "@clerk/clerk-react";
import { Home } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const { user, isSignedIn } = useUser();
  const location = useLocation();
  const isDashboard = location.pathname.includes("/dashboard");

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`flex justify-between items-center py-2 px-2 xsm:px-6 sm:px-10 sticky top-0 w-full  transition-all duration-300 ${
        scrolled&&isDashboard ? "backdrop-blur-md bg-black/40 " : ""
      }`}
    >
      <Link
        className="flex justify-center items-center text-2xl xsm:text-3xl sm:text-4xl font-semibold gap-2 xsm:gap-4"
        to={"/"}
      >
        <img
          className="grayscale-100 xsm:w-10 w-8 sm:w-12 py-1"
          src="/Screenshot_2025-04-05_001033-removebg-preview.png"
          alt=""
        />
        <p className="font-saira  text-white">Nexume</p>
      </Link>

      {isSignedIn ? (
        <div className="flex justify-center items-center mr-1 sm:mr-2 gap-3 xsm:gap-6 sm:gap-10">
          {isDashboard && (
            <Link to={"/"}>
              <button className="bg-blue-500 flex text-xs xsm:text-md sm:text-lg justify-center items-center hover:bg-blue-600 duration-200 cursor-pointer text-white font-semibold py-[6px] sm:py-2 px-1 xsm:px-2 sm:px-4 rounded-lg">
                <Home className="sm:w-5 w-r h-4 sm:h-5 sm:mr-2" /> <p className="xs:block hidden">Home</p>
              </button>
            </Link>
          )}
          <UserButton />
        </div>
      ) : (
        <div className="flex items-center mr-0 sm:mr-8 justify-center gap-2 xsm:gap-4">
          <Link to={"https://simple-oarfish-75.accounts.dev/sign-up"}>
            <button className=" bg-white text-black cursor-pointer py-2 px-2 xsm:px-3 sm:px-5 rounded-full duration-200 hover:scale-105 hover:text-white hover:bg-blue-500 text-xs xsm:text-sm sm:text-lg font-semibold">
              Sign Up
            </button>
          </Link>
          <Link to={"/sign-in"}>
            <button className="bg-blue-500 text-xs xsm:text-sm sm:text-lg text-white font-semibold transition-all py-2 duration-200 hover:scale-105 hover:bg-white hover:text-black cursor-pointer px-3 xsm:px-3 sm:px-5 rounded-full">
              Log In
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
