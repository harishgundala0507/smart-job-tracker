import { useApplications } from '../hooks/useApplications';
import { FiBriefcase, FiCalendar, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const StatCard = ({ title, value, icon, colorClass, linkTo }) => (
  <Link to={linkTo} className="stat-card-link">
    <div className={`stat-card glass-container ${colorClass}`}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-details">
        <h3>{value}</h3>
        <p>{title}</p>
      </div>
    </div>
  </Link>
);

const Dashboard = () => {
  const { applications } = useApplications();
  
  const stats = {
    total: applications.length,
    interviewing: applications.filter(a => a.status === 'Interviewing').length,
    offers: applications.filter(a => a.status === 'Offer').length,
    rejections: applications.filter(a => a.status === 'Rejected').length,
  };

  const recentApps = [...applications]
    .sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate))
    .slice(0, 3);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="dashboard page-transition"
    >
      <div className="dashboard-header">
        <div>
          <h1 className="text-gradient">Welcome back!</h1>
          <p className="subtitle">Here's your job search pipeline at a glance.</p>
        </div>
        <Link to="/applications/new" className="btn btn-primary">Add Application</Link>
      </div>

      <div className="stats-grid">
        <StatCard title="Total Applications" value={stats.total} icon={<FiBriefcase />} colorClass="stat-blue" linkTo="/applications?status=All" />
        <StatCard title="Interviews" value={stats.interviewing} icon={<FiCalendar />} colorClass="stat-yellow" linkTo="/applications?status=Interviewing" />
        <StatCard title="Offers" value={stats.offers} icon={<FiCheckCircle />} colorClass="stat-green" linkTo="/applications?status=Offer" />
        <StatCard title="Rejections" value={stats.rejections} icon={<FiXCircle />} colorClass="stat-red" linkTo="/applications?status=Rejected" />
      </div>

      <div className="recent-section glass-container">
        <h3>Recent Applications</h3>
        {recentApps.length > 0 ? (
          <div className="recent-list">
            {recentApps.map(app => (
              <div key={app.id} className="recent-item">
                <div className="recent-info">
                  <h4>{app.company}</h4>
                  <p>{app.role}</p>
                </div>
                <span className={`badge badge-${app.status.toLowerCase()}`}>{app.status}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No applications yet.</p>
            <Link to="/applications/new" className="btn btn-secondary" style={{marginTop: '1rem'}}>Start Tracking</Link>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Dashboard;
