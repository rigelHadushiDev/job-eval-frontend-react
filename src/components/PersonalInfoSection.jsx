import React from "react";

const PersonalInfoSection = ({ applicant, getStatusBadge }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "";

    const [datePart] = dateString.split(" ");
    const [day, month, year] = datePart.split("/");

    const date = new Date(year, month - 1, day);

    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">
          Personal Information
        </h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Name</label>
            <p className="text-lg font-semibold">{applicant.fullName}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Email</label>
            <p className="text-lg">{applicant.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">
              Position Applied
            </label>
            <p className="text-lg">{applicant.jobTitle}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Status</label>
            <div className="mt-1">{getStatusBadge(applicant.status)}</div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">
              Applied Date
            </label>
            <p className="text-lg">{formatDate(applicant.applicationDate)}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">
              General Score
            </label>
            <p className="text-lg font-bold text-blue-600">
              {applicant.generalScore}/100
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;
