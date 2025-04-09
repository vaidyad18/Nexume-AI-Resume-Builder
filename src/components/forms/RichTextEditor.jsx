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
  `position title: {workTitle},depends on position tile, give me 3-4 bullet points in medium for my experience in resume,give me result in HTML tag.
  Give result in this format:
ny json { "resume_points_html": [ "
(point)
", "
(point)
", "
(point)
" ] } 
  `;
const RichTextEditor = ({ onrichTextEditorChange, index, defaultValue }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [value, setValue] = useState(defaultValue);
  const [loading, setLoading] = useState(false);

  const generateSummaryFromAI = async () => {
    setLoading(true);
    if (!resumeInfo?.experience[index].workTitle) {
      toast("Please Add Position Title");
      setLoading(false);
      return;
    }
    const prompt = PROMPT.replace(
      "{workTitle}",
      resumeInfo?.experience[index].workTitle
    );
    const result = await AIChatSession.sendMessage(prompt);

    const responseText = await result.response.text();

    setValue(responseText.trim());
    setLoading(false);
  };
  return (
    <div>
      <div className="flex justify-between items-end mb-3">
        <p className="font-semibold text-xs sm:text-sm">Work Summary</p>

        <button
          onClick={generateSummaryFromAI}
          className="flex text-xs sm:text-sm justify-center items-center hover:bg-gray-100 cursor-pointer border-[2px] font-semibold border-gray-300 py-[6px] rounded-md px-3 gap-2 "
        >
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Brain className="sm:w-4 w-3 h-3 sm:h-4" />{" "}
              <p className="text-sm sm:text-[16px]">Generate from AI</p>
            </div>
          )}
        </button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onrichTextEditorChange(e);
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

export default RichTextEditor;
