import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApplications } from '../hooks/useApplications';
import { useDebounce } from '../hooks/useDebounce';
import JobCard from '../components/JobCard';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import { motion } from 'framer-motion';
import './Applications.css';

const TABS = ['All', 'Bookmarked', 'Applied', 'Interviewing', 'Offer', 'Rejected'];

const Applications = () => {
  const { applications } = useApplications();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [filters, setFilters] = useState({ status: '', platform: '', sort: 'newest' });

  useEffect(() => {
    const statusParam = searchParams.get('status');
    if (statusParam && TABS.includes(statusParam)) {
      setActiveTab(statusParam);
    }
  }, [searchParams]);

  const debouncedSearch = useDebounce(searchTerm, 300);

  const filteredApps = useMemo(() => {
    let result = [...applications];

    // Tab Filtering
    if (activeTab === 'Bookmarked') {
      result = result.filter(app => app.bookmarked);
    } else if (activeTab !== 'All') {
      result = result.filter(app => app.status === activeTab);
    }

    // Search Filtering
    if (debouncedSearch) {
      const lowerSearch = debouncedSearch.toLowerCase();
      result = result.filter(app => 
        app.company.toLowerCase().includes(lowerSearch) || 
        app.role.toLowerCase().includes(lowerSearch)
      );
    }

    // Dropdown Filtering
    if (filters.status && activeTab === 'All') {
      result = result.filter(app => app.status === filters.status);
    }
    if (filters.platform) {
      result = result.filter(app => app.platform === filters.platform);
    }

    // Sorting
    result.sort((a, b) => {
      switch (filters.sort) {
        case 'oldest':
          return new Date(a.appliedDate) - new Date(b.appliedDate);
        case 'salaryHigh':
          return b.salary - a.salary;
        case 'companyAsc':
          return a.company.localeCompare(b.company);
        case 'newest':
        default:
          return new Date(b.appliedDate) - new Date(a.appliedDate);
      }
    });

    return result;
  }, [applications, activeTab, debouncedSearch, filters]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="applications-page page-transition"
    >
      <div className="page-header">
        <h1 className="text-gradient">Job Pipeline</h1>
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </div>

      <div className="tabs-container">
        {TABS.map(tab => (
          <button 
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <Filters filters={filters} setFilters={setFilters} />

      <div className="applications-grid">
        {filteredApps.length > 0 ? (
          filteredApps.map(job => (
            <JobCard key={job.id} job={job} />
          ))
        ) : (
          <div className="empty-state glass-container" style={{ gridColumn: '1 / -1' }}>
            <h2>No applications found</h2>
            <p>Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Applications;
