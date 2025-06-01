import React, { useState, useEffect, useCallback } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import EducationModal from "../userModals/EducationModal";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { EducationLevelLabels } from "../../constants/enumLabels";
import Spinner from "../Spinner";
import { toast, ToastContainer } from "react-toastify";
import ERROR_MESSAGES from "../../constants/ErrorMessages";
import "react-toastify/dist/ReactToastify.css";

// Custom hook for education operations
const useEducation = (userId) => {
  const axiosPrivate = useAxiosPrivate();
  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEducations = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const res = await axiosPrivate.get("/education/userEducations", {
        params: { userId },
      });
      setEducations(res.data || []);
    } catch (err) {
      const messageKey = err?.response?.data?.message;
      const toastMessage =
        ERROR_MESSAGES[messageKey] ||
        "Failed to load education records. Please try again later.";
      toast.error(toastMessage);
    } finally {
      setLoading(false);
    }
  }, [axiosPrivate, userId]);

  const saveEducation = async (data) => {
    try {
      if (data.educationId) {
        await axiosPrivate.put("/education/edit", {
          ...data,
          userId,
        });
        toast.success("Education record updated successfully.");
      } else {
        await axiosPrivate.post("/education/create", {
          ...data,
          userId,
        });
        toast.success("Education record added successfully.");
      }
      await fetchEducations();
      return true;
    } catch (err) {
      const messageKey = err?.response?.data?.message;
      const toastMessage =
        ERROR_MESSAGES[messageKey] ||
        "Failed to save education record. Please try again later.";
      toast.error(toastMessage);
      return false;
    }
  };

  const deleteEducation = async (educationId) => {
    try {
      await axiosPrivate.delete(`/education?educationId=${educationId}`);
      toast.success("Education record deleted successfully.");
      await fetchEducations();
      return true;
    } catch (err) {
      const messageKey = err?.response?.data?.message;
      const toastMessage =
        ERROR_MESSAGES[messageKey] ||
        "Failed to delete education record. Please try again later.";
      toast.error(toastMessage);
      return false;
    }
  };

  const getEducationDetails = async (educationId) => {
    try {
      const res = await axiosPrivate.get("/education/getEducation", {
        params: { educationId },
      });
      return res.data;
    } catch (err) {
      const messageKey = err?.response?.data?.message;
      const toastMessage =
        ERROR_MESSAGES[messageKey] ||
        "Failed to load education details. Please try again later.";
      toast.error(toastMessage);
      return null;
    }
  };

  useEffect(() => {
    fetchEducations();
  }, [fetchEducations]);

  return {
    educations,
    loading,
    saveEducation,
    deleteEducation,
    getEducationDetails,
    refreshEducations: fetchEducations,
  };
};

// Education Card Component
const EducationCard = React.memo(({ education, onEdit, onDelete }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold">
            {EducationLevelLabels[education.educationLevel] ||
              education.educationLevel}
          </h3>
          <p className="text-gray-600">{education.institution}</p>
          <p className="text-sm text-gray-500">
            {formatDate(education.startedDate)} -{" "}
            {education.finished
              ? formatDate(education.graduationDate)
              : "Present"}
          </p>
          <p className="text-sm text-gray-500 mt-1">{education.fieldOfStudy}</p>
          {education.achievementsDescription && (
            <p className="mt-2 text-gray-700 line-clamp-3">
              {education.achievementsDescription}
            </p>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            type="button"
            className="p-2 rounded hover:bg-gray-100 transition-colors"
            aria-label="Edit Education"
            onClick={() => onEdit(education)}
          >
            <FaEdit className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="p-2 rounded hover:bg-red-100 text-red-600 transition-colors"
            aria-label="Delete Education"
            onClick={() => onDelete(education.educationId)}
          >
            <FaTrash className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
});

EducationCard.displayName = "EducationCard";

const EducationSection = () => {
  const { auth } = useAuth();
  const userId = auth?.userId;
  const {
    educations,
    loading,
    saveEducation,
    deleteEducation,
    getEducationDetails,
  } = useEducation(userId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  const handleAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = async (item) => {
    try {
      setModalLoading(true);
      const details = await getEducationDetails(item.educationId);
      if (details) {
        setEditingItem(details);
        setIsModalOpen(true);
      }
    } finally {
      setModalLoading(false);
    }
  };

  const handleSave = async (data) => {
    setModalLoading(true);
    try {
      const success = await saveEducation(data);
      if (success) {
        setIsModalOpen(false);
        setEditingItem(null);
      }
    } finally {
      setModalLoading(false);
    }
  };

  const handleDelete = async (educationId) => {
    await deleteEducation(educationId);
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
        {loading ? (
          <Spinner loading={loading} />
        ) : educations.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No education added yet
          </p>
        ) : (
          <div className="space-y-4">
            {educations.map((edu) => (
              <EducationCard
                key={edu.educationId}
                education={edu}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
      {isModalOpen && (
        <EducationModal
          onClose={() => {
            setIsModalOpen(false);
            setEditingItem(null);
          }}
          onSave={handleSave}
          editingItem={editingItem}
          loading={modalLoading}
        />
      )}
      <ToastContainer />
    </>
  );
};

export default EducationSection;
