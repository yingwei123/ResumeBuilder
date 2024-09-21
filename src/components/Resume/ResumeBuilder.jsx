import React from 'react';
import ResumeContacts from './ResumeContacts';
import AboutMe from './AboutMe';
import ResumeExperience from './ResumeExperience';
import ResumeSkills from './ResumeSkills';
import Education from './Education';

const ResumeBuilder = ({ 
  resumeData, 
  updateResumeData, 
  currentSection, 
  setCurrentSection, 
  editingExperienceIndex, 
  setEditingExperienceIndex,
  editingEducationIndex,
  setEditingEducationIndex,
  editingSkillIndex,
  setEditingSkillIndex
}) => {
  const sections = ['contacts', 'aboutMe', 'education', 'experience', 'skills'];

  const nextSection = () => {
    const currentIndex = sections.indexOf(currentSection);
    if (currentIndex < sections.length - 1) {
      setCurrentSection(sections[currentIndex + 1]);
    }
  };

  const previousSection = () => {
    const currentIndex = sections.indexOf(currentSection);
    if (currentIndex > 0) {
      setCurrentSection(sections[currentIndex - 1]);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        {currentSection === 'contacts' && (
          <ResumeContacts
            contacts={resumeData.contacts}
            updateResumeData={updateResumeData}
          />
        )}
        {currentSection === 'aboutMe' && (
          <AboutMe
            aboutMe={resumeData.aboutMe}
            updateResumeData={updateResumeData}
          />
        )}
        {currentSection === 'education' && (
          <Education
            education={resumeData.education}
            updateResumeData={updateResumeData}
            editingEducationIndex={editingEducationIndex}
            setEditingEducationIndex={setEditingEducationIndex}
          />
        )}
        {currentSection === 'experience' && (
          <ResumeExperience
            experience={resumeData.experience}
            updateResumeData={updateResumeData}
            editingExperienceIndex={editingExperienceIndex}
            setEditingExperienceIndex={setEditingExperienceIndex}
          />
        )}
        {currentSection === 'skills' && (
          <ResumeSkills
            skills={resumeData.skills}
            updateResumeData={updateResumeData}
            editingSkillIndex={editingSkillIndex}
            setEditingSkillIndex={setEditingSkillIndex}
          />
        )}
      </div>
      <div className="flex space-x-2 p-4 bg-white shadow-md mt-4">
        {currentSection !== 'contacts' && (
          <button
            onClick={previousSection}
            className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors flex-1"
          >
            Back
          </button>
        )}
        {currentSection !== 'skills' && (
          <button
            onClick={nextSection}
            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors flex-1"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default ResumeBuilder;