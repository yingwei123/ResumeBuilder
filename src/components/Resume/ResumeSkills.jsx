import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const ResumeSkills = ({ skills, updateResumeData }) => {
  const [newSkill, setNewSkill] = useState({ name: '', yearsOfExperience: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleInputChange = (e, field) => {
    setNewSkill({ ...newSkill, [field]: e.target.value });
  };

  const addSkill = () => {
    if (newSkill.name && newSkill.yearsOfExperience) {
      const years = parseInt(newSkill.yearsOfExperience, 10);
      if (isNaN(years) || years < 0 || years > 100) {
        setError('Please enter a valid number of years (0-100)');
        return;
      }
      updateResumeData('skills', [...skills, { ...newSkill, yearsOfExperience: years }]);
      setNewSkill({ name: '', yearsOfExperience: '' });
      setError('');
    } else {
      setError('Please fill in both fields');
    }
  };

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-800">Skills</h2>
      <div className="bg-white shadow-lg rounded-lg p-4 mb-4 flex-grow overflow-y-auto">
        <h3 className="text-xl font-semibold mb-4 text-center text-blue-700">Add New Skill</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="skillName" className="block text-sm font-medium text-gray-700 mb-2">Skill Name</label>
            <input
              id="skillName"
              type="text"
              placeholder="e.g. JavaScript"
              value={newSkill.name}
              onChange={(e) => handleInputChange(e, 'name')}
              className="w-full p-3 bg-blue-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
            />
          </div>
          <div>
            <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
            <input
              id="yearsOfExperience"
              type="number"
              placeholder="e.g. 3"
              value={newSkill.yearsOfExperience}
              onChange={(e) => handleInputChange(e, 'yearsOfExperience')}
              className="w-full p-3 bg-blue-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
            />
          </div>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <button
          onClick={addSkill}
          className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-lg font-semibold"
        >
          Add Skill
        </button>
      </div>
    </div>
  );
};

export default ResumeSkills;
