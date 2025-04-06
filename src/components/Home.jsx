import { UserButton } from "@clerk/clerk-react";

import Header from "./Header";
import { ArrowRight } from "lucide-react";
import LandingPage from "./LandingPage";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="bg-[url('https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjg4Mi1zYXNpLTEzLmpwZw.jpg')] bg-cover relative">
      <Header/>
      <LandingPage/>
      <Footer/>
    </div>
  );
};

export default Home;
