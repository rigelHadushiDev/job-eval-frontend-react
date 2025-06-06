import React, { useState } from "react";

const ExpandableText = ({ text, maxLength = 150 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const safeText = text || "";
  const shouldTruncate = safeText.length > maxLength;

  if (!shouldTruncate) {
    return <p className="text-gray-700 mt-2">{safeText}</p>;
  }

  return (
    <div className="mt-2">
      <p className="text-gray-700">
        {isExpanded ? safeText : `${safeText.substring(0, maxLength)}...`}
      </p>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-blue-600 hover:underline text-sm mt-1"
      >
        {isExpanded ? "See less" : "See more"}
      </button>
    </div>
  );
};

export default ExpandableText;
