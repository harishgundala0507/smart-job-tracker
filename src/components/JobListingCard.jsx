import React from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiDollarSign, FiBriefcase, FiCalendar } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import './JobListingCard.css';

const JobListingCard = ({ job }) => {
  const navigate = useNavigate();

  const handleApply = () => {
    // Navigate to add application with pre-filled data
    navigate('/applications/new', {
      state: {
        jobData: {
          company: job.company,
          role: job.title,
          location: job.location,
          salary: job.salary,
          platform: 'Job Search',
          status: 'Applied',
          appliedDate: new Date().toISOString().split('T')[0]
        }
      }
    });
  };

  return (
    <motion.div
      className="job-listing-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <div className="job-listing-header">
        <div className="company-logo">
          <div className="logo-placeholder">
            {job.company.charAt(0).toUpperCase()}
          </div>
        </div>
        <div className="job-info">
          <h3 className="job-title">{job.title}</h3>
          <p className="company-name">{job.company}</p>
        </div>
        <div className="job-type-badge">
          {job.type}
        </div>
      </div>

      <div className="job-listing-details">
        <div className="detail-row">
          <div className="detail-item">
            <FiMapPin className="detail-icon" />
            <span>{job.location}</span>
          </div>
          <div className="detail-item">
            <FiDollarSign className="detail-icon" />
            <span>{job.salary}</span>
          </div>
        </div>
        <div className="detail-row">
          <div className="detail-item">
            <FiBriefcase className="detail-icon" />
            <span>{job.experience}</span>
          </div>
          <div className="detail-item">
            <FiCalendar className="detail-icon" />
            <span>{new Date(job.postedDate).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div className="job-description">
        <p>{job.description.substring(0, 150)}...</p>
      </div>

      <div className="job-skills">
        {job.skills.map((skill, index) => (
          <span key={index} className="skill-tag">
            {skill}
          </span>
        ))}
      </div>

      <div className="job-listing-footer">
        <button className="apply-btn" onClick={handleApply}>
          Apply Now
        </button>
        <button className="save-btn">
          Save Job
        </button>
      </div>
    </motion.div>
  );
};

export default JobListingCard;