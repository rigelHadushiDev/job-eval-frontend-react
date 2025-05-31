import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEdit, FaSave, FaTimes } from "react-icons/fa";

const PersonalDetails = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [originalData, setOriginalData] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    bio: "Software engineer with 5+ years of experience in web development.",
    linkedIn: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    website: "https://johndoe.com",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setOriginalData(formData);
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Saved personal details:", formData);
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-5xl mx-auto relative mt-32">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <button
              onClick={() => navigate("/")}
              className="text-blue-600 hover:text-blue-800 text-lg font-semibold flex items-center"
            >
              <FaArrowLeft className="mr-2" />
              <span className="text-xl">Personal Details</span>
            </button>
          </div>

          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 flex items-center gap-2"
            >
              <FaEdit /> Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center gap-2"
              >
                <FaSave /> Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-100 text-black px-4 py-2 rounded-md hover:bg-gray-200 flex items-center gap-2"
              >
                <FaTimes /> Cancel
              </button>
            </div>
          )}
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow px-6 py-8 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {["firstName", "lastName", "email", "phone", "location"].map(
                (field) => (
                  <div key={field}>
                    <label
                      className="block text-sm font-semibold mb-1"
                      htmlFor={field}
                    >
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      id={field}
                      name={field}
                      type={field === "email" ? "email" : "text"}
                      value={formData[field]}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-100"
                    />
                  </div>
                )
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label
                  className="block text-sm font-semibold mb-1"
                  htmlFor="bio"
                >
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  value={formData.bio}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-100"
                />
              </div>

              {["linkedIn", "github", "website"].map((field) => (
                <div key={field}>
                  <label
                    htmlFor={field}
                    className="block text-sm font-semibold mb-1"
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-100"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
