// src/layouts/CRMLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import CRMSidebar from "../components/CRMSideBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CRMLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-blue-600">CRM CodePioneers</h1>
      </header>

      <div className="flex flex-1">
        <CRMSidebar />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CRMLayout;
