import React, { useState, useEffect, useCallback } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";
import WorkExperienceModal from "../userModals/WorkExperienceModal";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import Spinner from "../Spinner";
import { toast } from "react-toastify";
import ERROR_MESSAGES from "../../constants/ErrorMessages";
import WorkExperienceCard from "../WorkExperienceCard";

const useWorkExperience = (userId) => {
  const axiosPrivate = useAxiosPrivate();
  const [workExperiences, setWorkExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchExperiences = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const res = await axiosPrivate.get("/workExp/userWorkExperiences", {
        params: { userId },
      });
      setWorkExperiences(res.data || []);
    } catch (err) {
      const messageKey = err?.response?.data?.message;
      const toastMessage =
        ERROR_MESSAGES[messageKey] ||
        "Failed to load work experiences. Please try again later.";
      toast.error(toastMessage);
    } finally {
      setLoading(false);
    }
  }, [axiosPrivate, userId]);

  const saveExperience = async (data) => {
    try {
      if (data.workExperienceId) {
        await axiosPrivate.put("/workExp/edit", data);
        toast.success("Work experience updated successfully.");
      } else {
        await axiosPrivate.post("/workExp/create", {
          ...data,
          userId,
        });
        toast.success("Work experience added successfully.");
      }
      await fetchExperiences();
      return true;
    } catch (err) {
      const messageKey = err?.response?.data?.message;
      const toastMessage =
        ERROR_MESSAGES[messageKey] ||
        "Failed to save work experience. Please try again later.";
      toast.error(toastMessage);
      return false;
    }
  };

  const deleteExperience = async (workExperienceId) => {
    try {
      await axiosPrivate.delete(
        `/workExp?workExperienceId=${workExperienceId}`
      );
      toast.success("Work experience deleted successfully.");
      await fetchExperiences();
      return true;
    } catch (err) {
      const messageKey = err?.response?.data?.message;
      const toastMessage =
        ERROR_MESSAGES[messageKey] ||
        "Failed to delete work experience. Please try again later.";
      toast.error(toastMessage);
      return false;
    }
  };

  const getExperienceDetails = async (workExperienceId) => {
    try {
      const res = await axiosPrivate.get("/workExp/getWorkExperience", {
        params: { workExperienceId },
      });
      return res.data;
    } catch (err) {
      const messageKey = err?.response?.data?.message;
      const toastMessage =
        ERROR_MESSAGES[messageKey] ||
        "Failed to load work experience details. Please try again later.";
      toast.error(toastMessage);
      return null;
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  return {
    workExperiences,
    loading,
    saveExperience,
    deleteExperience,
    getExperienceDetails,
    refreshExperiences: fetchExperiences,
  };
};

const WorkExperienceSection = () => {
  const { auth } = useAuth();
  const userId = auth?.userId;
  const {
    workExperiences,
    loading,
    saveExperience,
    deleteExperience,
    getExperienceDetails,
  } = useWorkExperience(userId);

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
      const details = await getExperienceDetails(item.workExperienceId);
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
      const success = await saveExperience(data);
      if (success) {
        setIsModalOpen(false);
        setEditingItem(null);
      }
    } finally {
      setModalLoading(false);
    }
  };

  const handleDelete = async (workExperienceId) => {
    await deleteExperience(workExperienceId);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between border-b pb-4 mb-4">
          <h2 className="text-xl font-semibold">Work Experience</h2>
          <button
            type="button"
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm shadow"
            onClick={handleAdd}
          >
            <FaPlus className="h-4 w-4" />
            <span>Add Experience</span>
          </button>
        </div>
        {loading ? (
          <Spinner loading={loading} />
        ) : workExperiences.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No work experience added yet
          </p>
        ) : (
          <div className="space-y-4">
            {workExperiences.map((exp) => (
              <WorkExperienceCard
                key={exp.workExperienceId}
                experience={exp}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
      {isModalOpen && (
        <WorkExperienceModal
          onClose={() => {
            setIsModalOpen(false);
            setEditingItem(null);
          }}
          onSave={handleSave}
          editingItem={editingItem}
          loading={modalLoading}
        />
      )}
    </>
  );
};

export default WorkExperienceSection;
