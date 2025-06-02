import React from "react";
import { FaArrowLeft, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import WorkExperienceSection from "../components/userSections/WorkExperienceSection";
import EducationSection from "../components/userSections/EducationSection";
import SkillsSection from "../components/userSections/SkillsSection";
import ProjectsSection from "../components/userSections/ProjectsSection";
import EnglishLanguageSection from "../components/userSections/EnglishLanguageSection";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const UserDataPage = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto p-28">
          <div className="flex items-center space-x-4 mb-8">
            <Link to="/" className="text-blue-600 hover:text-blue-800">
              <FaArrowLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">User Data</h1>
          </div>

          <div className="space-y-8">
            <WorkExperienceSection />
            <EducationSection />
            <SkillsSection />
            <EnglishLanguageSection />
            <ProjectsSection />
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default UserDataPage;
