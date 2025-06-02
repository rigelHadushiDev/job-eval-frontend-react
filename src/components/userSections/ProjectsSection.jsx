import React, { useState, useEffect, useCallback } from "react";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import ProjectsModal from "../userModals/ProjectsModal";
import ProjectCard from "../ProjectCard";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import ERROR_MESSAGES from "../../constants/ErrorMessages";

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  const fetchProjects = useCallback(async () => {
    try {
      const response = await axiosPrivate.get(
        `/project/userProjects?userId=${auth.userId}`
      );
      setProjects(response.data);
    } catch (err) {
      const messageKey = err?.response?.data?.message;
      const toastMessage =
        ERROR_MESSAGES[messageKey] ||
        "Failed to load work experience details. Please try again later.";
      toast.error(toastMessage);
    }
  }, [axiosPrivate, auth.userId]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = async (project) => {
    try {
      const response = await axiosPrivate.get(
        `/project/getProject?projectId=${project.projectId}`
      );
      setEditingItem(response.data);
      setIsModalOpen(true);
    } catch (err) {
      const messageKey = err?.response?.data?.message;
      const toastMessage =
        ERROR_MESSAGES[messageKey] ||
        "Failed to load project details. Please try again later.";
      toast.error(toastMessage);
    }
  };

  const handleDelete = async (projectId) => {
    try {
      await axiosPrivate.delete(`/project?projectId=${projectId}`);
      setProjects(
        projects.filter((project) => project.projectId !== projectId)
      );
      toast.success("Project deleted successfully");
    } catch (err) {
      const messageKey = err?.response?.data?.message;
      const toastMessage =
        ERROR_MESSAGES[messageKey] ||
        "Failed to delete project. Please try again later.";
      toast.error(toastMessage);
    }
  };

  const handleSave = async (data) => {
    try {
      const projectData = {
        projectTitle: data.projectTitle,
        description: data.description,
        technologiesOrTools: data.technologiesOrTools,
        startDate: data.startDate,
        endDate: data.endDate,
        link: data.link,
        userId: auth.userId,
        ongoing: data.current,
        finished: !data.current,
      };

      // Remove link field if it's empty
      if (!projectData.link) {
        delete projectData.link;
      }

      if (editingItem) {
        await axiosPrivate.put("/project/edit", {
          ...projectData,
          projectId: editingItem.projectId,
        });
        toast.success("Project updated successfully");
      } else {
        await axiosPrivate.post("/project/create", projectData);
        toast.success("Project created successfully");
      }

      fetchProjects();
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (error) {
      console.error("Error saving project:", error);
      toast.error(
        editingItem ? "Failed to update project" : "Failed to create project"
      );
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between border-b pb-4 mb-4">
          <h2 className="text-xl font-semibold">Projects</h2>
          <button
            type="button"
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm shadow"
            onClick={handleAdd}
          >
            <FaPlus className="h-4 w-4" />
            <span>Add Project</span>
          </button>
        </div>
        {projects.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No projects added yet
          </p>
        ) : (
          <div className="space-y-4">
            {projects.map((project) => (
              <ProjectCard
                key={project.projectId}
                project={project}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
      {isModalOpen && (
        <ProjectsModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          editingItem={editingItem}
        />
      )}
    </>
  );
};

export default ProjectsSection;
