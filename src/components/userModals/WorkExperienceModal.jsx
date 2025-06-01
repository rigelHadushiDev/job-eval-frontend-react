import React, { useState, useEffect } from "react";
import { EmploymentTypeLabels } from "../../constants/enumLabels";
import { toast } from "react-toastify";

const WorkExperienceModal = ({ onClose, onSave, editingItem, loading }) => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    employmentType: "FULL_TIME",
    startDate: "",
    endDate: "",
    description: "",
    current: false,
  });

  // Convert YYYY-MM to dd/MM/yyyy format for API
  const formatDateForAPI = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return `01/${month}/${year}`;
  };

  // Convert dd/MM/yyyy to YYYY-MM format for input
  const formatDateForInput = (dateStr) => {
    if (!dateStr) return "";
    const [, month, year] = dateStr.split("/");
    return `${year}-${month}`;
  };

  // Get current date in YYYY-MM format
  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
  };

  useEffect(() => {
    if (editingItem) {
      setFormData({
        ...editingItem,
        startDate: editingItem.startDate
          ? formatDateForInput(editingItem.startDate)
          : "",
        endDate: editingItem.endDate
          ? formatDateForInput(editingItem.endDate)
          : "",
        current:
          editingItem.finished === undefined ? false : !editingItem.finished,
      });
    }
  }, [editingItem]);

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    if (e.target.name === "current" && value) {
      setFormData((prev) => ({
        ...prev,
        current: true,
        endDate: "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.jobTitle ||
      !formData.companyName ||
      !formData.startDate ||
      !formData.description ||
      (!formData.current && !formData.endDate)
    ) {
      return;
    }

    const currentDate = getCurrentDate();
    if (formData.startDate > currentDate) {
      toast.error("Start date cannot be in the future");
      return;
    }
    if (formData.endDate && formData.endDate > currentDate) {
      toast.error("End date cannot be in the future");
      return;
    }
    if (formData.endDate && formData.startDate > formData.endDate) {
      toast.error("End date cannot be before start date");
      return;
    }

    const dataToSend = {
      ...formData,
      startDate: formatDateForAPI(formData.startDate),
      endDate: formData.endDate ? formatDateForAPI(formData.endDate) : "",
      finished: !formData.current,
    };

    onSave(dataToSend);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-6">
          {editingItem ? "Edit Work Experience" : "Add Work Experience"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="jobTitle"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Job Title *
              </label>
              <input
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="companyName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Company Name *
              </label>
              <input
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="employmentType"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Employment Type *
            </label>
            <select
              id="employmentType"
              name="employmentType"
              value={formData.employmentType}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.entries(EmploymentTypeLabels).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Start Date *
              </label>
              <input
                id="startDate"
                name="startDate"
                type="month"
                value={formData.startDate}
                onChange={handleChange}
                max={getCurrentDate()}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="endDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                End Date {!formData.current && "*"}
              </label>
              <input
                id="endDate"
                name="endDate"
                type="month"
                value={formData.endDate}
                onChange={handleChange}
                max={getCurrentDate()}
                disabled={formData.current}
                required={!formData.current}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="current"
              name="current"
              checked={formData.current}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="current" className="text-sm text-gray-700">
              I am currently working at this job
            </label>
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe your responsibilities and achievements..."
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:bg-blue-400"
              disabled={loading}
            >
              {loading ? "Saving..." : editingItem ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkExperienceModal;
