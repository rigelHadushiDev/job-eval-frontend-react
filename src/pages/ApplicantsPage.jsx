import React, { useState, useEffect, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import ApplicantsTable from "../components/ApplicantsTable";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { JobApplicationStatusLabels } from "../constants/enumLabels";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Applicants = () => {
  const axiosPrivate = useAxiosPrivate();
  const [nameSearchTerm, setNameSearchTerm] = useState("");
  const [positionSearchTerm, setPositionSearchTerm] = useState("");
  const [jobStatusFilter, setJobStatusFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
    size: 10,
  });

  const fetchApplicants = useCallback(
    async (page = 0, size = 10) => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          page: page.toString(),
          size: size.toString(),
        });

        if (nameSearchTerm) {
          params.append("fullName", nameSearchTerm);
        }
        if (positionSearchTerm) {
          params.append("jobTitle", positionSearchTerm);
        }
        if (jobStatusFilter !== "all") {
          params.append("closed", jobStatusFilter === "closed");
        }
        if (statusFilter !== "all") {
          params.append("status", statusFilter.toUpperCase());
        }

        const response = await axiosPrivate.get(
          `/jobApplication/anyApplicationFilter?${params}`
        );
        setApplicants(response.data.content);
        setPagination({
          currentPage: response.data.number,
          totalPages: response.data.totalPages,
          totalElements: response.data.totalElements,
          size: response.data.size,
        });
      } catch (err) {
        toast.error("Something went wrong with Application filtering");
        console.error("Error fetching applicants:", err);
      } finally {
        setLoading(false);
      }
    },
    [
      nameSearchTerm,
      positionSearchTerm,
      jobStatusFilter,
      statusFilter,
      axiosPrivate,
    ]
  );

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchApplicants(0, pagination.size);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [fetchApplicants, pagination.size]);

  const handlePageChange = (newPage) => {
    fetchApplicants(newPage, pagination.size);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      PENDING: {
        className: "bg-yellow-50 text-yellow-700 border-yellow-200",
        label: "Pending",
      },
      REJECTED: {
        className: "bg-red-50 text-red-700 border-red-200",
        label: "Rejected",
      },
      ACCEPTED: {
        className: "bg-green-50 text-green-700 border-green-200",
        label: "Accepted",
      },
    };

    const config = statusConfig[status] || statusConfig.PENDING;

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${config.className}`}
      >
        {config.label}
      </span>
    );
  };

  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-600 font-semibold";
    if (score >= 80) return "text-blue-600 font-semibold";
    if (score >= 70) return "text-yellow-600 font-semibold";
    return "text-red-600 font-semibold";
  };

  const handleAdmit = async (applicantId) => {
    try {
      await axiosPrivate.patch(
        `/jobApplication/changeStatus?jobApplicationId=${applicantId}&status=ACCEPTED`
      );
      toast.success("Applicant admitted successfully");
      fetchApplicants(pagination.currentPage, pagination.size);
    } catch {
      toast.error("Failed to admit applicant");
    }
  };

  const handleReject = async (applicantId) => {
    try {
      await axiosPrivate.patch(
        `/jobApplication/changeStatus?jobApplicationId=${applicantId}&status=REJECTED`
      );
      toast.success("Applicant rejected successfully");
      fetchApplicants(pagination.currentPage, pagination.size);
    } catch {
      toast.error("Failed to reject applicant");
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Applicants</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search by name..."
              value={nameSearchTerm}
              onChange={(e) => setNameSearchTerm(e.target.value)}
              className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative flex-1 max-w-md">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search by position..."
              value={positionSearchTerm}
              onChange={(e) => setPositionSearchTerm(e.target.value)}
              className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={jobStatusFilter}
            onChange={(e) => setJobStatusFilter(e.target.value)}
            className="w-[180px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Jobs</option>
            <option value="open">Open Jobs</option>
            <option value="closed">Closed Jobs</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-[180px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
            <option value="accepted">Accepted</option>
          </select>
        </div>

        <ApplicantsTable
          applicants={applicants}
          onAdmit={handleAdmit}
          onReject={handleReject}
          getStatusBadge={getStatusBadge}
          getScoreColor={getScoreColor}
          loading={loading}
        />

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 0}
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages - 1}
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">
                  {pagination.currentPage * pagination.size + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(
                    (pagination.currentPage + 1) * pagination.size,
                    pagination.totalElements
                  )}
                </span>{" "}
                of{" "}
                <span className="font-medium">{pagination.totalElements}</span>{" "}
                results
              </p>
            </div>
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 0}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={
                    pagination.currentPage === pagination.totalPages - 1
                  }
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Applicants;
