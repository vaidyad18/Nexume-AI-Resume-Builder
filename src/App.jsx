import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./components/Header";
import { Toaster } from "sonner";

function App() {
  const { user, isLoaded, isSignedIn } = useUser();
  if (!isSignedIn && isLoaded) {
    return <Navigate to={"/sign-in"} />;
  }

  return (
    <div className=" bg-[url('https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjg4Mi1zYXNpLTEzLmpwZw.jpg')] bg-cover">
      <Header />
      <div className="">
        <Outlet />
        <Toaster />
      </div>
    </div>
  );
}

export default App;
