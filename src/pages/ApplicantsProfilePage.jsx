import React, { useState, useEffect } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useParams, useNavigate } from "react-router-dom";
import PersonalInfoSection from "../components/PersonalInfoSection";
import ScoreBreakdownSection from "../components/ScoreBreakdownSection";
import ApplicantDetailsSection from "../components/ApplicantDetailsSection";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ApplicantProfile = () => {
  const { userId, jobApplicationId } = useParams();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchApplicantData = async () => {
    try {
      const params = new URLSearchParams({
        userId: userId,
        jobApplicationId: jobApplicationId,
      });

      const response = await axiosPrivate.get(
        `/jobApplication/anyApplicationFilter?${params}`
      );

      if (response.data.content && response.data.content.length > 0) {
        const applicantData = response.data.content[0];
        setApplicant(applicantData);
      } else {
        toast.error("No applicant data found");
      }
    } catch {
      toast.error("Failed to fetch applicant data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicantData();
  }, [userId, jobApplicationId, axiosPrivate, navigate]);

  const handleBack = () => {
    navigate("/crm/applicants");
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      PENDING: {
        className:
          "bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-full px-3 py-1 text-sm",
        label: "Pending",
      },
      REJECTED: {
        className:
          "bg-red-50 text-red-700 border border-red-200 rounded-full px-3 py-1 text-sm",
        label: "Rejected",
      },
      ACCEPTED: {
        className:
          "bg-green-50 text-green-700 border border-green-200 rounded-full px-3 py-1 text-sm",
        label: "Accepted",
      },
    };

    const config = statusConfig[status];

    return <span className={config.className}>{config.label}</span>;
  };

  const handleAdmit = async (jobApplicationId) => {
    try {
      await axiosPrivate.patch(
        `/jobApplication/changeStatus?jobApplicationId=${jobApplicationId}&status=ACCEPTED`
      );
      toast.success("Applicant admitted successfully");
      fetchApplicantData();
    } catch {
      toast.error("Failed to admit applicant");
    }
  };

  const handleReject = async (jobApplicationId) => {
    try {
      await axiosPrivate.patch(
        `/jobApplication/changeStatus?jobApplicationId=${jobApplicationId}&status=REJECTED`
      );
      toast.success("Applicant rejected successfully");
      fetchApplicantData();
    } catch {
      toast.error("Failed to reject applicant");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!applicant) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Applicant not found
        </h2>
        <button
          onClick={handleBack}
          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          <IoArrowBack className="h-4 w-4" />
          <span>Back to Applicants</span>
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            <IoArrowBack className="h-4 w-4" />
            <span>Back to Applicants</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            Applicant Profile
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <PersonalInfoSection
              applicant={applicant}
              getStatusBadge={getStatusBadge}
            />
            <ScoreBreakdownSection applicant={applicant} />
            <ApplicantDetailsSection
              userId={userId}
              jobApplicationId={jobApplicationId}
              handleAdmit={handleAdmit}
              handleReject={handleReject}
            />
          </div>

          <div className="lg:col-span-3 flex justify-center space-x-4 pt-6">
            {(applicant.status === "PENDING" ||
              applicant.status === "REJECTED") && (
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                onClick={() => handleAdmit(jobApplicationId)}
              >
                Accept Applicant
              </button>
            )}
            {(applicant.status === "PENDING" ||
              applicant.status === "ACCEPTED") && (
              <button
                className="px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-50 transition-colors"
                onClick={() => handleReject(jobApplicationId)}
              >
                Reject Applicant
              </button>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ApplicantProfile;
