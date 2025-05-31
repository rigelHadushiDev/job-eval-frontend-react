import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaReact } from "react-icons/fa";
import { FiChevronsDown } from "react-icons/fi";
import axios from "../api/axios";
import JobCard from "./JobCard";
import { WorkingTypeLabels } from "../constants/enumLabels";

const style = `
@keyframes bounceY {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
.animate-bounceY {
  animation: bounceY 0.7s infinite;
}
`;
if (
  typeof document !== "undefined" &&
  !document.getElementById("jobs-bounceY-style")
) {
  const styleTag = document.createElement("style");
  styleTag.id = "jobs-bounceY-style";
  styleTag.innerHTML = style;
  document.head.appendChild(styleTag);
}

const Jobs = ({ isHome }) => {
  const [jobs, setJobs] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const size = isHome ? 4 : 2;

  const fetchJobs = useCallback(
    async (pageToFetch = 0, append = false) => {
      const params = {
        page: pageToFetch,
        size,
        closed: false,
      };
      try {
        const res = await axios.get("/jobPosting/all", { params });
        const newJobs = res.data?.content || [];
        setHasMore(!res.data?.last);
        setJobs((prev) => (append ? [...prev, ...newJobs] : newJobs));
      } catch {
        setHasMore(false);
      }
    },
    [size]
  );

  // Initial fetch or when isHome changes
  useEffect(() => {
    setJobs([]);
    setHasMore(true);
    setPage(0);
    fetchJobs(0, false);
  }, [isHome, fetchJobs]);

  useEffect(() => {
    if (isHome || page === 0) return;
    fetchJobs(page, true);
  }, [page, isHome, fetchJobs]);

  const handleViewMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        {isHome ? (
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">
              Join Our{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Mission
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're always looking for talented individuals who share our
              passion for innovation and want to make a real impact in the world
              of technology.
            </p>
          </div>
        ) : (
          <div className="text-center mb-16 mt-32">
            <h2 className="text-5xl font-bold text-white mb-6">
              Open Job Postings
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our current open positions and join our mission to build
              the future of technology.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {Array.isArray(jobs) &&
            jobs.map((job) => (
              <JobCard
                key={job.jobPostingId}
                job={{
                  ...job,
                  requiredExperienceYears: `${job.requiredExperienceYears}+ years`,
                  workingTypeLabel:
                    WorkingTypeLabels[job.workingType] || job.workingType,
                }}
              />
            ))}
        </div>

        {isHome && (
          <div className="flex justify-center mt-8 mb-12">
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-full text-lg font-bold shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-200"
              aria-label="View all job positions"
            >
              View All Jobs
              <svg
                className="w-5 h-5 ml-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        )}
        {/* View More Button for infinite scroll */}
        {!isHome && hasMore && (
          <div className="flex justify-center mt-8 mb-12">
            <button
              onClick={handleViewMore}
              className="inline-flex items-center justify-center px-6 py-4 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-200 text-white hover:shadow-2xl"
            >
              <FiChevronsDown
                size={28}
                className="transition-transform duration-300 animate-bounceY"
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Jobs;
