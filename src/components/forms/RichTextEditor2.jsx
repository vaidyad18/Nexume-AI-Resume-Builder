import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Brain, Loader2 } from "lucide-react";
import React, { useContext, useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnNumberedList,
  BtnRedo,
  BtnUnderline,
  BtnUndo,
  Editor,
  EditorProvider,
  Toolbar,
} from "react-simple-wysiwyg";
import { AIChatSession } from "./../../../service/AIModel";
import { toast } from "sonner";

const PROMPT =
  "project name: {projectName} and tech used: {techUsed}, depending on project name and tech used, give me 3-4 bullet points in medium for my project in resume,give me result in HTML tag.";
const RichTextEditor2 = ({ onrichTextEditorChange2, index, defaultValue }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [value, setValue] = useState(defaultValue);
  const [loading, setLoading] = useState(false);

  const generateSummaryFromAI = async () => {
    setLoading(true);
    if (!resumeInfo?.project[index].projectName) {
      toast("Please Add Project Name");
      setLoading(false);
      return;
    }

    if (!resumeInfo?.project[index].techUsed) {
      toast("Please Add Tech you Used");
      setLoading(false);
      return;
    }
    
    const prompt = PROMPT.replace(
      "{projectName}",
      resumeInfo?.project[index].projectName
    ).replace("{techUsed}", resumeInfo?.project[index].techUsed);

    const result = await AIChatSession.sendMessage(prompt);
    const response = result.response.text();
    setValue(response.replace(/["\[\]{},]/g, ""));
    setLoading(false);
  };
  return (
    <div>
      <div className="flex justify-between items-end mb-3">
        <p className="font-semibold text-xs sm:text-sm">Project Summary</p>

        <button
          onClick={generateSummaryFromAI}
          className="flex text-xs sm:text-sm justify-center items-center border-[2px] font-semibold hover:bg-gray-100 cursor-pointer border-gray-300 py-[6px] rounded-md px-3 gap-2 "
        >
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Brain className="sm:w-4 w-3 h-3 sm:h-4" /> <p className="text-sm sm:text-[16px]">Generate from AI</p>
            </div>
          )}
        </button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onrichTextEditorChange2(e);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnBulletList />
            <BtnUndo />
            <BtnRedo />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
};

export default RichTextEditor2;
