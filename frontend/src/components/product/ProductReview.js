import React from 'react';
import { Star, StarHalf, User } from 'lucide-react';
import './ProductReview.css';

export default function ProductReview({ reviews }) {
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<Star key={`star-${i}`} className="star filled" />);
        }

        if (hasHalfStar) {
            stars.push(<StarHalf key="half-star" className="star filled" />);
        }

        const remainingStars = 5 - Math.ceil(rating);
        for (let i = 0; i < remainingStars; i++) {
            stars.push(<Star key={`empty-star-${i}`} className="star" />);
        }

        return stars;
    };

    return (
        <div className="reviews-container">
            <h2 className="reviews-title">Customer Reviews</h2>
            
            {reviews && reviews.length > 0 ? (
                <div className="reviews-grid">
                    {reviews.map(review => (
                        <div key={review._id} className="review-card">
                            <div className="review-header">
                                <div className="user-info">
                                    <div className="user-avatar">
                                        <User size={24} />
                                    </div>
                                    <span className="user-name">{review.user.name}</span>
                                </div>
                                
                            </div>
                            
                            <div className="rating-stars">
                                {renderStars(review.rating)}
                            </div>
                            
                            <p className="review-comment">{review.comment}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="no-reviews">
                    <p>No reviews yet. Be the first to review this product!</p>
                </div>
            )}
        </div>
    );
}