import React, { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import EnglishLanguageModal from "../userModals/EnglishLanguageModal";

const EnglishLanguageSection = () => {
  const [languages, setLanguages] = useState([
    { id: 1, language: "English", proficiency: "Native" },
    { id: 2, language: "Spanish", proficiency: "Intermediate" },
    { id: 3, language: "French", proficiency: "Beginner" },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setLanguages(languages.filter((lang) => lang.id !== id));
  };

  const handleSave = (newLanguages) => {
    setLanguages(newLanguages);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between border-b pb-4 mb-4">
          <h2 className="text-xl font-semibold">English Proficiency</h2>
          <button
            type="button"
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm shadow"
            onClick={handleAdd}
          >
            <FaPlus className="h-4 w-4" />
            <span>Add Language</span>
          </button>
        </div>
        {languages.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No languages added yet
          </p>
        ) : (
          <div className="space-y-3">
            {languages.map((lang) => (
              <div
                key={lang.id}
                className="flex items-center justify-between border rounded-lg p-3"
              >
                <div>
                  <span className="font-medium">{lang.language}</span>
                  <span className="ml-2 border border-blue-300 text-blue-700 bg-blue-50 px-2 py-1 rounded-full text-xs">
                    {lang.proficiency}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    className="p-2 rounded hover:bg-red-100 text-red-600 transition-colors"
                    aria-label="Delete Language"
                    onClick={() => handleDelete(lang.id)}
                  >
                    <FaTrash className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {isModalOpen && (
        <EnglishLanguageModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          currentLanguages={languages}
        />
      )}
    </>
  );
};

export default EnglishLanguageSection;
