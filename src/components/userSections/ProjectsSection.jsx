import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import ProjectsModal from "../userModals/ProjectsModal";

const ProjectsSection = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "E-commerce Platform",
      description:
        "Built a full-stack e-commerce platform using React, Node.js, and MongoDB",
      technologies: "React, Node.js, MongoDB",
      startDate: "2023-01",
      endDate: "2023-06",
      current: false,
      url: "https://github.com/johndoe/ecommerce",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const handleAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  const handleSave = (data) => {
    if (editingItem) {
      setProjects(
        projects.map((project) =>
          project.id === editingItem.id
            ? { ...data, id: editingItem.id }
            : project
        )
      );
    } else {
      setProjects([...projects, { ...data, id: Date.now() }]);
    }
    setIsModalOpen(false);
    setEditingItem(null);
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
              <div key={project.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{project.title}</h3>
                    <p className="mt-2 text-gray-700">{project.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.technologies.split(",").map((tech, index) => (
                        <span
                          key={index}
                          className="border border-blue-300 text-blue-700 bg-blue-50 px-2 py-1 rounded-full text-xs"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm mt-2 block"
                      >
                        View Project
                      </a>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      className="p-2 rounded hover:bg-gray-100 transition-colors"
                      aria-label="Edit Project"
                      onClick={() => handleEdit(project)}
                    >
                      <FaEdit className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      className="p-2 rounded hover:bg-red-100 text-red-600 transition-colors"
                      aria-label="Delete Project"
                      onClick={() => handleDelete(project.id)}
                    >
                      <FaTrash className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
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
