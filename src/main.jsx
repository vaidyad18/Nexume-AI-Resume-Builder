import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignInPage from "./components/SignInPage.jsx";
import Home from "./components/Home.jsx";
import Dashboard from "./components/Dashboard.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import EditResume from "./components/[resumeId]/EditResume";
import ViewResume from "./components/[resumeId]/ViewResume";

const PUBLISHABLE_KEY = sk_test_Bz9MDhkqqjgQpXNMIJYPm5iAFX4Z05QIR7vIOVwLXs
const router = createBrowserRouter([
  {
    element: <App />,
    children: [ 
      {
        path: "/dashboard",
        element: <Dashboard />,
      },{
        path: "dashboard/:resumeId/edit-resume",
        element: <EditResume/>
      }
    ]
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/sign-in",
    element: <SignInPage />,
  },{
    path: "dashboard/:resumeId/view-resume",
    element: <ViewResume/>
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>
);
