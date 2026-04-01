import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiEdit, FiTrash2 } from 'react-icons/fi';
import './Reviews.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      company: 'TechCorp',
      position: 'Software Engineer',
      rating: 4,
      review: 'Great company culture and work-life balance. Interview process was smooth.',
      date: '2024-01-15'
    },
    {
      id: 2,
      company: 'DataSys',
      position: 'Data Analyst',
      rating: 3,
      review: 'Decent pay but long hours. Management could be better.',
      date: '2024-01-10'
    }
  ]);

  const [newReview, setNewReview] = useState({
    company: '',
    position: '',
    rating: 0,
    review: ''
  });

  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newReview.company && newReview.position && newReview.review) {
      const review = {
        ...newReview,
        id: Date.now(),
        date: new Date().toISOString().split('T')[0]
      };
      setReviews([review, ...reviews]);
      setNewReview({ company: '', position: '', rating: 0, review: '' });
      setIsAdding(false);
    }
  };

  const deleteReview = (id) => {
    setReviews(reviews.filter(review => review.id !== id));
  };

  const renderStars = (rating, interactive = false, onChange = null) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FiStar
        key={i}
        className={`star ${i < rating ? 'filled' : ''} ${interactive ? 'interactive' : ''}`}
        onClick={interactive ? () => onChange(i + 1) : undefined}
      />
    ));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="reviews page-transition"
    >
      <div className="reviews-header">
        <div>
          <h1 className="text-gradient">Company Reviews</h1>
          <p className="subtitle">Share your experiences and help others in their job search.</p>
        </div>
        <button 
          className="btn btn-primary" 
          onClick={() => setIsAdding(!isAdding)}
        >
          {isAdding ? 'Cancel' : 'Write Review'}
        </button>
      </div>

      {isAdding && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="review-form glass-container"
        >
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Company</label>
                <input
                  type="text"
                  value={newReview.company}
                  onChange={(e) => setNewReview({...newReview, company: e.target.value})}
                  placeholder="Company name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Position</label>
                <input
                  type="text"
                  value={newReview.position}
                  onChange={(e) => setNewReview({...newReview, position: e.target.value})}
                  placeholder="Job position"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Rating</label>
              <div className="rating-input">
                {renderStars(newReview.rating, true, (rating) => setNewReview({...newReview, rating}))}
              </div>
            </div>
            <div className="form-group">
              <label>Review</label>
              <textarea
                value={newReview.review}
                onChange={(e) => setNewReview({...newReview, review: e.target.value})}
                placeholder="Share your experience..."
                rows={4}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Submit Review</button>
          </form>
        </motion.div>
      )}

      <div className="reviews-list">
        {reviews.map((review) => (
          <motion.div 
            key={review.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="review-card glass-container"
          >
            <div className="review-header">
              <div>
                <h3>{review.company}</h3>
                <p className="position">{review.position}</p>
              </div>
              <div className="review-actions">
                <button className="btn-icon" onClick={() => deleteReview(review.id)}>
                  <FiTrash2 />
                </button>
              </div>
            </div>
            <div className="rating">
              {renderStars(review.rating)}
            </div>
            <p className="review-text">{review.review}</p>
            <small className="review-date">{review.date}</small>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Reviews;