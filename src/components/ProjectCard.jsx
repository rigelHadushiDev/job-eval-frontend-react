import React, { useState } from "react";
import { FaEdit, FaTrash, FaChevronDown, FaChevronUp } from "react-icons/fa";

const ProjectCard = React.memo(({ project, onEdit, onDelete }) => {
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

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const description = project?.description || "No description";
  const shouldTruncate = description.length > MAX_DESCRIPTION_LENGTH;
  const displayDescription = isExpanded
    ? description
    : description.slice(0, MAX_DESCRIPTION_LENGTH) + "...";

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">
            {project?.projectTitle || "Untitled Project"}
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            {formatDate(project?.startDate)} -{" "}
            {!project?.finished ? "Present" : formatDate(project?.endDate)}
          </p>
          <div className="text-gray-700 mb-2">
            <p>{displayDescription}</p>
            {shouldTruncate && (
              <button
                onClick={toggleDescription}
                className="text-blue-600 hover:text-blue-800 text-sm mt-1 flex items-center gap-1"
              >
                {isExpanded ? (
                  <>
                    Show Less <FaChevronUp size={12} />
                  </>
                ) : (
                  <>
                    View More <FaChevronDown size={12} />
                  </>
                )}
              </button>
            )}
          </div>
          {project?.technologiesOrTools && (
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Technologies:</span>{" "}
              {project.technologiesOrTools}
            </p>
          )}
          {project?.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              View Project
            </a>
          )}
        </div>
        <div className="flex space-x-2 ml-4">
          <button
            onClick={() => onEdit(project)}
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            <FaEdit size={18} />
          </button>
          <button
            onClick={() => onDelete(project?.projectId)}
            className="text-gray-600 hover:text-red-600 transition-colors"
          >
            <FaTrash size={18} />
          </button>
        </div>
      </div>
    </div>
  );
});

export default ProjectCard;
