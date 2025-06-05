import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const EmployeeList = ({ employees, onEdit, onDelete }) => {
  const getRoleBadge = (role) => {
    const roleConfig = {
      ADMIN: "bg-red-50 text-red-700 border border-red-200",
      RECRUITER: "bg-blue-50 text-blue-700 border border-blue-200",
      USER: "bg-green-50 text-green-700 border border-green-200",
    };
    const className = roleConfig[role] || roleConfig["USER"];
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${className}`}
      >
        {role}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: "bg-green-50 text-green-700 border border-green-200",
      inactive: "bg-gray-50 text-gray-700 border border-gray-200",
    };
    const className = statusConfig[status] || statusConfig["active"];
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${className}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (employees.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No employees found</p>
        <p className="text-gray-400 text-sm mt-2">
          Add your first employee to get started
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Employee
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Department
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Join Date
            </th>
            <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="font-medium text-gray-900">
                    {employee.name}
                  </div>
                  <div className="text-sm text-gray-500">{employee.email}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {getRoleBadge(employee.role)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap font-medium">
                {employee.department}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {getStatusBadge(employee.status)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                {employee.joinDate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center space-x-2 justify-center">
                  <button
                    type="button"
                    onClick={() => onEdit(employee)}
                    className="flex items-center px-3 py-2 text-xs font-medium border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-gray-700"
                  >
                    <FaEdit className="h-3 w-3 mr-1" />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(employee.id)}
                    className="flex items-center px-3 py-2 text-xs font-medium border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-red-600"
                  >
                    <FaTrash className="h-3 w-3 mr-1" />
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
