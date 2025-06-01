import React, { useState, useEffect } from "react";

const SkillsModal = ({ onClose, onSave, currentSkills, loading }) => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({
    skillName: "",
    skillProficiency: 1,
  });
  const [isAdding, setIsAdding] = useState(false);

  const proficiencyOptions = [
    { value: 1, label: "1 - Beginner" },
    { value: 2, label: "2 - Novice" },
    { value: 3, label: "3 - Intermediate" },
    { value: 4, label: "4 - Advanced" },
    { value: 5, label: "5 - Expert" },
    { value: 6, label: "6 - Master" },
  ];

  useEffect(() => {
    setSkills(currentSkills);
  }, [currentSkills]);

  const handleAddSkill = () => {
    if (
      newSkill.skillName.trim() &&
      !skills.some(
        (skill) =>
          skill.skillName.toLowerCase() === newSkill.skillName.toLowerCase()
      )
    ) {
      setSkills([
        ...skills,
        {
          skillId: Date.now(),
          skillName: newSkill.skillName.trim(),
          skillProficiency: newSkill.skillProficiency,
        },
      ]);
      setNewSkill({ skillName: "", skillProficiency: 1 });
      setIsAdding(false);
    }
  };

  const handleDeleteSkill = (skillId) => {
    setSkills(skills.filter((skill) => skill.skillId !== skillId));
  };

  const handleSave = () => {
    onSave(skills);
  };

  const getProficiencyColor = (level) => {
    const colors = {
      1: "bg-red-100 text-red-800",
      2: "bg-orange-100 text-orange-800",
      3: "bg-yellow-100 text-yellow-800",
      4: "bg-blue-100 text-blue-800",
      5: "bg-green-100 text-green-800",
      6: "bg-purple-100 text-purple-800",
    };
    return colors[level] || "bg-gray-100 text-gray-800";
  };

  const getProficiencyLabel = (level) => {
    const labels = {
      1: "Beginner",
      2: "Novice",
      3: "Intermediate",
      4: "Advanced",
      5: "Expert",
      6: "Master",
    };
    return labels[level] || "Unknown";
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
        <h2 className="text-2xl font-bold mb-6">Manage Skills</h2>
        <div className="space-y-4">
          {isAdding && (
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
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  Add
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

          <div className="space-y-2 max-h-48 overflow-y-auto">
            {skills.map((skill) => (
              <div
                key={skill.skillId}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <span className="font-medium">{skill.skillName}</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${getProficiencyColor(
                      skill.skillProficiency
                    )}`}
                  >
                    {skill.skillProficiency}/6 -{" "}
                    {getProficiencyLabel(skill.skillProficiency)}
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteSkill(skill.skillId)}
                  className="text-red-600 hover:text-red-800"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {skills.length === 0 && !isAdding && (
            <p className="text-gray-500 text-center py-4">
              No skills added yet
            </p>
          )}

          {!isAdding && (
            <button
              type="button"
              onClick={() => setIsAdding(true)}
              className="w-full px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Add Skill
            </button>
          )}
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
            onClick={handleSave}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:bg-blue-400"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillsModal;
