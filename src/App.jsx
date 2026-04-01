import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context
import { ApplicationProvider } from './context/ApplicationContext';

// Components & Pages
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Applications from './pages/Applications';
import AddApplication from './pages/AddApplication';
import Analytics from './pages/Analytics';
import JobSearch from './pages/JobSearch';
import Reviews from './pages/Reviews';

function App() {
  return (
    <ApplicationProvider>
      <Router>
        <div className="app-layout">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/jobs" element={<JobSearch />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/applications/new" element={<AddApplication />} />
              <Route path="/applications/:id" element={<AddApplication />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/reviews" element={<Reviews />} />
            </Routes>
          </main>
        </div>
        <ToastContainer 
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </Router>
    </ApplicationProvider>
  );
}

export default App;
