import React, { useState, useEffect } from "react";

const ProjectsModal = ({ onClose, onSave, editingItem }) => {
  const [formData, setFormData] = useState({
    projectTitle: "",
    description: "",
    technologiesOrTools: "",
    startDate: "",
    endDate: "",
    link: "",
    current: false,
    finished: true,
  });

  useEffect(() => {
    if (editingItem) {
      // Convert dates from dd/MM/yyyy to YYYY-MM format for input
      const formattedItem = {
        ...editingItem,
        current: !editingItem.finished,
        finished: editingItem.finished,
        startDate: editingItem.startDate
          ? formatDateForInput(editingItem.startDate)
          : "",
        endDate: editingItem.endDate
          ? formatDateForInput(editingItem.endDate)
          : "",
      };
      setFormData(formattedItem);
    } else {
      // Reset form when adding new project
      setFormData({
        projectTitle: "",
        description: "",
        technologiesOrTools: "",
        startDate: "",
        endDate: "",
        link: "",
        current: false,
        finished: true,
      });
    }
  }, [editingItem]);

  const formatDateForInput = (dateStr) => {
    if (!dateStr) return "";
    try {
      // Convert from dd/MM/yyyy to YYYY-MM for input
      const [day, month, year] = dateStr.split("/");
      if (!day || !month || !year) return "";
      return `${year}-${month.padStart(2, "0")}`;
    } catch {
      return "";
    }
  };

  const formatDateForBackend = (dateStr) => {
    if (!dateStr) return "";
    try {
      // Convert from YYYY-MM to dd/MM/yyyy for API
      const [year, month] = dateStr.split("-");
      if (!year || !month) return "";
      return `01/${month}/${year}`;
    } catch {
      return "";
    }
  };

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    if (e.target.name === "current") {
      setFormData((prev) => ({
        ...prev,
        current: value,
        finished: !value,
        endDate: value ? "" : prev.endDate,
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
    const dataToSubmit = {
      ...formData,
      startDate: formatDateForBackend(formData.startDate),
      endDate: formData.finished ? formatDateForBackend(formData.endDate) : "",
    };
    onSave(dataToSubmit);
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
          {editingItem ? "Edit Project" : "Add Project"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="projectTitle"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Project Title
            </label>
            <input
              id="projectTitle"
              name="projectTitle"
              value={formData.projectTitle}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe your project..."
            />
          </div>
          <div>
            <label
              htmlFor="technologiesOrTools"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Technologies Used
            </label>
            <input
              id="technologiesOrTools"
              name="technologiesOrTools"
              value={formData.technologiesOrTools}
              onChange={handleChange}
              placeholder="React, Node.js, MongoDB..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Start Date
              </label>
              <input
                id="startDate"
                name="startDate"
                type="month"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="endDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                End Date
              </label>
              <input
                id="endDate"
                name="endDate"
                type="month"
                value={formData.endDate}
                onChange={handleChange}
                disabled={!formData.finished}
                required={formData.finished}
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
              Currently Working
            </label>
          </div>
          <div>
            <label
              htmlFor="link"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Project Link (optional)
            </label>
            <input
              id="link"
              name="link"
              type="url"
              value={formData.link}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              {editingItem ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectsModal;
