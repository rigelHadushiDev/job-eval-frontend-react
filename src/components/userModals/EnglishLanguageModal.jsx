import React, { useState, useEffect } from "react";

const EnglishLanguageModal = ({ onClose, onSave, currentLanguages }) => {
  const [languages, setLanguages] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    language: "",
    proficiency: "Beginner",
  });

  const proficiencyLevels = ["Beginner", "Intermediate", "Advanced", "Native"];

  useEffect(() => {
    setLanguages(currentLanguages);
  }, [currentLanguages]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = () => {
    setIsAdding(true);
  };

  const handleSaveLanguage = () => {
    if (formData.language.trim()) {
      setLanguages([...languages, { ...formData, id: Date.now() }]);
      setFormData({
        language: "",
        proficiency: "Beginner",
      });
      setIsAdding(false);
    }
  };

  const handleDelete = (id) => {
    setLanguages(languages.filter((lang) => lang.id !== id));
  };

  const handleSave = () => {
    onSave(languages);
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
        <h2 className="text-2xl font-bold mb-6">Manage Languages</h2>
        <div className="space-y-4">
          {languages.map((lang) => (
            <div
              key={lang.id}
              className="flex justify-between items-center p-3 border rounded-lg"
            >
              <div>
                <p className="font-medium">{lang.language}</p>
                <p className="text-sm text-gray-600">{lang.proficiency}</p>
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

          {isAdding && (
            <div className="border p-4 rounded-lg space-y-4">
              <div>
                <label
                  htmlFor="language"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Language
                </label>
                <input
                  id="language"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="proficiency"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Proficiency Level
                </label>
                <select
                  id="proficiency"
                  name="proficiency"
                  value={formData.proficiency}
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
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {!isAdding && (
            <button
              type="button"
              onClick={handleAdd}
              className="w-full px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Add Language
            </button>
          )}
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnglishLanguageModal;
