import React, { useState, useEffect } from "react";
import { EducationLevelLabels } from "../../constants/enumLabels";

const EducationModal = ({ onClose, onSave, editingItem, loading }) => {
  const [formData, setFormData] = useState({
    institution: "",
    educationLevel: "",
    fieldOfStudy: "",
    startDate: "",
    graduationDate: "",
    achievementsDescription: "",
    finished: false,
  });

  // Get current date in YYYY-MM format
  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
  };

  // Convert dd/MM/yyyy to YYYY-MM format for input
  const formatDateForInput = (dateStr) => {
    if (!dateStr) return "";
    const [, month, year] = dateStr.split("/");
    return `${year}-${month}`;
  };

  // Convert YYYY-MM to dd/MM/yyyy format for API
  const formatDateForAPI = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return `01/${month}/${year}`;
  };

  useEffect(() => {
    if (editingItem) {
      setFormData({
        ...editingItem,
        startDate: editingItem.startedDate
          ? formatDateForInput(editingItem.startedDate)
          : "",
        graduationDate: editingItem.graduationDate
          ? formatDateForInput(editingItem.graduationDate)
          : "",
        finished: editingItem.finished ?? false,
      });
    }
  }, [editingItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle graduation date changes
    if (name === "graduationDate") {
      const currentDate = getCurrentDate();
      const isFutureDate = value > currentDate;

      setFormData((prev) => ({
        ...prev,
        [name]: value,
        finished: !isFutureDate,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate start date is not in future
    const currentDate = getCurrentDate();
    if (formData.startDate > currentDate) {
      alert("Start date cannot be in the future");
      return;
    }

    // Convert dates to dd/MM/yyyy format before sending
    const dataToSend = {
      ...formData,
      startDate: formatDateForAPI(formData.startDate),
      graduationDate: formatDateForAPI(formData.graduationDate),
      startedDate: formatDateForAPI(formData.startDate),
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
          {editingItem ? "Edit Education" : "Add Education"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="institution"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Institution *
            </label>
            <input
              id="institution"
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="educationLevel"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Education Level *
              </label>
              <select
                id="educationLevel"
                name="educationLevel"
                value={formData.educationLevel}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Education Level</option>
                {Object.entries(EducationLevelLabels).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="fieldOfStudy"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Field of Study *
              </label>
              <input
                id="fieldOfStudy"
                name="fieldOfStudy"
                value={formData.fieldOfStudy}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
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
                htmlFor="graduationDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Graduation Date *
              </label>
              <input
                id="graduationDate"
                name="graduationDate"
                type="month"
                value={formData.graduationDate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="achievementsDescription"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Achievements & Activities (optional)
            </label>
            <textarea
              id="achievementsDescription"
              name="achievementsDescription"
              value={formData.achievementsDescription}
              onChange={handleChange}
              className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Activities, societies, achievements..."
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

export default EducationModal;
