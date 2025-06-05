import React, { useState, useEffect, useCallback } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import JobPostingModal from "../components/JobPostingModal";
import JobPostingCard from "../components/JobPostingCard";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import ERROR_MESSAGES from "../constants/ErrorMessages";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const PAGE_SIZE = 6;

const AddJobPostingPage = () => {
  const axiosPrivate = useAxiosPrivate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [jobPostings, setJobPostings] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchJobs = useCallback(
    async (jobTitle = searchTerm, pageNum = page) => {
      setLoading(true);
      try {
        const res = await axiosPrivate.get("/jobPosting/searchByJobTitle", {
          params: {
            jobTitle,
            page: pageNum - 1,
            size: PAGE_SIZE,
          },
        });
        setJobPostings(res.data.content || res.data || []);
        setTotalPages(res.data.totalPages || 1);
      } catch {
        setJobPostings([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    },
    [axiosPrivate, searchTerm, page]
  );

  useEffect(() => {
    fetchJobs();
  }, [page, fetchJobs]);

  const handleCreateJob = () => {
    setEditingJob(null);
    setIsModalOpen(true);
  };

  const handleEditJob = async (job) => {
    try {
      const res = await axiosPrivate.get("/jobPosting/getJobPosting", {
        params: { jobPostingId: job.jobPostingId },
      });
      setEditingJob(res.data);
    } catch (error) {
      setEditingJob(job);
      const messageKey = error?.response?.data?.message;
      const toastMessage =
        ERROR_MESSAGES[messageKey] || "Failed to get job posting.";
      toast.error(toastMessage);
    }
    setIsModalOpen(true);
  };

  const handleCloseJob = async (jobPostingId) => {
    try {
      const job = jobPostings.find((j) => j.jobPostingId === jobPostingId);
      if (!job) return;
      await axiosPrivate.put("/jobPosting/edit", {
        ...job,
        closed: true,
      });
      fetchJobs();
    } catch (error) {
      const messageKey = error?.response?.data?.message;
      const toastMessage =
        ERROR_MESSAGES[messageKey] || "Failed to close job posting.";
      toast.error(toastMessage);
    }
  };

  const handleSaveJob = async (jobData) => {
    try {
      if (editingJob) {
        await axiosPrivate.put("/jobPosting/edit", {
          ...editingJob,
          ...jobData,
        });
      } else {
        await axiosPrivate.post("/jobPosting/create", {
          ...jobData,
        });
      }
      setIsModalOpen(false);
      fetchJobs();
    } catch (error) {
      const messageKey = error?.response?.data?.message;
      const toastMessage =
        ERROR_MESSAGES[messageKey] || "Failed to save job posting.";
      toast.error(toastMessage);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
    fetchJobs(e.target.value, 1);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Job Postings</h1>
        <button
          onClick={handleCreateJob}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <FaPlus className="h-4 w-4" />
          <span>Create Job Posting</span>
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search by job title..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            Loading...
          </div>
        ) : jobPostings.length > 0 ? (
          jobPostings.map((job) => (
            <JobPostingCard
              key={job.jobPostingId}
              job={job}
              onEdit={handleEditJob}
              onClose={handleCloseJob}
              getStatusBadge={(closed) => {
                const statusConfig = {
                  active: "bg-green-50 text-green-700 border border-green-200",
                  closed: "bg-red-50 text-red-700 border border-red-200",
                };
                return (
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      statusConfig[closed ? "closed" : "active"]
                    }`}
                  >
                    {closed ? "Closed" : "Active"}
                  </span>
                );
              }}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">No job postings found</p>
            <p className="text-gray-400 text-sm mt-2">
              {searchTerm
                ? "Try adjusting your search"
                : "Create your first job posting to get started"}
            </p>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-2 pt-4">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-2">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <JobPostingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveJob}
        editingJob={editingJob}
      />
    </div>
  );
};

export default AddJobPostingPage;
