import React from "react";

const ScoreBreakdownSection = ({ applicant }) => {
  const scoringData = [
    { label: "English", score: applicant.englishScore },
    { label: "Skills", score: applicant.skillsScore },
    { label: "Education", score: applicant.educationScore },
    { label: "Work Exp. Years", score: applicant.experienceYearsScore },
    {
      label: "Work Exp. Similarity",
      score: applicant.experienceSimilarityScore,
    },
  ];

  const getScoreColor = (score) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 80) return "bg-blue-500";
    if (score >= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Score Breakdown</h2>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {scoringData.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">{item.label}</span>
                <span className="font-semibold text-gray-900">
                  {item.score}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full ${getScoreColor(item.score)}`}
                  style={{ width: `${item.score}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScoreBreakdownSection;
