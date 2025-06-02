import React, { useState } from "react";
import { FaEdit, FaTrash, FaChevronDown, FaChevronUp } from "react-icons/fa";

const EducationCard = React.memo(({ education, onEdit, onDelete }) => {
  // Map possible alternative field names
  const startDate = education.startDate || education.startedDate;
  const endDate = education.endDate || education.graduationDate;
  const description =
    education.description || education.achievementsDescription;

  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_DESCRIPTION_LENGTH = 150;

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    try {
      const [day, month, year] = dateStr.split("/");
      if (!day || !month || !year) return "Invalid Date";
      const date = new Date(year, month - 1, day);
      if (isNaN(date.getTime())) return "Invalid Date";
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      });
    } catch {
      return "Invalid Date";
    }
  };

  const shouldTruncate =
    description && description.length > MAX_DESCRIPTION_LENGTH;
  const displayDescription = isExpanded
    ? description
    : description
    ? description.slice(0, MAX_DESCRIPTION_LENGTH) + "..."
    : "No description";

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">
            {education?.degree || education?.educationLevel || "No Degree"}
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            {education?.institution || "No Institution"}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            {(startDate && formatDate(startDate)) || "No start date"} -{" "}
            {!education?.finished
              ? "Present"
              : (endDate && formatDate(endDate)) || "No end date"}
          </p>
          <div className="text-gray-700 mb-2">
            <p>{displayDescription}</p>
            {shouldTruncate && (
              <button
                onClick={() => setIsExpanded((prev) => !prev)}
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
          {education?.grade && (
            <p className="text-sm text-gray-600">
              <span className="font-medium">Grade:</span> {education.grade}
            </p>
          )}
        </div>
        <div className="flex space-x-2 ml-4">
          <button
            onClick={() => onEdit(education)}
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            <FaEdit size={18} />
          </button>
          <button
            onClick={() => onDelete(education?.educationId)}
            className="text-gray-600 hover:text-red-600 transition-colors"
          >
            <FaTrash size={18} />
          </button>
        </div>
      </div>
    </div>
  );
});

export default EducationCard;
