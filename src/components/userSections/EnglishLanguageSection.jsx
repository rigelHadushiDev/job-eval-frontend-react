import React, { useState, useEffect, useCallback } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import EnglishLanguageModal from "../userModals/EnglishLanguageModal";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import ERROR_MESSAGES from "../../constants/ErrorMessages";

const EnglishLanguageSection = () => {
  const [language, setLanguage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  const fetchLanguage = useCallback(async () => {
    try {
      const response = await axiosPrivate.get(
        `/applicantEnglishLevel/getApplicantEnglishLevel?userId=${auth.userId}`
      );
      setLanguage(response.data);
    } catch (error) {
      const messageKey = error?.response?.data?.message;
      const toastMessage =
        ERROR_MESSAGES[messageKey] ||
        "Failed to get your English proficiency level. Please try again later.";
      toast.error(toastMessage);
    }
  }, [auth.userId, axiosPrivate]);

  useEffect(() => {
    if (auth?.userId) {
      fetchLanguage();
    }
  }, [auth?.userId, fetchLanguage]);

  const handleAdd = () => {
    if (language) {
      toast.error(
        "You can only have one English proficiency level. Please delete the existing one first."
      );
      return;
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axiosPrivate.delete(
        `/applicantEnglishLevel?applicantEnglishLevelId=${id}`
      );
      toast.success("English proficiency level deleted successfully");
      setLanguage(null);
    } catch (error) {
      const messageKey = error?.response?.data?.message;
      const toastMessage =
        ERROR_MESSAGES[messageKey] ||
        "Failed to delete English proficiency level. Please try again later.";
      toast.error(toastMessage);
    }
  };

  const handleSave = async (newLanguages) => {
    try {
      if (newLanguages.length > 0) {
        const response = await axiosPrivate.post(
          "/applicantEnglishLevel/create",
          {
            proficiencyLevel: newLanguages[0].proficiencyLevel,
            userId: auth.userId,
          }
        );
        setLanguage(response.data);
        toast.success("English proficiency level added successfully");
      }
      setIsModalOpen(false);
    } catch (error) {
      const messageKey = error?.response?.data?.message;
      const toastMessage =
        ERROR_MESSAGES[messageKey] ||
        "Failed to save English proficiency level. Please try again later.";
      toast.error(toastMessage);
    }
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
            <span>Add Proficiency</span>
          </button>
        </div>
        {!language ? (
          <p className="text-gray-500 text-center py-8">
            No English proficiency level added yet
          </p>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between border rounded-lg p-3">
              <div>
                <span className="font-medium">English</span>
                <span className="ml-2 border border-blue-300 text-blue-700 bg-blue-50 px-2 py-1 rounded-full text-xs">
                  Level {language.proficiencyLevel}
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  type="button"
                  className="p-2 rounded hover:bg-red-100 text-red-600 transition-colors"
                  aria-label="Delete Language"
                  onClick={() => handleDelete(language.applicantEnglishLevelId)}
                >
                  <FaTrash className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {isModalOpen && (
        <EnglishLanguageModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          currentLanguages={language ? [language] : []}
        />
      )}
    </>
  );
};

export default EnglishLanguageSection;
