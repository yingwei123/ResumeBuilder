import React, { useRef, useEffect } from 'react';

const SettingsModal = ({ isOpen, onClose, fontFamily, setFontFamily, fontScale, setFontScale, chatFontScale, setChatFontScale }) => {
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

  const fontOptions = [
    'Arial, sans-serif',
    'Helvetica, sans-serif',
    'Times New Roman, serif',
    'Georgia, serif',
    'Garamond, serif',
    'Courier New, monospace',
    'Verdana, sans-serif',
    'Trebuchet MS, sans-serif',
    'Palatino, serif',
    'Bookman, serif',
    'Comic Sans MS, cursive',
    'Tahoma, sans-serif',
    'Impact, sans-serif'
  ];

  const fontScaleOptions = [0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8];
  const chatFontScaleOptions = Array.from({ length: 17 }, (_, i) => 0.60 + i * 0.05);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-black">Settings</h2>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-black">Resume Settings</h3>
          <div className="mb-4">
            <label htmlFor="fontFamily" className="block text-sm font-medium text-gray-700 mb-2">
              Font Family
            </label>
            <select
              id="fontFamily"
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              className="w-full p-2 bg-blue-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
            >
              {fontOptions.map((font) => (
                <option key={font} value={font} style={{ fontFamily: font }}>
                  {font.split(',')[0]}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="fontScale" className="block text-sm font-medium text-gray-700 mb-2">
              Font Scale
            </label>
            <select
              id="fontScale"
              value={fontScale}
              onChange={(e) => setFontScale(Number(e.target.value))}
              className="w-full p-2 bg-blue-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
            >
              {fontScaleOptions.map((scale) => (
                <option key={scale} value={scale}>
                  {scale.toFixed(2)}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-black">Web Settings</h3>
          <div className="mb-4">
            <label htmlFor="chatFontScale" className="block text-sm font-medium text-gray-700 mb-2">
              AI Chat Font Scale
            </label>
            <select
              id="chatFontScale"
              value={chatFontScale}
              onChange={(e) => setChatFontScale(Number(e.target.value))}
              className="w-full p-2 bg-blue-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
            >
              {chatFontScaleOptions.map((scale) => (
                <option key={scale} value={scale}>
                  {(scale * 100).toFixed(0)}%
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors w-full text-lg font-semibold"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;