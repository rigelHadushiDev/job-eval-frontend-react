import React, { useState, useEffect, useCallback } from "react";
import CreateEmployeeModal from "../components/CreateEmployeeModal";
import EmployeeTable from "../components/EmployeeTable";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import ERROR_MESSAGES from "../constants/ErrorMessages";

const AddEmployees = () => {
  const axiosPrivate = useAxiosPrivate();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
    size: 10,
  });

  const fetchEmployees = useCallback(
    async (page = 0, size = 10) => {
      try {
        setLoading(true);
        const response = await axiosPrivate.get(
          `/user/privilegedUsers?page=${page}&size=${size}`
        );
        setEmployees(response.data.content);
        setPagination({
          currentPage: response.data.number,
          totalPages: response.data.totalPages,
          totalElements: response.data.totalElements,
          size: response.data.size,
        });
      } catch (err) {
        toast.error("Failed to fetch employees");
        console.error("Error fetching employees:", err);
      } finally {
        setLoading(false);
      }
    },
    [axiosPrivate]
  );

  useEffect(() => {
    fetchEmployees(0, pagination.size);
  }, [fetchEmployees, pagination.size]);

  const handleCreateEmployee = async (newEmployee) => {
    try {
      await axiosPrivate.post("/user/create", {
        firstname: newEmployee.firstname,
        lastname: newEmployee.lastname,
        username: newEmployee.username,
        email: newEmployee.email,
        role: newEmployee.role,
      });
      toast.success("Employee created successfully");
      await fetchEmployees(pagination.currentPage, pagination.size);
    } catch (err) {
      const messageKey = err?.response?.data?.message;
      const toastMessage =
        ERROR_MESSAGES[messageKey] || "Failed to create employee";
      toast.error(toastMessage);
    }
  };

  const handlePageChange = (newPage) => {
    fetchEmployees(newPage, pagination.size);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
        <CreateEmployeeModal onCreateEmployee={handleCreateEmployee} />
      </div>

      <EmployeeTable employees={employees} loading={loading} />

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
              of <span className="font-medium">{pagination.totalElements}</span>{" "}
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
                disabled={pagination.currentPage === pagination.totalPages - 1}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployees;
