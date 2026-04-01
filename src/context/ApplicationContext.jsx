import { createContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { fetchMockApplications } from '../services/api';

export const ApplicationContext = createContext();

export const ApplicationProvider = ({ children }) => {
  const [applications, setApplications] = useLocalStorage('smart-job-tracker-apps', []);
  const [loading, setLoading] = useLocalStorage('smart-job-tracker-loaded', false);

  useEffect(() => {
    // Initialize with mock data if completely empty and hasn't loaded before
    const loadInitialData = async () => {
      if (!loading && applications.length === 0) {
        const mockData = await fetchMockApplications();
        setApplications(mockData);
        setLoading(true);
      }
    };
    loadInitialData();
  }, [applications, loading, setApplications, setLoading]);

  const addApplication = (application) => {
    setApplications((prev) => [
      ...prev,
      { ...application, id: Date.now().toString(), bookmarked: false }
    ]);
  };

  const updateApplication = (id, updatedData) => {
    setApplications((prev) => 
      prev.map(app => app.id === id ? { ...app, ...updatedData } : app)
    );
  };

  const deleteApplication = (id) => {
    setApplications((prev) => prev.filter(app => app.id !== id));
  };

  const toggleBookmark = (id) => {
    setApplications((prev) => 
      prev.map(app => app.id === id ? { ...app, bookmarked: !app.bookmarked } : app)
    );
  };

  return (
    <ApplicationContext.Provider value={{ 
      applications, 
      addApplication, 
      updateApplication, 
      deleteApplication,
      toggleBookmark 
    }}>
      {children}
    </ApplicationContext.Provider>
  );
};
