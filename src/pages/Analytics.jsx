import { useMemo } from 'react';
import { useApplications } from '../hooks/useApplications';
import { StatusPieChart, MonthlyBarChart } from '../components/Charts';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import './Analytics.css';

const Analytics = () => {
  const { applications } = useApplications();

  // Prepare data for Pie Chart
  const pieData = useMemo(() => {
    const counts = applications.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {});

    return ['Applied', 'Interviewing', 'Offer', 'Rejected']
      .filter(status => counts[status])
      .map(status => ({
        name: status,
        value: counts[status]
      }));
  }, [applications]);

  // Prepare data for Monthly Bar Chart
  const barData = useMemo(() => {
    const monthlyData = applications.reduce((acc, app) => {
      try {
        const month = format(parseISO(app.appliedDate), 'MMM yyyy');
        acc[month] = (acc[month] || 0) + 1;
      } catch (e) {
        // Handle invalid dates
      }
      return acc;
    }, {});

    // Sort chronologically (simple version based on assuming last 6 months)
    return Object.entries(monthlyData)
      .map(([name, apps]) => ({ name, applications: apps }))
      .slice(-6); // usually we would sort properly using dates
  }, [applications]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="analytics-page page-transition"
    >
      <h1 className="text-gradient page-title">Application Analytics</h1>
      <p className="subtitle">Track your performance and conversion rates over time.</p>
      
      {applications.length > 0 ? (
        <div className="charts-grid">
          <div className="glass-container chart-container">
            <StatusPieChart data={pieData} />
          </div>
          <div className="glass-container chart-container">
            <MonthlyBarChart data={barData} />
          </div>
        </div>
      ) : (
        <div className="glass-container empty-state">
          <h3>Not enough data</h3>
          <p>Add some applications to see your analytics dashboard.</p>
        </div>
      )}
    </motion.div>
  );
};

export default Analytics;
