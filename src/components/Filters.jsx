import React from 'react';
import { FiFilter } from 'react-icons/fi';
import './Filters.css';

const Filters = ({ onFilterChange }) => {
  const [localFilters, setLocalFilters] = React.useState({
    location: '',
    company: '',
    jobType: '',
    salaryRange: '',
    experience: ''
  });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="filters-container glass-container">
      <div className="filters-header">
        <FiFilter className="text-gradient" />
        <h4>Filters</h4>
      </div>

      <div className="filters-grid">
        <input
          type="text"
          className="form-input"
          placeholder="Location"
          value={localFilters.location}
          onChange={(e) => handleFilterChange('location', e.target.value)}
        />

        <input
          type="text"
          className="form-input"
          placeholder="Company"
          value={localFilters.company}
          onChange={(e) => handleFilterChange('company', e.target.value)}
        />

        <select
          className="form-select"
          value={localFilters.jobType}
          onChange={(e) => handleFilterChange('jobType', e.target.value)}
        >
          <option value="">All Job Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
        </select>

        <select
          className="form-select"
          value={localFilters.experience}
          onChange={(e) => handleFilterChange('experience', e.target.value)}
        >
          <option value="">All Experience Levels</option>
          <option value="0-1">0-1 years</option>
          <option value="1-3">1-3 years</option>
          <option value="2-4">2-4 years</option>
          <option value="3-6">3-6 years</option>
          <option value="5+">5+ years</option>
        </select>

        <select
          className="form-select"
          value={localFilters.salaryRange}
          onChange={(e) => handleFilterChange('salaryRange', e.target.value)}
        >
          <option value="">All Salary Ranges</option>
          <option value="0-5">₹0-5 LPA</option>
          <option value="5-10">₹5-10 LPA</option>
          <option value="10-15">₹10-15 LPA</option>
          <option value="15-25">₹15-25 LPA</option>
          <option value="25+">₹25+ LPA</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
