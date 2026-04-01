import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiBriefcase, FiPlusCircle, FiPieChart, FiSun, FiMoon, FiSearch, FiStar } from 'react-icons/fi';
import { ThemeContext } from '../context/ThemeContext';
import './Navbar.css';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <nav className="navbar glass-container">
      <div className="nav-brand">
        <div className="logo-icon">
          <FiHome className="icon-gradient" />
        </div>
        <span className="text-gradient brand-text">JobTracker</span>
      </div>
      
      <ul className="nav-links">
        <li>
          <NavLink to="/dashboard" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
            <FiHome /> <span className="link-text">Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/jobs" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
            <FiSearch /> <span className="link-text">Jobs</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/applications" end className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
            <FiBriefcase /> <span className="link-text">Applications</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/applications/new" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
            <FiPlusCircle /> <span className="link-text">Add Job</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/analytics" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
            <FiPieChart /> <span className="link-text">Analytics</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/reviews" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
            <FiStar /> <span className="link-text">Reviews</span>
          </NavLink>
        </li>
      </ul>
      
      <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle Theme">
        {theme === 'dark' ? <FiSun /> : <FiMoon />}
      </button>
    </nav>
  );
};

export default Navbar;
