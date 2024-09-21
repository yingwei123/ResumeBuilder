import React, { useState, useRef, useEffect } from 'react';

const ExportModal = ({ isOpen, onClose, onExport }) => {
  const [resumeName, setResumeName] = useState('');
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleExport = () => {
    if (resumeName.trim()) {
      onExport(resumeName);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-2xl font-bold mb-4 text-black">Export Resume</h2>
        <div className="mb-4">
          <label htmlFor="resumeName" className="block text-sm font-medium text-gray-700 mb-2">
            Resume Name
          </label>
          <input
            id="resumeName"
            type="text"
            value={resumeName}
            onChange={(e) => setResumeName(e.target.value)}
            className="w-full p-2 bg-blue-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
            placeholder="Enter resume name"
          />
        </div>
        <div className="flex justify-center space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;