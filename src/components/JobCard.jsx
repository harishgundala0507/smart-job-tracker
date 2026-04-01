import { getCompanyLogo } from '../services/api';
import { formatDate, formatCurrency } from '../utils/helpers';
import { FiMapPin as Pin, FiCalendar as Cal, FiDollarSign as Dol, FiEdit2 as Edt, FiTrash2 as Trsh, FiBookmark as Bkmk } from 'react-icons/fi';
import { FaBookmark } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './JobCard.css';
import { useApplications } from '../hooks/useApplications';

const JobCard = ({ job }) => {
  const { deleteApplication, toggleBookmark } = useApplications();
  const domain = job.company.toLowerCase().replace(/\s+/g, '') + '.com';
  
  return (
    <div className="job-card glass-container">
      <div className="job-header">
        <div className="company-info">
          <img 
            src={getCompanyLogo(domain)} 
            alt={`${job.company} logo`} 
            className="company-logo"
            onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${job.company}&background=random`; }}
          />
          <div>
            <h3 className="job-role">{job.role}</h3>
            <p className="company-name">{job.company}</p>
          </div>
        </div>
        <button className="bookmark-btn" onClick={() => toggleBookmark(job.id)}>
          {job.bookmarked ? <FaBookmark color="#fbbf24" /> : <Bkmk />}
        </button>
      </div>
      
      <div className="job-details">
        <div className="detail-item">
          <Pin className="detail-icon" />
          <span>{job.location}</span>
        </div>
        <div className="detail-item">
          <Dol className="detail-icon" />
          <span>{formatCurrency(job.salary)}</span>
        </div>
        <div className="detail-item">
          <Cal className="detail-icon" />
          <span>Applied: {formatDate(job.appliedDate)}</span>
        </div>
      </div>
      
      <div className="job-footer">
        <span className={`badge badge-${job.status.toLowerCase()}`}>
          {job.status}
        </span>
        
        <div className="job-actions">
          <Link to={`/applications/${job.id}`} className="action-btn edit">
            <Edt />
          </Link>
          <button className="action-btn delete" onClick={() => deleteApplication(job.id)}>
            <Trsh />
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
