import React from "react";
import { FaGlobe, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { EmploymentTypeLabels } from "../constants/enumLabels";

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  // Required skills as array
  const skills =
    typeof job.requiredSkills === "string"
      ? job.requiredSkills.split(",")
      : job.requiredSkills || [];

  // Pill logic for working type/location
  let workingTypePill = null;
  if (job.workingType === "REMOTE") {
    workingTypePill = (
      <span className="inline-flex items-center rounded-full px-4 py-1 bg-purple-700/60 text-white text-sm font-semibold">
        <FaGlobe className="inline mr-2 text-lg" /> Remote
      </span>
    );
  } else if (job.workingType === "HYBRID") {
    workingTypePill = (
      <span className="inline-flex items-center rounded-full px-4 py-1 bg-purple-700/60 text-white text-sm font-semibold">
        <FaMapMarkerAlt className="inline mr-2 text-lg" />
        Hybrid
        {job.city || job.country
          ? ` / ${[job.city, job.country].filter(Boolean).join(", ")}`
          : ""}
      </span>
    );
  } else if (job.workingType === "ON_SITE") {
    workingTypePill = (
      <span className="inline-flex items-center rounded-full px-4 py-1 bg-purple-700/60 text-white text-sm font-semibold">
        <FaMapMarkerAlt className="inline mr-2 text-lg" />
        {job.city || job.country
          ? `${[job.city, job.country].filter(Boolean).join(", ")}`
          : "On Site"}
      </span>
    );
  }

  return (
    <div
      className="group bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-1 cursor-pointer"
      onClick={() => navigate(`/job/${job.jobPostingId}`)}
    >
      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
        {job.jobTitle}
      </h3>
      <div className="flex flex-wrap gap-3 items-center mb-6">
        <span className="rounded-full px-4 py-1 bg-purple-800/60 text-white text-sm font-semibold">
          {EmploymentTypeLabels[job.employmentType] || job.employmentType}
        </span>
        <span className="rounded-full px-4 py-1 bg-emerald-900/60 text-emerald-200 text-sm font-semibold">
          {job.requiredExperienceYears}
        </span>
        {workingTypePill}
      </div>
      <p className="text-gray-300 mb-4 leading-relaxed">
        {/* Remove HTML tags for preview */}
        {job.jobDescription.replace(/<[^>]+>/g, "").substring(0, 120)}...
      </p>
      <div>
        <p className="text-gray-400 text-sm mb-2">Required Skills:</p>
        <div className="flex flex-wrap gap-2">
          {skills.slice(0, 4).map((skill, skillIndex) => (
            <span
              key={skillIndex}
              className="bg-white/10 text-gray-300 px-3 py-1 rounded-full text-sm border border-white/20"
            >
              {skill}
            </span>
          ))}
          {skills.length > 4 && (
            <span className="bg-white/10 text-gray-300 px-3 py-1 rounded-full text-sm border border-white/20">
              +{skills.length - 4} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
