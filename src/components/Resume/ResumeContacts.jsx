import React, { useState, useEffect, useRef } from 'react';

const ResumeContacts = ({ contacts, updateResumeData }) => {
  const [newContacts, setNewContacts] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  const [filteredRoles, setFilteredRoles] = useState([]);
  const [isRoleFocused, setIsRoleFocused] = useState(false);
  const roleInputRef = useRef(null);

  const allRoles = [
    "Software Engineer", "Full Stack Developer", "Frontend Developer", "Backend Developer",
    "DevOps Engineer", "Cloud Architect", "Data Scientist", "Machine Learning Engineer",
    "AI Specialist", "Cybersecurity Analyst", "Network Administrator", "Database Administrator",
    "Mobile App Developer", "Game Developer", "QA Engineer", "IT Support Specialist",
    "UX Designer", "UI Designer", "Graphic Designer", "Product Designer", "Visual Designer",
    "Interaction Designer", "Motion Graphics Designer", "Industrial Designer", "Fashion Designer",
    "Interior Designer", "Web Designer", "Brand Identity Designer",
    "Project Manager", "Product Manager", "Operations Manager", "Sales Manager",
    "Marketing Manager", "Human Resources Manager", "Finance Manager", "Supply Chain Manager",
    "Customer Success Manager", "Business Development Manager", "Account Manager",
    "Data Analyst", "Business Analyst", "Financial Analyst", "Systems Analyst",
    "Research Analyst", "Operations Analyst", "Marketing Analyst", "Risk Analyst",
    "Healthcare Data Analyst", "Quantitative Analyst", "Business Intelligence Analyst",
    "Management Consultant", "IT Consultant", "Financial Consultant", "HR Consultant",
    "Strategy Consultant", "Environmental Consultant", "Legal Consultant", "Healthcare Consultant",
    "Digital Marketing Specialist", "Content Marketer", "SEO Specialist", "Social Media Manager",
    "Brand Manager", "Public Relations Specialist", "Sales Representative", "Account Executive",
    "Accountant", "Financial Planner", "Investment Banker", "Financial Controller",
    "Auditor", "Tax Specialist", "Actuary", "Credit Analyst", "Loan Officer",
    "Physician", "Registered Nurse", "Pharmacist", "Physical Therapist", "Occupational Therapist",
    "Medical Laboratory Technician", "Radiologic Technologist", "Dental Hygienist",
    "Teacher", "Professor", "School Counselor", "Librarian", "Education Administrator",
    "Special Education Teacher", "Curriculum Developer", "Instructional Designer",
    "Lawyer", "Paralegal", "Legal Assistant", "Compliance Officer", "Contract Manager",
    "Intellectual Property Specialist", "Corporate Counsel",
    "Copywriter", "Content Writer", "Journalist", "Editor", "Photographer", "Videographer",
    "Art Director", "Creative Director", "Animator", "Illustrator",
    "Mechanical Engineer", "Electrical Engineer", "Civil Engineer", "Chemical Engineer",
    "Aerospace Engineer", "Biomedical Engineer", "Environmental Engineer",
    "Research Scientist", "Biologist", "Chemist", "Physicist", "Environmental Scientist",
    "Geologist", "Astronomer", "Meteorologist",
    "HR Generalist", "Recruiter", "Talent Acquisition Specialist", "Training and Development Specialist",
    "Compensation and Benefits Specialist", "Employee Relations Manager",
    "Customer Service Representative", "Technical Support Specialist", "Call Center Manager",
    "Customer Experience Manager", "Client Relations Manager",
    "Hotel Manager", "Restaurant Manager", "Event Planner", "Travel Agent", "Tour Guide",
    "Cruise Ship Director", "Catering Manager",
    "Production Manager", "Quality Control Inspector", "Manufacturing Engineer",
    "Logistics Coordinator", "Warehouse Manager", "Inventory Specialist",
    "Agricultural Scientist", "Soil Scientist", "Conservation Scientist", "Forester",
    "Sustainability Consultant", "Renewable Energy Specialist",
    "Policy Analyst", "Urban Planner", "Public Administrator", "Diplomat",
    "Emergency Management Director", "Social Worker", "Nonprofit Program Manager"
  ];

  useEffect(() => {
    setFilteredRoles(allRoles);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (roleInputRef.current && !roleInputRef.current.contains(event.target)) {
        setIsRoleFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e, field) => {
    setNewContacts({ ...newContacts, [field]: e.target.value });
    if (field === 'role') {
      filterRoles(e.target.value);
    }
  };

  const filterRoles = (input) => {
    const filtered = allRoles.filter(role => 
      role.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredRoles(filtered);
  };

  const saveContacts = () => {
    updateResumeData('contacts', newContacts);
  };

  const handleRoleSelect = (role) => {
    setNewContacts({ ...newContacts, role: role });
    setFilteredRoles([]);
    setIsRoleFocused(false);
  };

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-800">Contact Information</h2>
      <div className="bg-white shadow-lg rounded-lg p-4 mb-4 flex-grow overflow-y-auto">
        <h3 className="text-xl font-semibold mb-4 text-center text-blue-700">Edit Contact Information</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="e.g. John Doe"
              value={newContacts.name}
              onChange={(e) => handleInputChange(e, 'name')}
              className="w-full p-2 bg-blue-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
            />
          </div>
          <div className="relative" ref={roleInputRef}>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <input
              id="role"
              type="text"
              placeholder="e.g. Software Engineer"
              value={newContacts.role}
              onChange={(e) => handleInputChange(e, 'role')}
              onFocus={() => setIsRoleFocused(true)}
              className="w-full p-2 bg-blue-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
            />
            {isRoleFocused && filteredRoles.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto">
                {filteredRoles.map((role, index) => (
                  <li 
                    key={index} 
                    className="p-2 hover:bg-blue-50 cursor-pointer text-black"
                    onClick={() => handleRoleSelect(role)}
                  >
                    {role}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="email"
              type="email"
              placeholder="e.g. johndoe@example.com"
              value={newContacts.email}
              onChange={(e) => handleInputChange(e, 'email')}
              className="w-full p-2 bg-blue-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              id="phone"
              type="tel"
              placeholder="e.g. (123) 456-7890"
              value={newContacts.phone}
              onChange={(e) => handleInputChange(e, 'phone')}
              className="w-full p-2 bg-blue-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
            />
          </div>
          <div>
            <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
            <input
              id="street"
              type="text"
              placeholder="e.g. 123 Main St"
              value={newContacts.street}
              onChange={(e) => handleInputChange(e, 'street')}
              className="w-full p-2 bg-blue-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
            />
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                id="city"
                type="text"
                placeholder="e.g. New York"
                value={newContacts.city}
                onChange={(e) => handleInputChange(e, 'city')}
                className="w-full p-2 bg-blue-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input
                id="state"
                type="text"
                placeholder="e.g. NY"
                value={newContacts.state}
                onChange={(e) => handleInputChange(e, 'state')}
                className="w-full p-2 bg-blue-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
              <input
                id="zipCode"
                type="text"
                placeholder="e.g. 10001"
                value={newContacts.zipCode}
                onChange={(e) => handleInputChange(e, 'zipCode')}
                className="w-full p-2 bg-blue-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <input
                id="country"
                type="text"
                placeholder="e.g. USA"
                value={newContacts.country}
                onChange={(e) => handleInputChange(e, 'country')}
                className="w-full p-2 bg-blue-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
              />
            </div>
          </div>
        </div>
        <button
          onClick={saveContacts}
          className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-lg font-semibold"
        >
          Save Contact Information
        </button>
      </div>
    </div>
  );
};

export default ResumeContacts;
