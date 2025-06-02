import React, { useState, useEffect, useCallback } from "react";
import { FaPlus } from "react-icons/fa";
import EducationModal from "../userModals/EducationModal";
import EducationCard from "../EducationCard";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import ERROR_MESSAGES from "../../constants/ErrorMessages";

const EducationSection = () => {
  const [educations, setEducations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  const fetchEducations = useCallback(async () => {
    try {
      const response = await axiosPrivate.get(
        `/education/userEducations?userId=${auth.userId}`
      );
      setEducations(response.data);
    } catch (err) {
      const messageKey = err?.response?.data?.message;
      const toastMessage =
        ERROR_MESSAGES[messageKey] ||
        "Failed to load education details. Please try again later.";
      toast.error(toastMessage);
    }
  }, [axiosPrivate, auth.userId]);

  useEffect(() => {
    fetchEducations();
  }, [fetchEducations]);

  const handleAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = async (education) => {
    try {
      const response = await axiosPrivate.get(
        `/education/getEducation?educationId=${education.educationId}`
      );
      setEditingItem(response.data);
      setIsModalOpen(true);
    } catch (err) {
      const messageKey = err?.response?.data?.message;
      const toastMessage =
        ERROR_MESSAGES[messageKey] ||
        "Failed to load education details. Please try again later.";
      toast.error(toastMessage);
    }
  };

  const handleDelete = async (educationId) => {
    try {
      await axiosPrivate.delete(`/education?educationId=${educationId}`);
      setEducations(
        educations.filter((education) => education.educationId !== educationId)
      );
      toast.success("Education deleted successfully");
    } catch (err) {
      const messageKey = err?.response?.data?.message;
      const toastMessage =
        ERROR_MESSAGES[messageKey] ||
        "Failed to delete education. Please try again later.";
      toast.error(toastMessage);
    }
  };

  const handleSave = async (data) => {
    try {
      const educationData = {
        educationLevel: data.educationLevel,
        fieldOfStudy: data.fieldOfStudy,
        institution: data.institution,
        achievementsDescription: data.achievementsDescription,
        startedDate: data.startDate,
        graduationDate: data.graduationDate,
        userId: auth.userId,
        finished: data.finished,
      };

      // Remove empty fields
      Object.keys(educationData).forEach((key) => {
        if (!educationData[key]) {
          delete educationData[key];
        }
      });

      if (editingItem) {
        await axiosPrivate.put("/education/edit", {
          ...educationData,
          educationId: editingItem.educationId,
        });
        toast.success("Education updated successfully");
      } else {
        await axiosPrivate.post("/education/create", educationData);
        toast.success("Education created successfully");
      }

      fetchEducations();
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (err) {
      const messageKey = err?.response?.data?.message;
      const toastMessage =
        ERROR_MESSAGES[messageKey] ||
        (editingItem
          ? "Failed to update education"
          : "Failed to create education");
      toast.error(toastMessage);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between border-b pb-4 mb-4">
          <h2 className="text-xl font-semibold">Education</h2>
          <button
            type="button"
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm shadow"
            onClick={handleAdd}
          >
            <FaPlus className="h-4 w-4" />
            <span>Add Education</span>
          </button>
        </div>
        {educations.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No education added yet
          </p>
        ) : (
          <div className="space-y-4">
            {educations.map((education) => (
              <EducationCard
                key={education.educationId}
                education={education}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
      {isModalOpen && (
        <EducationModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          editingItem={editingItem}
        />
      )}
    </>
  );
};

export default EducationSection;
