import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SkillsModal from "./SkillsModal";

const SkillsSection = () => {
  const [skills, setSkills] = useState([
    { id: 1, name: "JavaScript" },
    { id: 2, name: "React" },
    { id: 3, name: "Node.js" },
    { id: 4, name: "Python" },
    { id: 5, name: "SQL" },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setSkills(skills.filter((skill) => skill.id !== id));
  };

  const handleSave = (newSkills) => {
    setSkills(newSkills);
    setIsModalOpen(false);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Skills</CardTitle>
            <Button
              size="sm"
              className="flex items-center space-x-2"
              onClick={handleAdd}
            >
              <Plus className="h-4 w-4" />
              <span>Add Skill</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {skills.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No skills added yet
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge
                  key={skill.id}
                  variant="secondary"
                  className="flex items-center space-x-1"
                >
                  <span>{skill.name}</span>
                  <button
                    className="text-gray-500 hover:text-red-600"
                    onClick={() => handleDelete(skill.id)}
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {isModalOpen && (
        <SkillsModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          currentSkills={skills}
        />
      )}
    </>
  );
};

export default SkillsSection;
