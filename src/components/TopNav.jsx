import React from 'react';

const TopNav = ({ onExport }) => {
  return (
    <nav className="fixed top-0 left-0 bottom-0 w-[200px] bg-white shadow-md p-2 z-20 flex flex-col justify-center">
      <ul className="space-y-6">
        <li><a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors block">Home</a></li>
        <li><a href="#templates" className="text-gray-700 hover:text-blue-600 transition-colors block">Templates</a></li>
        <li><button onClick={onExport} className="text-gray-700 hover:text-blue-600 transition-colors block w-full text-left">Export</button></li>
        <li><a href="#settings" className="text-gray-700 hover:text-blue-600 transition-colors block">Settings</a></li>
      </ul>
    </nav>
  );
};

export default TopNav;