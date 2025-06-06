import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="flex w-full">
          <main className="flex-1 p-6"></main>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Dashboard;
