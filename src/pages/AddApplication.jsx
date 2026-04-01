import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useApplications } from '../hooks/useApplications';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import './AddApplication.css';

const schema = yup.object({
  company: yup.string().required('Company name is required'),
  role: yup.string().required('Job role is required'),
  location: yup.string(),
  salary: yup.number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .nullable()
    .min(0, 'Salary cannot be negative'),
  platform: yup.string(),
  status: yup.string().required('Status is required'),
  appliedDate: yup.date().required('Applied Date is required'),
  interviewDate: yup.date().nullable(),
  notes: yup.string()
}).required();

const AddApplication = () => {
  const { addApplication, updateApplication, applications } = useApplications();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  
  const isEditing = !!id;
  const existingApp = isEditing ? applications.find(a => a.id === id) : null;
  const jobData = location.state?.jobData;

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: existingApp ? {
      ...existingApp,
      appliedDate: new Date(existingApp.appliedDate).toISOString().split('T')[0],
      interviewDate: existingApp.interviewDate ? new Date(existingApp.interviewDate).toISOString().split('T')[0] : ''
    } : jobData ? {
      ...jobData,
      appliedDate: jobData.appliedDate || new Date().toISOString().split('T')[0]
    } : {
      status: 'Applied',
      appliedDate: new Date().toISOString().split('T')[0]
    }
  });

  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      appliedDate: new Date(data.appliedDate).toISOString(),
      interviewDate: data.interviewDate ? new Date(data.interviewDate).toISOString() : null
    };

    if (isEditing) {
      updateApplication(id, formattedData);
      toast.success('Application updated successfully!');
    } else {
      addApplication(formattedData);
      toast.success('Application added successfully! 🎉');
    }
    navigate('/applications');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="form-page-container"
    >
      <div className="form-wrapper glass-container">
        <h2 className="text-gradient form-title">{isEditing ? 'Edit Application' : 'Add New Application'}</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="job-form">
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Company Name *</label>
              <input {...register('company')} className="form-input" placeholder="Google, Apple, etc." />
              <p className="form-error">{errors.company?.message}</p>
            </div>

            <div className="form-group">
              <label className="form-label">Job Role *</label>
              <input {...register('role')} className="form-input" placeholder="Frontend Developer" />
              <p className="form-error">{errors.role?.message}</p>
            </div>

            <div className="form-group">
              <label className="form-label">Location</label>
              <input {...register('location')} className="form-input" placeholder="Remote, New York..." />
            </div>

            <div className="form-group">
              <label className="form-label">Salary (Annual)</label>
              <input type="number" {...register('salary')} className="form-input" placeholder="120000" />
              <p className="form-error">{errors.salary?.message}</p>
            </div>

            <div className="form-group">
              <label className="form-label">Platform</label>
              <select {...register('platform')} className="form-select">
                <option value="LinkedIn">LinkedIn</option>
                <option value="Company Career Page">Company Career Page</option>
                <option value="Indeed">Indeed</option>
                <option value="Referral">Referral</option>
                <option value="Wellfound">Wellfound</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Status *</label>
              <select {...register('status')} className="form-select">
                <option value="Applied">Applied</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
              <p className="form-error">{errors.status?.message}</p>
            </div>

            <div className="form-group">
              <label className="form-label">Applied Date *</label>
              <input type="date" {...register('appliedDate')} className="form-input" />
              <p className="form-error">{errors.appliedDate?.message}</p>
            </div>

            <div className="form-group">
              <label className="form-label">Interview Date</label>
              <input type="date" {...register('interviewDate')} className="form-input" />
            </div>
            
            <div className="form-group full-width">
              <label className="form-label">Notes</label>
              <textarea {...register('notes')} className="form-input notes-textarea" placeholder="Add any details, links, or follow-up notes here..." rows="4"></textarea>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => navigate(-1)} className="btn btn-secondary">Cancel</button>
            <button type="submit" className="btn btn-primary">{isEditing ? 'Save Changes' : 'Add Application'}</button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default AddApplication;
