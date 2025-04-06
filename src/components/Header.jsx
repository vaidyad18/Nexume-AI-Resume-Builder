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
      className={`flex justify-between items-center py-2 px-10 sticky top-0 w-full z-50 transition-all duration-300 ${
        scrolled&&isDashboard ? "backdrop-blur-md bg-black/40 " : ""
      }`}
    >
      <Link
        className="flex justify-center items-center text-4xl font-semibold gap-4"
        to={"/"}
      >
        <img
          className="grayscale-100 w-12 py-1"
          src="/Screenshot_2025-04-05_001033-removebg-preview.png"
          alt=""
        />
        <p className="font-saira text-white">Nexume</p>
      </Link>

      {isSignedIn ? (
        <div className="flex justify-center items-center mr-2 gap-10">
          {isDashboard && (
            <Link to={"/"}>
              <button className="bg-blue-500 flex justify-center items-center hover:bg-blue-600 duration-200 cursor-pointer text-white font-semibold py-2 px-4 rounded-lg">
                <Home className="w-5 h-5 mr-2" /> Home
              </button>
            </Link>
          )}
          <UserButton />
        </div>
      ) : (
        <div className="flex items-center mr-8 justify-center gap-4">
          <Link to={"https://simple-oarfish-75.accounts.dev/sign-up"}>
            <button className=" bg-white text-black cursor-pointer py-2 px-5 rounded-full duration-200 hover:scale-105 hover:text-white hover:bg-blue-500 text-md font-semibold">
              Sign Up
            </button>
          </Link>
          <Link to={"/sign-in"}>
            <button className="bg-blue-500 text-white font-semibold transition-all py-2 duration-200 hover:scale-105 hover:bg-white hover:text-black cursor-pointer px-6 rounded-full">
              Log In
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
