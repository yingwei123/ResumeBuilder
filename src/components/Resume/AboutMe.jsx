import React from 'react';

const AboutMe = ({ aboutMe, updateResumeData }) => {
  const handleInputChange = (e) => {
    updateResumeData('aboutMe', e.target.value);
  };

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-800">About Me</h2>
      <div className="bg-white shadow-lg rounded-lg p-4 mb-4 flex-grow overflow-hidden flex flex-col">
        <h3 className="text-xl font-semibold mb-4 text-center text-blue-700">Tell us about yourself</h3>
        <div className="flex-grow overflow-hidden flex flex-col">
          <label htmlFor="aboutMe" className="block text-sm font-medium text-gray-700 mb-1">About Me</label>
          <textarea
            id="aboutMe"
            value={aboutMe}
            onChange={handleInputChange}
            placeholder="Write a brief description about yourself, your career objectives, and what makes you unique..."
            className="flex-grow p-2 bg-blue-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black resize-none"
            style={{ minHeight: '200px' }}
          />
          <p className="text-sm text-gray-600 mt-2">
            Tip: Use *asterisks* for italic and **double asterisks** for bold text.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
