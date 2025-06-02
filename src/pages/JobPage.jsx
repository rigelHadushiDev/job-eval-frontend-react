import React from "react";
import { useLoaderData, useNavigate, useLocation } from "react-router-dom";
import axios from "../api/axios";
import {
  WorkingTypeLabels,
  EmploymentTypeLabels,
} from "../constants/enumLabels";
import useAuth from "../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ERROR_MESSAGES from "../constants/ErrorMessages";
import Footer from "../components/Footer";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const jobLoader = async ({ params }) => {
  const { id } = params;
  try {
    const response = await axios.get(`/jobPosting/getJobPosting`, {
      params: { jobPostingId: id },
    });
    if (!response.data) throw new Error("Job not found");
    return response.data;
  } catch {
    throw new Error("Job not found");
  }
};

const JobPage = () => {
  const job = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  if (!job)
    return <div className="text-center py-20 text-red-400">Job not found</div>;

  let skills = job.requiredSkills;
  if (typeof skills === "string") {
    skills = skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  if (!Array.isArray(skills)) skills = [];

  return (
    <>
      <section className="min-h-screen py-16 px-2 md:px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex justify-center items-center">
        <div className="w-full max-w-4xl min-h-[850px] bg-[#181c2f] rounded-3xl shadow-2xl p-6 md:p-12 border border-white/10 my-8 flex flex-col justify-center">
          {/* Job Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div>
              <h3 className="text-lg font-bold text-blue-400 mb-4">
                Job Details
              </h3>
              <div className="text-sm text-white/90 space-y-2">
                <div>
                  <span className="font-semibold">Job Title:</span>{" "}
                  {job.jobTitle || "-"}
                </div>
                <div>
                  <span className="font-semibold">Employment Type:</span>{" "}
                  {EmploymentTypeLabels[job.employmentType] ||
                    job.employmentType ||
                    "-"}
                </div>
                <div>
                  <span className="font-semibold">Experience Required:</span>{" "}
                  {job.requiredExperienceYears
                    ? `${job.requiredExperienceYears}+ years`
                    : "-"}
                </div>
                <div>
                  <span className="font-semibold">English Level:</span>{" "}
                  {job.requiredEnglishLevel || "-"}
                </div>
                <div>
                  <span className="font-semibold">Working Type:</span>{" "}
                  {WorkingTypeLabels[job.workingType] || job.workingType || "-"}
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-green-400 mb-4">
                Location & Compensation
              </h3>
              <div className="text-sm text-white/90 space-y-2">
                <div>
                  <span className="font-semibold">City:</span> {job.city || "-"}
                </div>
                <div>
                  <span className="font-semibold">Country:</span>{" "}
                  {job.country || "-"}
                </div>
                <div>
                  <span className="font-semibold">Salary Range:</span>{" "}
                  {typeof job.minSalary === "number" &&
                  typeof job.maxSalary === "number"
                    ? `$${job.minSalary.toLocaleString()} - $${job.maxSalary.toLocaleString()}`
                    : "-"}
                </div>
                <div>
                  <span className="font-semibold">Application Deadline:</span>{" "}
                  {job.closedAt
                    ? new Date(job.closedAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "-"}
                </div>
                <div>
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs ml-1 ${
                      job.closed
                        ? "bg-red-700 text-red-100"
                        : "bg-green-700 text-white"
                    }`}
                  >
                    {job.closed ? "Closed" : "Open"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Job Description */}
          <div className="mb-10">
            <h3 className="text-lg font-bold text-purple-400 mb-4">
              Job Description
            </h3>
            <div
              className="text-white/90 whitespace-pre-line text-sm prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: job.jobDescription || "-" }}
            />
          </div>
          {/* Required Skills */}
          <div className="mb-10">
            <h4 className="text-md font-bold text-orange-400 mb-2">
              Required Skills
            </h4>
            <div className="flex flex-wrap gap-3">
              {skills.length > 0 ? (
                skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-[#23244a] text-blue-200 px-4 py-1 rounded-full text-sm border border-white/10"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-gray-400">-</span>
              )}
            </div>
          </div>
          {/* Apply Button */}
          <div className="mt-10">
            <button
              className="w-full py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-lg shadow-xl hover:from-blue-600 hover:to-purple-600 transition-all"
              onClick={async () => {
                if (!auth?.accessToken) {
                  navigate("/sign-in", {
                    state: { from: location },
                    replace: true,
                  });
                } else if (auth?.role !== "USER") {
                  toast.error("Unauthorized to apply");
                } else {
                  try {
                    await axiosPrivate.post(`/jobApplication/apply`, null, {
                      params: { jobPostingId: job.jobPostingId },
                    });
                    toast.success("Applied successfully");
                  } catch (err) {
                    const messageKey = err?.response?.data?.message;
                    const toastMessage =
                      ERROR_MESSAGES[messageKey] ||
                      "Failed to apply for this job position. Please try again later.";
                    toast.error(toastMessage);
                  }
                }
              }}
            >
              Apply Now
            </button>
            <ToastContainer />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export { JobPage as default, jobLoader };
