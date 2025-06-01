import React, { useState, useEffect, useCallback } from "react";
import { IoAdd, IoPencil, IoTrash } from "react-icons/io5";
import SkillsModal from "../userModals/SkillsModal";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import ERROR_MESSAGES from "../../constants/ErrorMessages";

const SkillsSection = () => {
  const [skills, setSkills] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  const fetchSkills = useCallback(async () => {
    try {
      const response = await axiosPrivate.get(
        `/skill/userSkills?userId=${auth.userId}`
      );
      setSkills(response.data);
    } catch (error) {
      const messageKey = error?.response?.data?.message;
      const toastMessage =
        ERROR_MESSAGES[messageKey] ||
        "Failed to get your skills. Please try again later.";
      toast.error(toastMessage);
    }
  }, [auth.userId, axiosPrivate]);

  useEffect(() => {
    if (auth?.userId) {
      fetchSkills();
    }
  }, [auth?.userId, fetchSkills]);

  const handleAdd = () => {
    setSelectedSkill(null);
    setIsModalOpen(true);
  };

  const handleEdit = async (skillId) => {
    try {
      const response = await axiosPrivate.get(
        `/skill/getSkill?skillId=${skillId}`
      );
      setSelectedSkill(response.data);
      setIsModalOpen(true);
    } catch (error) {
      const messageKey = error?.response?.data?.message;
      const toastMessage =
        ERROR_MESSAGES[messageKey] ||
        "Failed to get the selected skill. Please try again later.";
      toast.error(toastMessage);
    }
  };

  const handleDelete = async (skillId) => {
    try {
      await axiosPrivate.delete(`/skill?skillId=${skillId}`);
      toast.success("Skill deleted successfully");
      fetchSkills();
    } catch (error) {
      const messageKey = error?.response?.data?.message;
      const toastMessage =
        ERROR_MESSAGES[messageKey] ||
        "Failed to delete the selected skill. Please try again later.";
      toast.error(toastMessage);
    }
  };

  const handleSave = async (skillData) => {
    try {
      if (selectedSkill) {
        // Edit existing skill
        await axiosPrivate.put("/skill/edit", {
          ...skillData,
          userId: auth.userId,
        });
        toast.success("Skill updated successfully");
      } else {
        await axiosPrivate.post("/skill/create", {
          ...skillData,
          userId: auth.userId,
        });
        toast.success("Skill added successfully");
      }
      setIsModalOpen(false);
      fetchSkills();
    } catch (error) {
      const messageKey = error?.response?.data?.message;
      const toastMessage =
        ERROR_MESSAGES[messageKey] ||
        "Failed to update the selected skill. Please try again later.";
      toast.error(toastMessage);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Skills</h2>
            <button
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              onClick={handleAdd}
            >
              <IoAdd className="h-4 w-4" />
              <span>Add Skill</span>
            </button>
          </div>
        </div>
        <div className="p-6">
          {skills.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No skills added yet
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <div
                  key={skill.skillId}
                  className="flex items-center space-x-1 px-3 py-1 bg-gray-100 rounded-full"
                >
                  <span>{skill.skillName}</span>
                  <div className="flex items-center space-x-1">
                    <button
                      className="text-gray-500 hover:text-blue-600"
                      onClick={() => handleEdit(skill.skillId)}
                    >
                      <IoPencil className="h-4 w-4" />
                    </button>
                    <button
                      className="text-gray-500 hover:text-red-600"
                      onClick={() => handleDelete(skill.skillId)}
                    >
                      <IoTrash className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <SkillsModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          skill={selectedSkill}
        />
      )}
    </>
  );
};

export default SkillsSection;
