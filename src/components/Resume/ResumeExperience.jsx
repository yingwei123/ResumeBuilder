import React, { useState, useEffect, useRef } from 'react';
import EditExperienceModal from './EditExperienceModal';

const ResumeExperience = ({ experience, updateResumeData, editingExperienceIndex, setEditingExperienceIndex }) => {
  const initialExperienceState = {
    title: '',
    company: '',
    startDate: '',
    endDate: '',
    responsibility: '',
    location: ''
  };

  const [newExperience, setNewExperience] = useState(initialExperienceState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEditingExperience, setCurrentEditingExperience] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (editingExperienceIndex !== null && experience[editingExperienceIndex]) {
      setCurrentEditingExperience(experience[editingExperienceIndex]);
      setIsModalOpen(true);
    }
  }, [editingExperienceIndex, experience]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  const handleInputChange = (e, field) => {
    setNewExperience({ ...newExperience, [field]: e.target.value });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const cursorPosition = e.target.selectionStart;
      const currentValue = e.target.value;
      const textBeforeCursor = currentValue.substring(0, cursorPosition);
      const textAfterCursor = currentValue.substring(cursorPosition);

      let newLine = '\n';
      const lastLine = textBeforeCursor.split('\n').pop();

      if (lastLine.trim().startsWith('• ')) {
        newLine += '• ';
      } else if (lastLine.match(/^\d+\.\s/)) {
        const nextNumber = parseInt(lastLine.match(/^\d+/)[0]) + 1;
        newLine += `${nextNumber}. `;
      }

      const newValue = textBeforeCursor + newLine + textAfterCursor;
      setNewExperience({ ...newExperience, responsibility: newValue });

      // Set cursor position after setState
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = cursorPosition + newLine.length;
      }, 0);

      console.log('New value:', newValue); // Add this line for debugging
    }
  };

  const saveExperience = () => {
    updateResumeData('experience', [...experience, newExperience]);
    setNewExperience(initialExperienceState);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingExperienceIndex(null);
    setCurrentEditingExperience(null);
  };

  const handleModalSave = (editedExperience) => {
    const updatedExperience = [...experience];
    updatedExperience[editingExperienceIndex] = editedExperience;
    updateResumeData('experience', updatedExperience);
    closeModal();
  };

  return (
    <div className="h-full flex flex-col bg-white p-4">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-800">Experience</h2>
      <div className="bg-white shadow-lg rounded-lg p-4 mb-4 flex-grow flex flex-col">
        <h3 className="text-xl font-semibold mb-4 text-center text-blue-700">Add New Experience</h3>
        <div className="space-y-4 flex-grow flex flex-col">
          <div>
            <label htmlFor="add-title" className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
            <input
              id="add-title"
              type="text"
              value={newExperience.title}
              onChange={(e) => handleInputChange(e, 'title')}
              className="w-full p-2 bg-blue-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
            />
          </div>
          <div>
            <label htmlFor="add-company" className="block text-sm font-medium text-gray-700 mb-1">Company</label>
            <input
              id="add-company"
              type="text"
              value={newExperience.company}
              onChange={(e) => handleInputChange(e, 'company')}
              className="w-full p-2 bg-blue-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
            />
          </div>
          <div>
            <label htmlFor="add-location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              id="add-location"
              type="text"
              value={newExperience.location}
              onChange={(e) => handleInputChange(e, 'location')}
              className="w-full p-2 bg-blue-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
            />
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label htmlFor="add-startDate" className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                id="add-startDate"
                type="month"
                value={newExperience.startDate}
                onChange={(e) => handleInputChange(e, 'startDate')}
                className="w-full p-2 bg-blue-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                placeholder="Month Year"
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="add-endDate" className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                id="add-endDate"
                type="month"
                value={newExperience.endDate}
                onChange={(e) => handleInputChange(e, 'endDate')}
                className="w-full p-2 bg-blue-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                placeholder="Month Year"
              />
            </div>
          </div>
          <div className="flex-grow flex flex-col mt-4">
            <label htmlFor="add-responsibility" className="block text-sm font-medium text-gray-700 mb-2">Responsibilities</label>
            <textarea
              id="add-responsibility"
              value={newExperience.responsibility}
              onChange={(e) => handleInputChange(e, 'responsibility')}
              onKeyDown={handleKeyDown}
              placeholder="Describe your responsibilities and achievements..."
              className="flex-grow p-2 bg-blue-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black resize-none"
              style={{ minHeight: '150px' }}
            />
            <p className="text-sm text-gray-600 mt-2">
              Tip: Start a line with "• " for bullet points or "1. " for numbered lists. Use *asterisks* for italic and **double asterisks** for bold text.
            </p>
          </div>
        </div>
        <button
          onClick={saveExperience}
          className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-lg font-semibold"
        >
          Add Experience
        </button>
      </div>
      {isModalOpen && currentEditingExperience && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={modalRef}>
            <EditExperienceModal
              isOpen={isModalOpen}
              onClose={closeModal}
              experience={currentEditingExperience}
              onSave={handleModalSave}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeExperience;
