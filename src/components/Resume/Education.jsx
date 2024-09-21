import React, { useState } from 'react';

const Education = ({ education, updateResumeData }) => {
  const [newEducation, setNewEducation] = useState({
    degree: '',
    institution: '',
    startDate: '',
    endDate: '',
    current: false
  });

  const handleInputChange = (e, field) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setNewEducation({ ...newEducation, [field]: value });
  };

  const addEducation = () => {
    updateResumeData('education', [...education, newEducation]);
    setNewEducation({ degree: '', institution: '', startDate: '', endDate: '', current: false });
  };

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-800">Education</h2>
      <div className="bg-white shadow-lg rounded-lg p-4 mb-4 flex-grow overflow-y-auto">
        <h3 className="text-xl font-semibold mb-4 text-center text-blue-700">Add Education</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="degree" className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
            <input
              id="degree"
              type="text"
              placeholder="e.g. Bachelor of Science in Computer Science"
              value={newEducation.degree}
              onChange={(e) => handleInputChange(e, 'degree')}
              className="w-full p-2 bg-blue-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
            />
          </div>
          <div>
            <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
            <input
              id="institution"
              type="text"
              placeholder="e.g. University of Example"
              value={newEducation.institution}
              onChange={(e) => handleInputChange(e, 'institution')}
              className="w-full p-2 bg-blue-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
            />
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                id="startDate"
                type="month"
                value={newEducation.startDate}
                onChange={(e) => handleInputChange(e, 'startDate')}
                className="w-full p-2 bg-blue-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
                placeholder="Month Year"
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                id="endDate"
                type="month"
                value={newEducation.endDate}
                onChange={(e) => handleInputChange(e, 'endDate')}
                disabled={newEducation.current}
                className="w-full p-2 bg-blue-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
                placeholder="Month Year"
              />
            </div>
          </div>
          <div className="flex items-center">
            <input
              id="current"
              type="checkbox"
              checked={newEducation.current}
              onChange={(e) => handleInputChange(e, 'current')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="current" className="ml-2 block text-sm text-gray-900">
              I am currently studying here
            </label>
          </div>
        </div>
        <button
          onClick={addEducation}
          className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-lg font-semibold"
        >
          Add Education
        </button>
      </div>
      {education.map((edu, index) => (
        <div key={index} className="bg-white shadow-md rounded-lg p-4 mb-4">
          <h3 className="text-lg font-semibold text-blue-700">{edu.degree}</h3>
          <p className="text-gray-600">{edu.institution}</p>
          <p className="text-sm text-gray-500">
            {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Education;
