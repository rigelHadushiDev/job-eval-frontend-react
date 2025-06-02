import React, { useState } from "react";
import { FaEdit, FaTrash, FaChevronUp, FaChevronDown } from "react-icons/fa";
import { EmploymentTypeLabels } from "../constants/enumLabels";

const WorkExperienceCard = React.memo(({ experience, onEdit, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_DESCRIPTION_LENGTH = 150;

  const formatDate = (date) => {
    if (!date) return "";
    try {
      const [day, month, year] = date.split("/");
      if (!day || !month || !year) return "Invalid Date";
      const dateObj = new Date(year, month - 1, day);
      if (isNaN(dateObj.getTime())) return "Invalid Date";
      return dateObj.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      });
    } catch {
      return "Invalid Date";
    }
  };

  const description = experience.description || "No description";
  const shouldTruncate = description.length > MAX_DESCRIPTION_LENGTH;
  const displayDescription = isExpanded
    ? description
    : description.slice(0, MAX_DESCRIPTION_LENGTH) + "...";

  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold">{experience.jobTitle}</h3>
          <p className="text-gray-600">{experience.companyName}</p>
          <p className="text-sm text-gray-500">
            {formatDate(experience.startDate)} -{" "}
            {!experience.finished ? "Present" : formatDate(experience.endDate)}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            <span className="inline-block px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-xs font-medium mr-2">
              {EmploymentTypeLabels[experience.employmentType] ||
                experience.employmentType}
            </span>
            {experience.totalYears && (
              <span className="inline-block px-2 py-0.5 rounded bg-green-100 text-green-800 text-xs font-medium">
                {experience.totalYears} yrs
              </span>
            )}
          </p>
          <div className="mt-2 text-gray-700">
            <p>{displayDescription}</p>
            {shouldTruncate && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-blue-600 hover:text-blue-800 text-sm mt-1 flex items-center gap-1"
              >
                {isExpanded ? (
                  <>
                    Show Less <FaChevronUp size={12} />
                  </>
                ) : (
                  <>
                    Show More <FaChevronDown size={12} />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            type="button"
            className="p-2 rounded hover:bg-gray-100 transition-colors"
            aria-label="Edit Experience"
            onClick={() => onEdit(experience)}
          >
            <FaEdit className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="p-2 rounded hover:bg-red-100 text-red-600 transition-colors"
            aria-label="Delete Experience"
            onClick={() => onDelete(experience.workExperienceId)}
          >
            <FaTrash className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
});

export default WorkExperienceCard;
