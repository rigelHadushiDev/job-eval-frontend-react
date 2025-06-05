import React from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { JobApplicationStatusLabels } from "../constants/enumLabels";

const ApplicantsTable = ({
  applicants,
  onAdmit,
  onReject,
  getStatusBadge,
  getScoreColor,
  loading,
}) => {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="text-gray-500 text-lg mt-4">Loading applicants...</p>
      </div>
    );
  }

  if (applicants.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No applicants found</p>
        <p className="text-gray-400 text-sm mt-2">
          No applicants have applied yet
        </p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "";
    // Parse the date string in format "DD/MM/YYYY HH:mm:ss"
    const [datePart, timePart] = dateString.split(" ");
    const [day, month, year] = datePart.split("/");
    const [hours, minutes] = timePart.split(":");

    // Create a new date object
    const date = new Date(year, month - 1, day, hours, minutes);

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Applicant
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Position
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Applied Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Work Exp. Similarity
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Work Exp. Years
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Education
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Skills
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              English
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              General
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {applicants.map((applicant) => (
            <tr
              key={applicant.jobApplicationId}
              className="cursor-pointer hover:bg-gray-50"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="font-medium text-gray-900">
                    {applicant.fullName}
                  </div>
                  <div className="text-sm text-gray-500">{applicant.email}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap font-medium">
                {applicant.jobTitle}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                {formatDate(applicant.applicationDate)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {getStatusBadge(applicant.status)}
              </td>
              <td
                className={`px-6 py-4 whitespace-nowrap text-center ${getScoreColor(
                  applicant.experienceSimilarityScore
                )}`}
              >
                {applicant.experienceSimilarityScore}
              </td>
              <td
                className={`px-6 py-4 whitespace-nowrap text-center ${getScoreColor(
                  applicant.experienceYearsScore
                )}`}
              >
                {applicant.experienceYearsScore}
              </td>
              <td
                className={`px-6 py-4 whitespace-nowrap text-center ${getScoreColor(
                  applicant.educationScore
                )}`}
              >
                {applicant.educationScore}
              </td>
              <td
                className={`px-6 py-4 whitespace-nowrap text-center ${getScoreColor(
                  applicant.skillsScore
                )}`}
              >
                {applicant.skillsScore}
              </td>
              <td
                className={`px-6 py-4 whitespace-nowrap text-center ${getScoreColor(
                  applicant.englishScore
                )}`}
              >
                {applicant.englishScore}
              </td>
              <td
                className={`px-6 py-4 whitespace-nowrap text-center ${getScoreColor(
                  applicant.generalScore
                )}`}
              >
                {applicant.generalScore}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center justify-center space-x-2">
                  {applicant.status !== "ACCEPTED" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAdmit(applicant.jobApplicationId);
                      }}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-green-600 hover:text-green-700 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      <FaCheckCircle className="h-3 w-3 mr-1" />
                      Admit
                    </button>
                  )}
                  {applicant.status !== "REJECTED" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onReject(applicant.jobApplicationId);
                      }}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <FaTimesCircle className="h-3 w-3 mr-1" />
                      Reject
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicantsTable;
