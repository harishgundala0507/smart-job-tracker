import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import JobListingCard from '../components/JobListingCard';
import './JobSearch.css';

const JobSearch = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    company: '',
    jobType: '',
    salaryRange: '',
    experience: ''
  });

  // Mock job data - in a real app, this would come from an API
  const mockJobs = [
    {
      id: 1,
      title: 'Software Engineer',
      company: 'Tech Corp',
      location: 'Mumbai',
      salary: '₹8-12 LPA',
      type: 'Full-time',
      experience: '2-4 years',
      description: 'We are looking for a skilled software engineer...',
      postedDate: '2024-01-15',
      skills: ['React', 'Node.js', 'MongoDB']
    },
    {
      id: 2,
      title: 'Frontend Developer',
      company: 'Digital Solutions',
      location: 'Delhi',
      salary: '₹6-10 LPA',
      type: 'Full-time',
      experience: '1-3 years',
      description: 'Join our team as a frontend developer...',
      postedDate: '2024-01-14',
      skills: ['React', 'CSS', 'JavaScript']
    },
    {
      id: 3,
      title: 'Data Analyst',
      company: 'Analytics Pro',
      location: 'Bangalore',
      salary: '₹7-11 LPA',
      type: 'Full-time',
      experience: '2-5 years',
      description: 'Exciting opportunity for a data analyst...',
      postedDate: '2024-01-13',
      skills: ['Python', 'SQL', 'Tableau']
    },
    {
      id: 4,
      title: 'UI/UX Designer',
      company: 'Creative Agency',
      location: 'Pune',
      salary: '₹5-9 LPA',
      type: 'Full-time',
      experience: '1-4 years',
      description: 'Design amazing user experiences...',
      postedDate: '2024-01-12',
      skills: ['Figma', 'Adobe XD', 'Sketch']
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      company: 'Cloud Tech',
      location: 'Hyderabad',
      salary: '₹10-15 LPA',
      type: 'Full-time',
      experience: '3-6 years',
      description: 'Manage our cloud infrastructure...',
      postedDate: '2024-01-11',
      skills: ['AWS', 'Docker', 'Kubernetes']
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setJobs(mockJobs);
      setFilteredJobs(mockJobs);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLocation = !filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase());
      const matchesCompany = !filters.company || job.company.toLowerCase().includes(filters.company.toLowerCase());
      const matchesJobType = !filters.jobType || job.type === filters.jobType;
      const matchesExperience = !filters.experience || job.experience.includes(filters.experience);

      return matchesSearch && matchesLocation && matchesCompany && matchesJobType && matchesExperience;
    });

    setFilteredJobs(filtered);
  }, [jobs, searchTerm, filters]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <motion.div 
      className="job-search"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="job-search-header">
        <h1>Find Your Dream Job</h1>
        <p>Discover thousands of job opportunities</p>
      </div>

      <div className="search-section">
        <SearchBar onSearch={handleSearch} placeholder="Search jobs, companies, skills..." />
        <Filters onFilterChange={handleFilterChange} />
      </div>

      <div className="results-section">
        <div className="results-header">
          <h2>{filteredJobs.length} Jobs Found</h2>
        </div>

        {loading ? (
          <div className="loading">Loading jobs...</div>
        ) : (
          <div className="job-listings">
            {filteredJobs.map(job => (
              <JobListingCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default JobSearch;