import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const EnglishLanguageModal = ({ onClose, onSave, currentLanguages }) => {
  const [languages, setLanguages] = useState([]);
  const [formData, setFormData] = useState({
    proficiencyLevel: "A1",
  });

  const proficiencyLevels = ["A1", "A2", "B1", "B2", "C1", "C2"];

  useEffect(() => {
    setLanguages(currentLanguages || []);
  }, [currentLanguages]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveLanguage = () => {
    if (languages.length > 0) {
      toast.error(
        "You can only have one English proficiency level. Please delete the existing one first."
      );
      return;
    }

    onSave([
      {
        proficiencyLevel: formData.proficiencyLevel,
        id: Date.now(),
      },
    ]);
  };

  const handleDelete = (id) => {
    setLanguages(languages.filter((lang) => lang.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-6">English Proficiency</h2>
        <div className="space-y-4">
          {languages.map((lang) => (
            <div
              key={lang.id}
              className="flex justify-between items-center p-3 border rounded-lg"
            >
              <div>
                <p className="font-medium">English</p>
                <p className="text-sm text-gray-600">
                  Level {lang.proficiencyLevel}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(lang.id)}
                className="p-2 rounded hover:bg-red-100 text-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          ))}

          {languages.length === 0 && (
            <div className="border p-4 rounded-lg space-y-4">
              <div>
                <label
                  htmlFor="proficiencyLevel"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  English Proficiency Level
                </label>
                <select
                  id="proficiencyLevel"
                  name="proficiencyLevel"
                  value={formData.proficiencyLevel}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {proficiencyLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={handleSaveLanguage}
                  className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnglishLanguageModal;
