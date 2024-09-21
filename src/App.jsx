import React, { useState, useRef, useEffect, useCallback } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import SideNav from './components/SideNav';
import ResumeBuilder from './components/Resume/ResumeBuilder';
import Page from './components/Resume/Page';
import SettingsModal from './components/SettingsModal';
import ExportModal from './components/ExportModal';
import Chat from './components/Chat';

function App() {
  const [resumeData, setResumeData] = useState(() => {
    const savedData = localStorage.getItem('resumeData');
    return savedData ? JSON.parse(savedData) : {
      contacts: {},
      aboutMe: '',
      experience: [],
      education: [],
      skills: []
    };
  });

  const [currentSection, setCurrentSection] = useState('contacts');
  const [editingExperienceIndex, setEditingExperienceIndex] = useState(null);
  const [editingEducationIndex, setEditingEducationIndex] = useState(null);
  const [editingSkillIndex, setEditingSkillIndex] = useState(null);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [fontFamily, setFontFamily] = useState(() => {
    return localStorage.getItem('fontFamily') || 'Arial, sans-serif';
  });
  const [fontScale, setFontScale] = useState(() => {
    return Number(localStorage.getItem('fontScale')) || 0.55;
  });
  const [saveMessage, setSaveMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatFontScale, setChatFontScale] = useState(() => {
    return Number(localStorage.getItem('chatFontScale')) || 1;
  });
  const [chatSize, setChatSize] = useState(() => {
    const savedSize = localStorage.getItem('chatSize');
    return savedSize ? JSON.parse(savedSize) : { width: 300, height: 400 };
  });

  const resumeRef = useRef(null);

  useEffect(() => {
    let timer;
    if (showMessage) {
      timer = setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [showMessage]);

  useEffect(() => {
    localStorage.setItem('fontFamily', fontFamily);
  }, [fontFamily]);

  useEffect(() => {
    localStorage.setItem('fontScale', fontScale);
  }, [fontScale]);

  useEffect(() => {
    localStorage.setItem('chatFontScale', chatFontScale);
  }, [chatFontScale]);

  const updateResumeData = (section, data) => {
    setResumeData(prevData => ({
      ...prevData,
      [section]: data
    }));
  };

  const handleSave = () => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
    setSaveMessage('Resume saved successfully!');
    setShowMessage(true);
  };

  const handleEditSection = (section) => {
    setCurrentSection(section);
    setEditingExperienceIndex(null);
    setEditingEducationIndex(null);
    setEditingSkillIndex(null);
  };

  const handleEditExperience = (index) => {
    setCurrentSection('experience');
    setEditingExperienceIndex(index);
  };

  const handleEditEducation = (index) => {
    setCurrentSection('education');
    setEditingEducationIndex(index);
  };

  const handleEditSkill = (index) => {
    setCurrentSection('skills');
    setEditingSkillIndex(index);
  };

  const handleDeleteExperience = (index) => {
    setResumeData(prevData => ({
      ...prevData,
      experience: prevData.experience.filter((_, i) => i !== index)
    }));
  };

  const handleDeleteSkill = (index) => {
    setResumeData(prevData => ({
      ...prevData,
      skills: prevData.skills.filter((_, i) => i !== index)
    }));
  };

  const handleDeleteEducation = (index) => {
    setResumeData(prevData => ({
      ...prevData,
      education: prevData.education.filter((_, i) => i !== index)
    }));
  };

  const handleExport = async (resumeName) => {
    const element = resumeRef.current;
    const canvas = await html2canvas(element, {
      scale: 5,
      useCORS: true,
      logging: false,
      width: element.offsetWidth,
      height: element.offsetHeight,
    });
    
    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'in',
      format: 'letter'
    });
    
    const pageWidth = 8.5;
    const pageHeight = 11;
    const imgWidth = canvas.width / 96 / 5;
    const imgHeight = canvas.height / 96 / 5;
    
    const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
    const imgX = (pageWidth - imgWidth * ratio) / 2;
    const imgY = 0;

    pdf.addImage(imgData, 'JPEG', imgX, imgY, imgWidth * ratio, pageHeight, null, 'FAST');
    pdf.save(`${resumeName}.pdf`);
  };

  const handleOpenSettings = () => {
    setIsSettingsOpen(true);
  };

  const handleCloseSettings = () => {
    setIsSettingsOpen(false);
  };

  const handleOpenExport = () => {
    setIsExportOpen(true);
  };

  const handleCloseExport = () => {
    setIsExportOpen(false);
  };

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  const handleChatSizeChange = useCallback((newSize) => {
    setChatSize(newSize);
    localStorage.setItem('chatSize', JSON.stringify(newSize));
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <SideNav 
        onExport={handleOpenExport} 
        onSave={handleSave} 
        onOpenSettings={handleOpenSettings}
        onOpenChat={handleOpenChat}
      />
      <div className="flex flex-1 ml-[200px] relative">
        {showMessage && (
          <div 
            className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-md transition-opacity duration-1000 ease-in-out z-50"
            style={{ opacity: showMessage ? 1 : 0 }}
          >
            {saveMessage}
          </div>
        )}
        <div className="w-1/2 h-full overflow-y-auto px-4 py-6">
          <ResumeBuilder 
            resumeData={resumeData} 
            updateResumeData={updateResumeData}
            currentSection={currentSection}
            setCurrentSection={setCurrentSection}
            editingExperienceIndex={editingExperienceIndex}
            setEditingExperienceIndex={setEditingExperienceIndex}
            editingEducationIndex={editingEducationIndex}
            setEditingEducationIndex={setEditingEducationIndex}
            editingSkillIndex={editingSkillIndex}
            setEditingSkillIndex={setEditingSkillIndex}
          />
        </div>
        <div className="w-1/2 h-full overflow-hidden px-4 py-6" ref={resumeRef}>
          <Page 
            resumeData={resumeData} 
            onEditSection={handleEditSection} 
            onEditExperience={handleEditExperience}
            onEditEducation={handleEditEducation}
            onEditSkill={handleEditSkill}
            onDeleteExperience={handleDeleteExperience}
            onDeleteSkill={handleDeleteSkill}
            onDeleteEducation={handleDeleteEducation}
            fontFamily={fontFamily}
            fontScale={fontScale}
          />
        </div>
      </div>
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={handleCloseSettings}
        fontFamily={fontFamily}
        setFontFamily={setFontFamily}
        fontScale={fontScale}
        setFontScale={setFontScale}
        chatFontScale={chatFontScale}
        setChatFontScale={setChatFontScale}
      />
      <ExportModal
        isOpen={isExportOpen}
        onClose={handleCloseExport}
        onExport={handleExport}
      />
      {isChatOpen && (
        <Chat 
          isOpen={isChatOpen} 
          onClose={handleCloseChat} 
          chatFontScale={chatFontScale} 
          onSizeChange={handleChatSizeChange}
        />
      )}
    </div>
  );
}

export default App;
