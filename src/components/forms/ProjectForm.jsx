import { Loader2 } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "./../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import RichTextEditor2 from "./RichTextEditor2";
import { toast } from "sonner";

const ProjectForm = () => {
  const [projectList, setProjectList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();

  useEffect(() => {
    resumeInfo && setProjectList(resumeInfo?.project);
  }, []);

  const handleChange = (index, e) => {
    const newEntries = projectList.slice();
    const { name, value } = e.target;
    newEntries[index][name] = value;
    setProjectList(newEntries);
  };

  const addNewProject = () => {
    setProjectList([
      ...projectList,
      {
        projectName: "",
        techUsed: "",
        projectSummary: "",
      },
    ]);
  };

  const removeNewProject = () => {
    setProjectList((projectList) => projectList.slice(0, -1));
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      project: projectList,
    });
  }, [projectList]);

  const handleRichTextEditor2 = (e, name, index) => {
    const newEntries = projectList.slice();
    newEntries[index][name] = e.target.value;
    setProjectList(newEntries);
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        project: projectList.map(({ id, ...rest }) => rest),
      },
    };

    GlobalApi.UpdateResumeDetail(data, params?.resumeId)
      .then((response) => {
        setLoading(false);
        toast("Details updated. ✅");
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  return (
    <div
      className="py-5 bg-white px-10 shadow-xl rounded-xl border-t-[15px] mt-4 -mb-4"
      style={{ borderColor: "#2b7fff" }}
    >
      <p className="font-bold text-2xl">Projects</p>
      <p className="text-gray-600 text-sm mt-1">Add your previous Projects.</p>
      <div>
        {projectList.map((item, i) => (
          <div key={i} className="">
            <div className="grid outline-1 rounded-xl p-5 grid-cols-2 gap-x-10 gap-y-4 mt-5 mb-3">
              <div className="flex-col col-span-2">
                <label className="font-semibold text-sm">Project Name</label>
                <input
                  required
                  onChange={(event) => handleChange(i, event)}
                  name="projectName"
                  defaultValue={item?.projectName}
                  className="w-full bg-gray-100 outline rounded-sm py-2 px-3 mt-1"
                  type="text"
                  id=""
                />
              </div>
              <div className="flex-col col-span-2">
                <label className="font-semibold text-sm">Tech Used</label>
                <input
                  required
                  onChange={(event) => handleChange(i, event)}
                  name="techUsed"
                  defaultValue={item?.techUsed}
                  className="w-full bg-gray-100 outline rounded-sm py-2 px-3 mt-1"
                  type="text"
                  id=""
                />
              </div>

              <div className="col-span-2">
                <RichTextEditor2
                  index={i}
                  defaultValue={item?.projectSummary}
                  onrichTextEditorChange2={(event) =>
                    handleRichTextEditor2(event, "projectSummary", i)
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center mt-4 justify-between">
        <div className="flex gap-2">
          <button
            onClick={addNewProject}
            className="flex text-sm hover:bg-gray-100 duration-150 cursor-pointer justify-center items-center border-[2px] text-blue-500 font-semibold border-gray-300 py-[6px] rounded-md px-3 gap-2"
          >
            <i className="fa-solid fa-plus"></i>
            <p>Add More Project</p>
          </button>
          {projectList.length > 0 && (
            <button
              onClick={removeNewProject}
              className="flex text-sm hover:bg-gray-100 duration-150 cursor-pointer justify-center items-center border-[2px] text-blue-500 font-semibold border-gray-300 py-[6px] rounded-md px-3 gap-2"
            >
              <i className="fa-solid fa-minus"></i>
              <p>Remove</p>
            </button>
          )}
        </div>
        <button
          onClick={() => onSave()}
          disabled={loading}
          type="submit"
          className=" bg-blue-500 text-white hover:bg-blue-600 cursor-pointer duration-150 font-semibold py-[6px] px-8 rounded-sm"
        >
          {loading ? <Loader2 className="animate-spin" /> : "Save"}
        </button>
      </div>
    </div>
  );
};

export default ProjectForm;
