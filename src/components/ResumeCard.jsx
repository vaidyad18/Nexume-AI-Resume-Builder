import { Loader2, MoreVerticalIcon } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import GlobalApi from "./../../service/GlobalApi";
import { toast } from "sonner";

const ResumeCard = ({ resume, refreshData }) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = () => {
    setLoading(true);
    GlobalApi.DeleteResumeById(resume.documentId).then(
      (response) => {
        toast("Resume deleted 🗑️");
        refreshData();
        setLoading(false);
        setOpenAlert(false);
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  return (
    <div className="flex-col">
      <Link
        className=""
        to={"/dashboard/" + resume.documentId + "/edit-resume"}
      >
        <div
          className="group cursor-pointer shadow-lg flex sm:py-[79px] py-[51px] px-[34px] xs:py-[54px] xs:px-[40px] sm:px-[59px] rounded-tr-lg rounded-tl-lg  justify-center bg-gray-200 border-t-[16px] bg-linear-to-t from-[#1e90ff] to-[#99badd]"
          style={{ borderTopColor: resume?.theme }}
        >
          <img
            className="sm:w-20 xs:w-16 w-12 transform transition-transform duration-200 group-hover:scale-110"
            src="https://cdn-icons-png.flaticon.com/512/7039/7039285.png"
            alt=""
          />
        </div>
      </Link>
      <div
        style={{ backgroundColor: resume?.theme ?? 'white' }}
        className=" flex justify-between px-3 py-1 items-center rounded-br-lg shadow-lg rounded-bl-lg"
      >
        <p
          className={`xs:text-sm text-xs capitalize font-semibold xs:w-24 w-20 sm:w-full text-left xs:py-2 ${
            ["black", "#410445", "#4E1F00"].includes(resume?.theme)
              ? "text-white"
              : ""
          }`}
        >
          {resume.title}
        </p>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVerticalIcon
              className={`w-4 cursor-pointer h-4 ${
                ["black", "#410445", "#4E1F00"].includes(resume?.theme)
                  ? "text-white"
                  : ""
              }`}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Link to={"/dashboard/" + resume.documentId + "/edit-resume"}>
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </Link>
            <Link to={"/dashboard/" + resume.documentId + "/view-resume"}>
              <DropdownMenuItem>View</DropdownMenuItem>
            </Link>
            <Link to={"/dashboard/" + resume.documentId + "/view-resume"}>
              <DropdownMenuItem>Download</DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={() => setOpenAlert(true)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={openAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                className="cursor-pointer"
                onClick={() => setOpenAlert(false)}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-blue-500 duration-150 hover:bg-blue-600 cursor-pointer"
                disabled={loading}
                onClick={onDelete}
              >
                {loading ? <Loader2 className="animate-spin" /> : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default ResumeCard;
