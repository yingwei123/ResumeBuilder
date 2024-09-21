import React, { useState, useEffect } from 'react';

const EditExperienceModal = ({ isOpen, onClose, experience, onSave }) => {
  const [editedExperience, setEditedExperience] = useState(experience);

  useEffect(() => {
    setEditedExperience(experience);
  }, [experience]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedExperience(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(editedExperience);
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.name === 'responsibility') {
      e.preventDefault();
      const cursorPosition = e.target.selectionStart;
      const textBeforeCursor = e.target.value.substring(0, cursorPosition);
      const textAfterCursor = e.target.value.substring(cursorPosition);

      let newLine = '\n';
      const lastLine = textBeforeCursor.split('\n').pop();

      if (lastLine.trim().startsWith('• ')) {
        newLine += '• ';
      } else if (lastLine.match(/^\d+\.\s/)) {
        const nextNumber = parseInt(lastLine.match(/^\d+/)[0]) + 1;
        newLine += `${nextNumber}. `;
      }

      const newValue = textBeforeCursor + newLine + textAfterCursor;
      setEditedExperience(prev => ({ ...prev, responsibility: newValue }));

      // Set cursor position after setState
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = cursorPosition + newLine.length;
      }, 0);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Edit Experience</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={editedExperience.title}
              onChange={handleInputChange}
              className="w-full p-2 bg-blue-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
              placeholder="e.g. Software Engineer"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company</label>
            <input
              type="text"
              id="company"
              name="company"
              value={editedExperience.company}
              onChange={handleInputChange}
              className="w-full p-2 bg-blue-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
              placeholder="e.g. Tech Corp"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={editedExperience.location}
              onChange={handleInputChange}
              className="w-full p-2 bg-blue-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
              placeholder="e.g. New York, NY"
            />
          </div>
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="month"
                id="startDate"
                name="startDate"
                value={editedExperience.startDate}
                onChange={handleInputChange}
                className="w-full p-2 bg-blue-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="month"
                id="endDate"
                name="endDate"
                value={editedExperience.endDate}
                onChange={handleInputChange}
                className="w-full p-2 bg-blue-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="responsibility" className="block text-sm font-medium text-gray-700 mb-1">Responsibilities</label>
            <textarea
              id="responsibility"
              name="responsibility"
              value={editedExperience.responsibility}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              rows="6"
              className="w-full p-2 bg-blue-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black resize-none"
              placeholder="Describe your responsibilities and achievements..."
            ></textarea>
            <p className="text-sm text-gray-500 mt-1">
              Tip: Use *asterisks* for italic and **double asterisks** for bold text. Start a line with "• " for bullet points or "1. " for numbered lists.
            </p>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditExperienceModal;