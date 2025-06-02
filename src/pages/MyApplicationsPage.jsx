import React, { useState, useEffect, useCallback } from "react";
import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import JobApplicationCard from "../components/JobApplicationCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import ERROR_MESSAGES from "../constants/ErrorMessages";
import { JobApplicationStatusLabels } from "../constants/enumLabels";

const MyApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const pageSize = 9;
  const axiosPrivate = useAxiosPrivate();

  const fetchApplications = useCallback(
    async (page) => {
      try {
        setLoading(true);
        const response = await axiosPrivate.get(
          `/jobApplication/myApplicationFilter`,
          {
            params: {
              page: page,
              size: pageSize,
            },
          }
        );

        const { content, totalPages: total } = response.data;
        setApplications(content);
        setTotalPages(total);
      } catch (error) {
        const messageKey = error?.response?.data?.message;
        const toastMessage =
          ERROR_MESSAGES[messageKey] ||
          "Failed to load job applications. Please try again later.";
        toast.error(toastMessage);
      } finally {
        setLoading(false);
      }
    },
    [axiosPrivate, pageSize]
  );

  useEffect(() => {
    fetchApplications(currentPage);
  }, [currentPage, fetchApplications]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 0; i < totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 rounded-md ${
            currentPage === i
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {i + 1}
        </button>
      );
    }
    return pages;
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex items-center space-x-4 mb-6">
            <Link to="/" className="text-blue-600 hover:text-blue-800">
              <IoArrowBack className="h-6 w-6" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">
              My Applications
            </h1>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {applications.map((application) => (
                  <JobApplicationCard
                    key={application.jobApplicationId}
                    application={{
                      ...application,
                      status:
                        JobApplicationStatusLabels[application.status] ||
                        application.status,
                    }}
                  />
                ))}
              </div>

              {applications.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No applications found</p>
                  <p className="text-gray-400 text-sm mt-2">
                    Start applying for jobs to see them here
                  </p>
                </div>
              )}

              {totalPages > 1 && (
                <div className="flex justify-center space-x-2 mt-8">
                  {renderPagination()}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default MyApplicationsPage;
