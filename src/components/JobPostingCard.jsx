import React from "react";
import { FaEdit, FaTimes } from "react-icons/fa";
import {
  EmploymentTypeLabels,
  WorkingTypeLabels,
} from "../constants/enumLabels";

const JobPostingCard = ({ job, onEdit, onClose }) => {
  // Format date from 'yyyy-MM-dd HH:mm:ss' to 'yyyy-MM-dd'
  const formatDate = (dateTimeStr) => {
    if (!dateTimeStr) return "";
    return dateTimeStr.split(" ")[0];
  };

  // Location logic
  let location = "Remote";
  if (job.workingType === "ON_SITE" || job.workingType === "HYBRID") {
    location = `${job.city || "-"}, ${job.country || "-"}`;
  }

  // Status badge
  const statusConfig = {
    open: "bg-green-50 text-green-700 border border-green-200",
    closed: "bg-red-50 text-red-700 border border-red-200",
  };
  const isClosed = !!job.closed;
  const statusLabel = isClosed ? "Closed" : "Open";
  const statusClass = isClosed ? statusConfig.closed : statusConfig.open;

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="p-6 pb-3">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            {job.jobTitle}
          </h3>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${statusClass}`}
          >
            {statusLabel}
          </span>
        </div>
      </div>
      <div className="p-6 pt-0">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Location:</span>
            <span className="font-medium text-gray-900">{location}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Type:</span>
            <span className="font-medium text-gray-900">
              {WorkingTypeLabels[job.workingType]}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Employment Type:</span>
            <span className="font-medium text-gray-900">
              {EmploymentTypeLabels[job.employmentType]}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Posted:</span>
            <span className="font-medium text-gray-900">
              {formatDate(job.openedAt)}
            </span>
          </div>
          <div className="flex items-center space-x-2 pt-3">
            <button
              onClick={() => onEdit(job)}
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center"
            >
              <FaEdit className="h-3 w-3 mr-1" />
              Edit
            </button>
            {!isClosed && (
              <button
                onClick={() => onClose(job.jobPostingId)}
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center"
              >
                <FaTimes className="h-3 w-3 mr-1" />
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPostingCard;
