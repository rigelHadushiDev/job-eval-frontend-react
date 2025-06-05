import React, { useEffect, useState } from "react";
import PersonalDetailsForm from "../components/PersonalDetailsForm";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../components/Spinner";
import ERROR_MESSAGES from "../constants/ErrorMessages";

function formatDateToDDMMYYYY(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function ddmmyyyyToInput(dateStr) {
  if (!dateStr) return "";
  const [day, month, year] = dateStr.split("/");
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

const PersonalDetailsPage = ({ isUser }) => {
  const axiosPrivate = useAxiosPrivate();
  const [formData, setFormData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await axiosPrivate.get("/user/currentUser");
        setFormData({
          ...response.data,
          birthdate: ddmmyyyyToInput(response.data.birthdate),
        });
      } catch (err) {
        const messageKey = err?.response?.data?.message;
        const toastMessage =
          ERROR_MESSAGES[messageKey] ||
          "We couldn't load your personal details. Please try again later.";
        toast.error(toastMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [axiosPrivate]);

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const dataToSend = {
        ...formData,
        birthdate: formatDateToDDMMYYYY(formData.birthdate),
      };
      const response = await axiosPrivate.patch("/user", dataToSend);
      setFormData({
        ...response.data,
        birthdate: ddmmyyyyToInput(response.data.birthdate),
      });
      setIsEditing(false);
      toast.success("Your changes have been saved successfully.");
    } catch (err) {
      const messageKey = err?.response?.data?.message;
      const toastMessage =
        ERROR_MESSAGES[messageKey] ||
        "We couldn't save your changes. Please try again.";
      toast.error(toastMessage);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto p-6">
          {loading ? (
            <Spinner loading={loading} />
          ) : formData ? (
            <PersonalDetailsForm
              formData={formData}
              isEditing={isEditing}
              onEdit={handleEdit}
              onCancel={handleCancel}
              onSave={handleSave}
              onChange={handleChange}
              isUser={isUser}
            />
          ) : null}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default PersonalDetailsPage;
