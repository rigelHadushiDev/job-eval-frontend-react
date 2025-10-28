import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  EmploymentTypeLabels,
  WorkingTypeLabels,
} from "../constants/enumLabels";

const ENGLISH_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];

const JobPostingModal = ({ isOpen, onClose, onSave, editingJob }) => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    city: "",
    country: "",
    workingType: "ON_SITE",
    employmentType: "FULL_TIME",
    maxSalary: "",
    minSalary: "",
    closed: false,
    requiredSkills: "",
    requiredExperienceYears: "",
    requiredEnglishLevel: "A1",
    jobDescription: "",
  });
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    if (editingJob) {
      setFormData({
        jobTitle: editingJob.jobTitle || "",
        city: editingJob.city || "",
        country: editingJob.country || "",
        workingType: editingJob.workingType || "ON_SITE",
        employmentType: editingJob.employmentType || "FULL_TIME",
        maxSalary: editingJob.maxSalary || "",
        minSalary: editingJob.minSalary || "",
        closed: editingJob.closed || false,
        requiredSkills: editingJob.requiredSkills || "",
        requiredExperienceYears: editingJob.requiredExperienceYears || "",
        requiredEnglishLevel: editingJob.requiredEnglishLevel || "A1",
        jobDescription: editingJob.jobDescription
          ? editingJob.jobDescription.replace(/\\n/g, "\n")
          : "",
      });
      setSkills(
        editingJob.requiredSkills
          ? editingJob.requiredSkills
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : []
      );
    } else {
      setFormData({
        jobTitle: "",
        city: "",
        country: "",
        workingType: "ON_SITE",
        employmentType: "FULL_TIME",
        maxSalary: "",
        minSalary: "",
        closed: false,
        requiredSkills: "",
        requiredExperienceYears: "",
        requiredEnglishLevel: "A1",
        jobDescription: "",
      });
      setSkills([]);
    }
  }, [editingJob, isOpen]);

  const isLocationRequired =
    formData.workingType === "ONSITE" || formData.workingType === "HYBRID";

  const requiredFields = [
    "jobTitle",
    "workingType",
    "employmentType",
    "maxSalary",
    "minSalary",
    "requiredSkills",
    "requiredExperienceYears",
    "requiredEnglishLevel",
    "jobDescription",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      isLocationRequired &&
      (!formData.city.trim() || !formData.country.trim())
    ) {
      toast.error("City and Country are required for On-Site or Hybrid jobs.");
      return;
    }
    for (const field of requiredFields) {
      if (field === "requiredSkills") {
        if (skills.length === 0) {
          toast.error("Please add at least one required skill.");
          return;
        }
      } else if (
        !formData[field] ||
        (Array.isArray(formData[field]) && formData[field].length === 0)
      ) {
        toast.error("Please fill in all required fields.");
        return;
      }
    }
    onSave({ ...formData, requiredSkills: skills.join(", ") });
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSkillInput = (e) => {
    const value = e.target.value;
    if (value.endsWith(",")) {
      const skill = value.slice(0, -1).trim();
      if (skill && !skills.includes(skill)) {
        setSkills([...skills, skill]);
      }
      setFormData((prev) => ({ ...prev, requiredSkills: "" }));
    } else {
      setFormData((prev) => ({ ...prev, requiredSkills: value }));
    }
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose}></div>
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {editingJob ? "Edit Job Posting" : "Create New Job Posting"}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FaTimes className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="jobTitle"
                className="block text-sm font-medium text-gray-700"
              >
                Job Title
              </label>
              <input
                id="jobTitle"
                type="text"
                value={formData.jobTitle}
                onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                placeholder="e.g. Frontend Developer"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                City
              </label>
              <input
                id="city"
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                placeholder="e.g. San Francisco"
                required={isLocationRequired}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Country
              </label>
              <input
                id="country"
                type="text"
                value={formData.country}
                onChange={(e) => handleInputChange("country", e.target.value)}
                placeholder="e.g. USA"
                required={isLocationRequired}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="workingType"
                className="block text-sm font-medium text-gray-700"
              >
                Working Type
              </label>
              <select
                id="workingType"
                value={formData.workingType}
                onChange={(e) =>
                  handleInputChange("workingType", e.target.value)
                }
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="ON_SITE">On-site</option>
                <option value="HYBRID">Hybrid</option>
                <option value="REMOTE">Remote</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="employmentType"
                className="block text-sm font-medium text-gray-700"
              >
                Employment Type
              </label>
              <select
                id="employmentType"
                value={formData.employmentType}
                onChange={(e) =>
                  handleInputChange("employmentType", e.target.value)
                }
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {Object.entries(EmploymentTypeLabels).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="requiredEnglishLevel"
                className="block text-sm font-medium text-gray-700"
              >
                Required English Level
              </label>
              <select
                id="requiredEnglishLevel"
                value={formData.requiredEnglishLevel}
                onChange={(e) =>
                  handleInputChange("requiredEnglishLevel", e.target.value)
                }
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {ENGLISH_LEVELS.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="minSalary"
                className="block text-sm font-medium text-gray-700"
              >
                Min Salary
              </label>
              <input
                id="minSalary"
                type="number"
                value={formData.minSalary}
                onChange={(e) => handleInputChange("minSalary", e.target.value)}
                placeholder="e.g. 80000"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="maxSalary"
                className="block text-sm font-medium text-gray-700"
              >
                Max Salary
              </label>
              <input
                id="maxSalary"
                type="number"
                value={formData.maxSalary}
                onChange={(e) => handleInputChange("maxSalary", e.target.value)}
                placeholder="e.g. 120000"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="requiredExperienceYears"
                className="block text-sm font-medium text-gray-700"
              >
                Required Experience (Years)
              </label>
              <input
                id="requiredExperienceYears"
                type="number"
                value={formData.requiredExperienceYears}
                onChange={(e) =>
                  handleInputChange("requiredExperienceYears", e.target.value)
                }
                placeholder="e.g. 2"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2 mt-8">
              <input
                id="closed"
                type="checkbox"
                checked={formData.closed}
                onChange={(e) => handleInputChange("closed", e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="closed"
                className="text-sm font-medium text-gray-700"
              >
                Closed
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="requiredSkills"
              className="block text-sm font-medium text-gray-700"
            >
              Required Skills <span className="text-red-500">*</span>
            </label>
            <input
              id="requiredSkills"
              type="text"
              value={formData.requiredSkills}
              onChange={handleSkillInput}
              placeholder="Type a skill and press comma (,) to add it"
              required={skills.length === 0}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-500">
              Add at least one skill by typing and pressing comma (,)
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="ml-2 text-blue-500 hover:text-blue-700"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="jobDescription"
              className="block text-sm font-medium text-gray-700"
            >
              Job Description
            </label>
            <textarea
              id="jobDescription"
              value={formData.jobDescription}
              onChange={(e) =>
                handleInputChange("jobDescription", e.target.value)
              }
              placeholder="Describe the role, responsibilities, and what you're looking for..."
              rows={4}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {editingJob ? "Update" : "Create"} Job Posting
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobPostingModal;
