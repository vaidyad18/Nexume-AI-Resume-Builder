import { Loader2, PlusSquare, RabbitIcon, XIcon } from "lucide-react";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/clerk-react";
import GlobalApi from "./../../service/GlobalApi";
import { useNavigate } from "react-router-dom";
import { DialogClose } from "@radix-ui/react-dialog";

const AddResume = () => {
  const { user } = useUser();
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();

  const onCreate = async () => {
    setLoading(true);
    const uuid = uuidv4();
    const data = {
      title: resumeTitle,
      resumeId: uuid,
      userMail: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName,
    };

    GlobalApi.CreateNewResume(data).then(
      (response) => {
        if (response) {
          setLoading(false);
          navigation(
            "/dashboard/" + response.data.data.documentId + "/edit-resume"
          );
        }
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      onCreate();
    }
  };

  return (
    <div>
      <div
        className="cursor-pointer hover:scale-105 duration-200 flex sm:py-28 px-[45px] py-[70px] xs:px-[58px] xs:py-20 sm:px-20 rounded-lg border-dashed border-gray-400 shadow-xl border-2 justify-center bg-black "
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare className="invert" />
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="[&>button]:hidden">
          <DialogClose asChild={true}>
            <XIcon
              className="flex w-5 -mb-8 cursor-pointer -mt-4 -mr-3 justify-self-end"
              onClick={() => setOpenDialog(!openDialog)}
            />
          </DialogClose>
          <DialogHeader>
            <DialogTitle>Create new Resume</DialogTitle>
            <DialogDescription>
              Add a title for your new resume
              <input
                onChange={(e) => setResumeTitle(e.target.value)}
                className="w-full py-2 mt-2 pl-4 rounded-sm font-semibold capitalize outline-1 mb-2"
                type="text"
                onKeyDown={handleEnter}
                placeholder="Eg. Software Developer"
                name=""
                id=""
              />
            </DialogDescription>
            <div className="flex justify-end gap-5 font-semibold">
              <button
                onClick={() => setOpenDialog(false)}
                className="bg-gray-200 hover:bg-gray-300 duration-150 cursor-pointer text-[14px] rounded-sm py-2 px-5"
              >
                Cancel
              </button>
              <button
                disabled={!resumeTitle || loading}
                onClick={() => onCreate()}
                className="bg-blue-500 hover:bg-blue-600 duration-150 cursor-pointer text-[14px] text-white rounded-sm py-2 px-5"
              >
                {loading ? <Loader2 className="animate-spin" /> : "Create"}
              </button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddResume;
