import React, { useState, useEffect } from "react";
import ExpandableText from "./ExpandableText";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import { EmploymentTypeLabels } from "../constants/enumLabels";

const ApplicantDetailsSection = ({
  userId,
  jobApplicationId,
  handleAdmit,
  handleReject,
  status,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const [workExperiences, setWorkExperiences] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [educations, setEducations] = useState([]);
  const [englishLevel, setEnglishLevel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          workExpResponse,
          skillsResponse,
          projectsResponse,
          educationsResponse,
          englishLevelResponse,
        ] = await Promise.all([
          axiosPrivate.get(`/workExp/userWorkExperiences?userId=${userId}`),
          axiosPrivate.get(`/skill/userSkills?userId=${userId}`),
          axiosPrivate.get(`/project/userProjects?userId=${userId}`),
          axiosPrivate.get(`/education/userEducations?userId=${userId}`),
          axiosPrivate.get(
            `/applicantEnglishLevel/getApplicantEnglishLevel?userId=${userId}`
          ),
        ]);

        console.log("Work Experience Response:", workExpResponse.data);
        setWorkExperiences(workExpResponse.data);
        setSkills(skillsResponse.data);
        setProjects(projectsResponse.data);
        setEducations(educationsResponse.data);
        setEnglishLevel(englishLevelResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch applicant details");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId, axiosPrivate]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatDuration = (startDate, endDate, finished) => {
    const start = formatDate(startDate);
    const end = finished ? formatDate(endDate) : "Present";
    return `${start} - ${end}`;
  };

  const getProficiencyLabel = (level) => {
    const levels = {
      1: "Beginner",
      2: "Elementary",
      3: "Intermediate",
      4: "Advanced",
      5: "Professional",
      6: "Expert",
    };
    return levels[level] || "Unknown";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Work Experience */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Work Experience
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {workExperiences.length === 0 ? (
              <p className="text-gray-500 italic">
                Applicant has no given information about this field.
              </p>
            ) : (
              workExperiences.map((exp, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-lg">{exp.jobTitle}</h3>
                  <p className="text-blue-600 font-medium">
                    {EmploymentTypeLabels[exp.employmentType]}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDuration(exp.startDate, exp.endDate, exp.finished)}
                  </p>
                  <ExpandableText text={exp.description} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Education</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {educations.length === 0 ? (
              <p className="text-gray-500 italic">
                Applicant has no given information about this field.
              </p>
            ) : (
              educations.map((edu, index) => (
                <div key={index} className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-lg">
                    {edu.educationLevel} of {edu.fieldOfStudy}
                  </h3>
                  <p className="text-green-600 font-medium">
                    {edu.institution}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDuration(
                      edu.startedDate,
                      edu.graduationDate,
                      edu.finished
                    )}
                  </p>
                  <ExpandableText text={edu.achievementsDescription} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-2">
            {skills.length === 0 ? (
              <p className="text-gray-500 italic">
                Applicant has no given information about this field.
              </p>
            ) : (
              skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {skill.skillName} -{" "}
                  {getProficiencyLabel(skill.skillProficiency)}
                </span>
              ))
            )}
          </div>
        </div>
      </div>

      {/* English Proficiency */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            English Proficiency
          </h2>
        </div>
        <div className="p-6">
          {!englishLevel || !englishLevel.proficiencyLevel ? (
            <p className="text-gray-500 italic">
              Applicant has no given information about this field.
            </p>
          ) : (
            <div className="flex items-center space-x-4">
              <span className="font-medium text-gray-700">Level:</span>
              <span className="border border-gray-300 text-lg px-3 py-1 rounded-md">
                {englishLevel?.proficiencyLevel}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Projects */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Projects</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {projects.length === 0 ? (
              <p className="text-gray-500 italic">
                Applicant has no given information about this field.
              </p>
            ) : (
              projects.map((project, index) => (
                <div key={index} className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-semibold text-lg">
                    {project.projectTitle}
                  </h3>
                  <ExpandableText text={project.description} />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.technologiesOrTools
                      .split(",")
                      .map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="border border-gray-300 text-xs px-2 py-1 rounded-md"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                  </div>
                  {project.link && (
                    <a
                      href={project.link}
                      className="text-blue-600 hover:underline text-sm mt-2 block"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Project
                    </a>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      {/* Accept/Reject Buttons if handlers and jobApplicationId are provided */}
      {jobApplicationId && handleAdmit && handleReject && status && (
        <div className="flex justify-center space-x-4 pt-6">
          {(status === "PENDING" || status === "REJECTED") && (
            <button
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              onClick={() => handleAdmit(jobApplicationId)}
            >
              Accept Applicant
            </button>
          )}
          {(status === "PENDING" || status === "ACCEPTED") && (
            <button
              className="px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-50 transition-colors"
              onClick={() => handleReject(jobApplicationId)}
            >
              Reject Applicant
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ApplicantDetailsSection;
