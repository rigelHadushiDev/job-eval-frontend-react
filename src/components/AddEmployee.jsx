import React, { useState, useEffect } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import EmployeeList from "./EmployeeList";
import EmployeeModal from "./EmployeeModal";

// Mock API function - replace with your actual API endpoint
const fetchEmployees = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@company.com",
      role: "ADMIN",
      department: "Engineering",
      status: "active",
      joinDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      role: "RECRUITER",
      department: "Human Resources",
      status: "active",
      joinDate: "2024-02-20",
    },
    {
      id: 3,
      name: "Mike Chen",
      email: "mike.chen@company.com",
      role: "USER",
      department: "Design",
      status: "active",
      joinDate: "2024-03-10",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@company.com",
      role: "USER",
      department: "Marketing",
      status: "inactive",
      joinDate: "2024-01-05",
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david.wilson@company.com",
      role: "RECRUITER",
      department: "Human Resources",
      status: "active",
      joinDate: "2024-04-01",
    },
  ];
};

const AddEmployees = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAndSetEmployees = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchEmployees();
      setEmployees(data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAndSetEmployees();
  }, []);

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || employee.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleCount = (role) => {
    if (role === "all") return employees.length;
    return employees.filter((emp) => emp.role === role).length;
  };

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setIsModalOpen(true);
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setIsModalOpen(true);
  };

  const handleDeleteEmployee = (employeeId) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== employeeId));
  };

  const handleSaveEmployee = (employeeData) => {
    if (editingEmployee) {
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === editingEmployee.id ? { ...emp, ...employeeData } : emp
        )
      );
    } else {
      setEmployees((prev) => [
        ...prev,
        {
          ...employeeData,
          id: Date.now(),
          joinDate: new Date().toISOString().split("T")[0],
        },
      ]);
    }
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            Employee Management
          </h1>
          <button
            disabled
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md opacity-50 cursor-not-allowed"
          >
            <FaPlus className="h-4 w-4 mr-2" />
            Add Employee
          </button>
        </div>
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Loading employees...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            Employee Management
          </h1>
          <button
            onClick={handleAddEmployee}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <FaPlus className="h-4 w-4 mr-2" />
            Add Employee
          </button>
        </div>
        <div className="text-center py-12">
          <p className="text-red-500 text-lg">Error loading employees</p>
          <p className="text-gray-400 text-sm mt-2">{error.message}</p>
          <button
            onClick={fetchAndSetEmployees}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Employee Management ({employees.length} total)
        </h1>
        <button
          onClick={handleAddEmployee}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <FaPlus className="h-4 w-4 mr-2" />
          Add Employee
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button
          className={`px-4 py-2 text-sm font-medium rounded-md border ${
            roleFilter === "all"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
          onClick={() => setRoleFilter("all")}
        >
          All ({getRoleCount("all")})
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium rounded-md border ${
            roleFilter === "ADMIN"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
          onClick={() => setRoleFilter("ADMIN")}
        >
          Admin ({getRoleCount("ADMIN")})
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium rounded-md border ${
            roleFilter === "RECRUITER"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
          onClick={() => setRoleFilter("RECRUITER")}
        >
          Recruiter ({getRoleCount("RECRUITER")})
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium rounded-md border ${
            roleFilter === "USER"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
          onClick={() => setRoleFilter("USER")}
        >
          User ({getRoleCount("USER")})
        </button>
      </div>

      <EmployeeList
        employees={filteredEmployees}
        onEdit={handleEditEmployee}
        onDelete={handleDeleteEmployee}
      />

      <EmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEmployee}
        employee={editingEmployee}
      />
    </div>
  );
};

export default AddEmployees;
