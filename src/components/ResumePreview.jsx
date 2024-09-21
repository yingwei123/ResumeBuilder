import React from 'react';
import './ResumePreview.css';

const ResumePreview = ({ resumeData }) => {
  return (
    <div className="resume-preview">
      <h1>Resume Preview</h1>
      <section>
        <h2>Contact Information</h2>
        <p>Name: {resumeData.contacts.name}</p>
        <p>Email: {resumeData.contacts.email}</p>
        <p>Phone: {resumeData.contacts.phone}</p>
        <p>Address: {resumeData.contacts.address}</p>
      </section>
      <section>
        <h2>Experience</h2>
        {resumeData.experience.map((exp, index) => (
          <div key={index}>
            <h3>{exp.jobTitle}</h3>
            <p>{exp.company}</p>
            <p>{exp.startDate} - {exp.endDate}</p>
            <p>{exp.description}</p>
          </div>
        ))}
      </section>
      <section>
        <h2>Education</h2>
        {resumeData.education.map((edu, index) => (
          <div key={index}>
            <h3>{edu.degree}</h3>
            <p>{edu.school}</p>
            <p>{edu.graduationDate}</p>
          </div>
        ))}
      </section>
      <section>
        <h2>Skills</h2>
        <ul>
          {resumeData.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ResumePreview;