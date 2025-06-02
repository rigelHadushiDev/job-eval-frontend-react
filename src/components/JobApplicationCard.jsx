import React from "react";
import { useNavigate } from "react-router-dom";

const JobApplicationCard = ({ application }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/job/${application.jobPostingId}`);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        className:
          "bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-full px-2.5 py-0.5 text-xs font-medium",
      },
      approved: {
        className:
          "bg-green-50 text-green-700 border border-green-200 rounded-full px-2.5 py-0.5 text-xs font-medium",
      },
      rejected: {
        className:
          "bg-red-50 text-red-700 border border-red-200 rounded-full px-2.5 py-0.5 text-xs font-medium",
      },
    };

    const config = statusConfig[status.toLowerCase()] || statusConfig.pending;

    return (
      <span className={config.className}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatDate = (dateString) => {
    const [datePart] = dateString.split(" ");
    const [day, month, year] = datePart.split("/");
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div
      className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="p-6 pb-3">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            {application.jobTitle}
          </h3>
          {getStatusBadge(application.status)}
        </div>
      </div>
      <div className="px-6 pb-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Applied on:</span>
            <span className="font-medium text-gray-900">
              {formatDate(application.applicationDate)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationCard;
