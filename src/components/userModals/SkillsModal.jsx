import React, { useState, useEffect } from "react";

const SkillsModal = ({ onClose, onSave, skill, loading }) => {
  const [newSkill, setNewSkill] = useState({
    skillName: "",
    skillProficiency: 1,
  });

  const proficiencyOptions = [
    { value: 1, label: "1 - Beginner" },
    { value: 2, label: "2 - Novice" },
    { value: 3, label: "3 - Intermediate" },
    { value: 4, label: "4 - Advanced" },
    { value: 5, label: "5 - Expert" },
    { value: 6, label: "6 - Master" },
  ];

  useEffect(() => {
    if (skill) {
      // If editing a single skill
      setNewSkill({
        skillName: skill.skillName,
        skillProficiency: skill.skillProficiency,
      });
    } else {
      // If adding a new skill
      setNewSkill({
        skillName: "",
        skillProficiency: 1,
      });
    }
  }, [skill]);

  const handleAddSkill = () => {
    if (newSkill.skillName.trim()) {
      onSave({
        skillName: newSkill.skillName.trim(),
        skillProficiency: newSkill.skillProficiency,
        skillId: skill?.skillId, // Include skillId if editing
      });
    }
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
        <h2 className="text-2xl font-bold mb-6">
          {skill ? "Edit Skill" : "Add New Skill"}
        </h2>
        <div className="space-y-4">
          <div className="border p-4 rounded-lg space-y-4">
            <div>
              <label
                htmlFor="skill-name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Skill Name
              </label>
              <input
                id="skill-name"
                value={newSkill.skillName}
                onChange={(e) =>
                  setNewSkill({ ...newSkill, skillName: e.target.value })
                }
                placeholder="e.g., JavaScript"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="skill-proficiency"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Proficiency Level
              </label>
              <select
                id="skill-proficiency"
                value={newSkill.skillProficiency}
                onChange={(e) =>
                  setNewSkill({
                    ...newSkill,
                    skillProficiency: parseInt(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {proficiencyOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition-colors"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleAddSkill}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:bg-blue-400"
            disabled={loading}
          >
            {loading ? "Saving..." : skill ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillsModal;
