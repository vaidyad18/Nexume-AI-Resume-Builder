import React from "react";
import { useContext, useState, useEffect } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import GlobalApi from "././../../../service/GlobalApi";
import { Brain, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { AIChatSession } from "./../../../service/AIModel";

const prompt =
  "Job Title: {jobTitle} , Depends on job title give me list of  summery for 3 experience level, Mid Level and Freasher level in 2-3 lines in array format, With summery and experience_level Field in JSON Format";
const SummaryForm = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState();
  const [aiSummaryList, setAiSummaryList] = useState();
  const params = useParams();

  useEffect(() => {
    summary &&
      setResumeInfo({
        ...resumeInfo,
        summary: summary,
      });
  }, [summary]);
  
  const GenerateSummaryFromAI = async () => {
    setLoading(true);
    const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle);
    const result = await AIChatSession.sendMessage(PROMPT);
    setAiSummaryList(JSON.parse(result.response.text()));
    setLoading(false);
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: {
        summary: summary,
      },
    };

    GlobalApi.UpdateResumeDetail(data, params?.resumeId)
      .then((response) => {
        setLoading(false);
        toast("Details updated. ✅");
      })
      .catch((error) => {
        setLoading(false);
        console.error(
          "Error updating resume:",
          error.response?.data || error.message
        );
      });
  };

  return (
    <div
      className="py-5 bg-white px-10 shadow-xl rounded-xl border-t-[15px] mt-4 -mb-4"
      style={{ borderColor: "#2b7fff" }}
    >
      <p className="font-bold text-2xl">Summary</p>

      <div className="flex justify-between gap-2 items-center">
        <p className="text-gray-600 text-sm mt-1">
          Add your summary according to your Job Title.
        </p>
        <button
          onClick={() => GenerateSummaryFromAI()}
          className="flex text-sm justify-center items-center border-[2px] font-semibold border-gray-300 py-[6px] rounded-md px-3 gap-2 "
        >
          <Brain className="xs:w-4 w-7 h-7 xs:h-4"/> <p>Generate from AI</p>
        </button>
      </div>
      <div>
        <form onSubmit={onSave}>
          <Textarea
            className="my-5"
            required
            defaultValue={resumeInfo?.summary}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
          <div className="flex  justify-end">
            <button
              disabled={loading}
              type="submit"
              className=" bg-blue-500 text-white font-semibold hover:bg-blue-600 cursor-pointer duration-150 py-[6px] px-8 rounded-sm"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Save"}
            </button>
          </div>
        </form>
      </div>
      {aiSummaryList && (
        <div className="my-4">
          <p className="font-bold text-xl ">Suggestions from AI</p>
          {aiSummaryList.map((item, i) => (
            <div
              onClick={(event) => {
                const clickedPTag =
                  event.currentTarget.querySelector("p.text-md.mt-1");
                if (clickedPTag) {
                  setSummary(clickedPTag.innerText);
                }
              }}
              className="my-4 border-2 border-gray-200 shadow-xl rounded-lg p-5"
              key={i}
            >
              <div className="flex">
                <p className="font-semibold text-green-600 text-md">
                  Level:&nbsp;{" "}
                </p>
                <p className="text-md font-semibold">
                  {item?.experience_level}
                </p>
              </div>
              <p className="text-md mt-1">{item?.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SummaryForm;
