import React, { useContext, useState, useEffect, useCallback } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../service/GlobalApi";
import { Brain, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { AIChatSession } from "./../../../service/AIModel";

const promptTemplate = `
Job Title: {jobTitle}

Generate a list of 3 summaries for different experience levels: "Fresher", "Mid Level", and "Experienced".
Each summary should be 2-3 lines long.

Respond **ONLY** with a JSON array using this format:

[
  {
    "experience_level": "Fresher",
    "summary": "..."
  },
  {
    "experience_level": "Mid Level",
    "summary": "..."
  },
  {
    "experience_level": "Experienced",
    "summary": "..."
  }
]
Do not include any explanation, heading, or extra characters.
`;

const SummaryForm = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(resumeInfo?.summary || "");
  const [aiSummaryList, setAiSummaryList] = useState([]);
  const params = useParams();

  useEffect(() => {
    setResumeInfo(prev => ({ ...prev, summary }));
  }, [summary]);

  const GenerateSummaryFromAI = useCallback(async () => {
    try {
      setLoading(true);
      const prompt = promptTemplate.replace("{jobTitle}", resumeInfo?.jobTitle || "");
      const result = await AIChatSession.sendMessage(prompt);
      const text = result.response.text().trim();

      const jsonStartIndex = text.indexOf("[");
      const jsonEndIndex = text.lastIndexOf("]") + 1;
      if (jsonStartIndex === -1 || jsonEndIndex === -1) {
        throw new Error("Could not find JSON array in the response.");
      }

      const cleanJson = text.slice(jsonStartIndex, jsonEndIndex);
      const parsed = JSON.parse(cleanJson);

      if (!Array.isArray(parsed)) {
        throw new Error("Parsed content is not an array.");
      }

      setAiSummaryList(parsed);
    } catch (error) {
      console.error("Error parsing AI response:", error);
      toast.error("⚠️ Failed to parse AI summary. Try again.");
    } finally {
      setLoading(false);
    }
  }, [resumeInfo?.jobTitle]);

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: { summary },
    };

    try {
      await GlobalApi.UpdateResumeDetail(data, params?.resumeId);
      toast("Details updated. ✅");
    } catch (error) {
      console.error("Error updating resume:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="py-5 bg-white px-10 shadow-xl rounded-xl border-t-[15px] mt-4 -mb-4"
      style={{ borderColor: "#2b7fff" }}
    >
      <p className="font-bold text-xl sm:text-2xl">Summary</p>

      <div className="flex justify-between gap-2 items-center">
        <p className="text-gray-600 text-xs sm:text-sm mt-1">
          Add your summary according to your Job Title.
        </p>
        <button
          disabled={loading}
          onClick={GenerateSummaryFromAI}
          className={`flex text-xs sm:text-sm justify-center items-center border-[2px] font-semibold py-[6px] rounded-md px-3 gap-2 
              ${loading
                ? "bg-gray-200 cursor-not-allowed"
                : "hover:bg-gray-100 cursor-pointer border-gray-300"}`}
        >
          <Brain className="w-4 h-4" /> <p>Generate from AI</p>
        </button>
      </div>

      <form onSubmit={onSave}>
        <Textarea
          className="my-5 text-sm sm:text-[16px]"
          required
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            disabled={loading}
            type="submit"
            className="bg-blue-500 cursor-pointer text-sm sm:text-[16px] text-white font-semibold hover:bg-blue-600 duration-150 py-[6px] px-8 rounded-sm"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Save"}
          </button>
        </div>
      </form>

      {aiSummaryList?.length > 0 && (
        <div className="my-4">
          <p className="font-bold text-lg sm:text-xl">Suggestions from AI</p>
          {aiSummaryList.map((item, i) => (
            <div
              key={i}
              className="my-4 border-2 border-gray-200 shadow-xl rounded-lg p-5 cursor-pointer"
              onClick={() => setSummary(item.summary)}
            >
              <div className="flex">
                <p className="font-semibold text-green-600 text-sm sm:text-md">
                  Level:&nbsp;
                </p>
                <p className="sm:text-md text-sm font-semibold">
                  {item.experience_level}
                </p>
              </div>
              <p className="text-sm sm:text-md mt-1">{item.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SummaryForm;
