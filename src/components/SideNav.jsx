import React from 'react';

const SideNav = ({ onExport, onSave, onOpenSettings, onOpenChat }) => {
  return (
    <nav className="fixed left-0 top-0 h-full w-[200px] bg-gray-800 text-white p-4">
      <ul className="space-y-6">
        <li>
          <button 
            onClick={onSave} 
            className="text-black bg-white hover:bg-blue-50 transition-colors block w-full text-left p-2 rounded"
          >
            Save
          </button>
        </li>
        <li>
          <button 
            onClick={onExport} 
            className="text-black bg-white hover:bg-blue-50 transition-colors block w-full text-left p-2 rounded"
          >
            Export
          </button>
        </li>
        <li>
          <button 
            onClick={onOpenSettings} 
            className="text-black bg-white hover:bg-blue-50 transition-colors block w-full text-left p-2 rounded"
          >
            Settings
          </button>
        </li>
        <li>
          <button 
            onClick={onOpenChat} 
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors mb-2"
          >
            Open AI Resume Assistant
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default SideNav;
