import React, { useRef, useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

const Page = ({ resumeData, onEditSection, onEditExperience, onEditEducation, onEditSkill, onDeleteExperience, onDeleteSkill, onDeleteEducation, fontFamily, fontScale }) => {
  const pageRef = useRef(null);
  const contentRef = useRef(null);
  const [scale, setScale] = useState(1);

  const handleSectionClick = (section) => {
    onEditSection(section);
  };

  const sanitizeHTML = (html) => {
    return {
      __html: DOMPurify.sanitize(html, { 
        ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'ol', 'ul', 'li', 'i'],
        ALLOWED_ATTR: ['style']
      })
    };
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const [year, month] = dateString.split('-');
    const date = new Date(year, month - 1);
    const monthName = date.toLocaleString('default', { month: 'long' });
    return `${monthName} ${year}`;
  };

  const formatText = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
  };

  const sanitizeAndFormatHTML = (html) => {
    const formattedHTML = formatText(html);
    return {
      __html: DOMPurify.sanitize(formattedHTML, { 
        ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'ol', 'ul', 'li', 'i'],
        ALLOWED_ATTR: ['style']
      })
    };
  };

  useEffect(() => {
    const resizeContent = () => {
      const page = pageRef.current;
      const content = contentRef.current;
      if (!page || !content) return;

      const pageWidth = page.offsetWidth;
      const pageHeight = page.offsetHeight;
      content.style.transform = 'scale(1)';
      const contentWidth = content.scrollWidth;
      const contentHeight = content.scrollHeight;

      const scaleX = pageWidth / contentWidth;
      const scaleY = pageHeight / contentHeight;
      let newScale = Math.min(scaleX, scaleY, 1);

      newScale = Math.max(newScale, fontScale);

      setScale(newScale);
      content.style.transform = `scale(${newScale})`;
      content.style.transformOrigin = 'top left';
      content.style.width = `${100 / newScale}%`;
      content.style.height = `${100 / newScale}%`;
    };

    resizeContent();
    window.addEventListener('resize', resizeContent);
    return () => window.removeEventListener('resize', resizeContent);
  }, [resumeData, fontScale]);

  return (
    <div className="h-full flex items-center justify-center">
      <div ref={pageRef} className="resume-page bg-white shadow-lg rounded-lg w-full h-full overflow-hidden" style={{ aspectRatio: '8.5 / 11', maxWidth: '100%', maxHeight: '100%' }}>
        <div ref={contentRef} className="resume-content p-6 h-full" style={{ transformOrigin: 'top left', transform: `scale(${scale})`, fontFamily: fontFamily }}>
          <header className="resume-header mb-4 border-b pb-3 cursor-pointer hover:bg-gray-50 rounded" onClick={() => handleSectionClick('contacts')}>
            <div className="flex justify-between items-baseline">
              <div>
                <h1 className="text-3xl font-bold text-black">{resumeData.contacts.name || 'Your Name'}</h1>
                <h2 className="text-2xl font-bold text-black">{resumeData.contacts.role || 'Your Role'}</h2>
              </div>
            </div>
            <div className="flex justify-between text-base text-gray-600 mt-2">
              <p>
                {resumeData.contacts.street}, {resumeData.contacts.city}, {resumeData.contacts.state} {resumeData.contacts.zipCode}, {resumeData.contacts.country}
              </p>
              <p>{resumeData.contacts.email}</p>
            </div>
            <p className="text-base text-gray-600 mt-1">{resumeData.contacts.phone}</p>
          </header>
          
          <main className="resume-content text-base">
            {/* About Me section */}
            <section className="mb-4 pb-3 border-b cursor-pointer hover:bg-gray-50 rounded" onClick={() => handleSectionClick('aboutMe')}>
              <h2 className="text-xl font-bold mb-2 text-black">About Me</h2>
              <div 
                className="text-base text-gray-700"
                dangerouslySetInnerHTML={sanitizeAndFormatHTML(resumeData.aboutMe || 'Add your personal statement here')}
              />
            </section>

            {/* Education section */}
            <section className="mb-4 pb-3 border-b cursor-pointer hover:bg-gray-50 rounded" onClick={() => handleSectionClick('education')}>
              <h2 className="text-xl font-bold mb-2 text-black">Education</h2>
              {resumeData.education.map((edu, index) => (
                <div key={index} className="mb-3 relative group" onClick={(e) => {
                  e.stopPropagation();
                  onEditEducation(index);
                }}>
                  <h3 className="text-lg font-semibold text-black">{edu.degree}</h3>
                  <p className="text-base text-gray-700 font-medium">{edu.institution}</p>
                  <p className="text-sm text-gray-600">
                    {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                  </p>
                  <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      className="p-1 text-blue-500 hover:text-blue-700 transition-colors mr-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditEducation(index);
                      }}
                    >
                      <FontAwesomeIcon icon={faEdit} size="xs" />
                    </button>
                    <button 
                      className="p-1 text-red-500 hover:text-red-700 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteEducation(index);
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} size="xs" />
                    </button>
                  </div>
                </div>
              ))}
            </section>

            {/* Professional Experience section */}
            <section className="mb-4 pb-3 border-b cursor-pointer hover:bg-gray-50 rounded" onClick={() => handleSectionClick('experience')}>
              <h2 className="text-xl font-bold mb-2 text-black">Professional Experience</h2>
              <div>
                {resumeData.experience.map((job, index) => (
                  <div key={index} className="mb-3 hover:bg-blue-50 rounded relative group" onClick={(e) => {
                    e.stopPropagation();
                    onEditExperience(index);
                  }}>
                    <h3 className="text-lg font-semibold text-black">{job.title}</h3>
                    <p className="text-base text-gray-700 font-medium">{job.company}, {job.location}</p>
                    <div className="text-sm text-gray-600">
                      <span>{formatDate(job.startDate)} - {formatDate(job.endDate)}</span>
                    </div>
                    <div 
                      className="mt-1 text-base text-gray-700"
                      dangerouslySetInnerHTML={sanitizeAndFormatHTML(job.responsibility)}
                    />
                    <button 
                      className="absolute top-0 right-0 p-1 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteExperience(index);
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} size="xs" />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Skills section */}
            <section className="mb-4 pb-3 border-b cursor-pointer hover:bg-gray-50 rounded" onClick={() => handleSectionClick('skills')}>
              <h2 className="text-xl font-bold mb-2 text-black">Skills</h2>
              <div className="grid grid-cols-3 gap-2">
                {resumeData.skills.map((skill, index) => (
                  <div key={index} className="relative group">
                    <div 
                      className="text-black text-base p-2 bg-white rounded"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditSkill(index);
                      }}
                    >
                      <span className="font-medium">{skill.name} - {skill.yearsOfExperience} years</span>
                    </div>
                    <button 
                      className="absolute top-0 right-0 p-1 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteSkill(index);
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} size="xs" />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Page;
