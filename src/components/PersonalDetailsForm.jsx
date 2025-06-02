import React from "react";
import {
  FaArrowLeft,
  FaEdit,
  FaSave,
  FaTimes,
  FaCalendar,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { GenderLabels, UserTypeLabels } from "../constants/enumLabels";

const PersonalDetailsForm = ({
  formData,
  isEditing,
  onEdit,
  onCancel,
  onSave,
  onChange,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-9 mt-32">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            <FaArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Personal Details</h1>
        </div>
        {!isEditing ? (
          <button
            onClick={onEdit}
            className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors shadow-md"
          >
            <FaEdit className="h-5 w-5" />
            <span className="font-medium">Edit</span>
          </button>
        ) : (
          <div className="flex space-x-3">
            <button
              onClick={onSave}
              className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors shadow-md"
            >
              <FaSave className="h-5 w-5" />
              <span className="font-medium">Save</span>
            </button>
            <button
              onClick={onCancel}
              className="flex items-center space-x-2 border border-gray-300 px-6 py-3 rounded-md hover:bg-gray-50 transition-colors shadow-sm"
            >
              <FaTimes className="h-5 w-5" />
              <span className="font-medium">Cancel</span>
            </button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="firstname"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              First Name *
            </label>
            <input
              id="firstname"
              name="firstname"
              value={formData.firstname || ""}
              onChange={onChange}
              disabled={!isEditing}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>
          <div>
            <label
              htmlFor="lastname"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Last Name *
            </label>
            <input
              id="lastname"
              name="lastname"
              value={formData.lastname || ""}
              onChange={onChange}
              disabled={!isEditing}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username *
            </label>
            <input
              id="username"
              name="username"
              value={formData.username || ""}
              onChange={onChange}
              disabled={!isEditing}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email || ""}
              onChange={onChange}
              disabled={true}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
            />
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Gender *
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender || ""}
              onChange={onChange}
              disabled={!isEditing}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            >
              {Object.entries(GenderLabels).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="birthdate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Birth Date *
            </label>
            <div className="relative">
              <input
                id="birthdate"
                name="birthdate"
                type="date"
                value={
                  formData.birthdate ? formData.birthdate.slice(0, 10) : ""
                }
                onChange={onChange}
                disabled={!isEditing}
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
              <FaCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div>
            <label
              htmlFor="mobileNumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Mobile Number
            </label>
            <input
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber || ""}
              onChange={onChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Role
            </label>
            <input
              id="role"
              name="role"
              value={UserTypeLabels[formData.role] || ""}
              disabled={true}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
