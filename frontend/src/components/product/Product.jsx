import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import "./Product.css";

export default function Product({ product }) {
    return (
        <div className="product-card">
            {product.stock <= 0 && (
                <span className="out-of-stock-badge">Out of Stock</span>
            )}

            <div className="product-image-container">
                {product.image && (
                    <img
                        className="product-image"
                        src={product.image}
                        alt={product.name}
                    />
                )}
            </div>

            <div className="product-info">
                <div className="product-infing">
                    <Link to={`/product/${product._id}`} className="product-name">
                        {product.name}
                    </Link>

                    <div className="product-rating">
                        <div className="stars">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    size={16}
                                    className={`star-icon ${star <= product.ratings ? 'filled' : ''}`}
                                />
                            ))}
                        </div>
                        <span className="rating-count">({product.numOfReviews} Reviews)</span>
                    </div>

                    <div className="product-price">${product.price}</div>
                </div>

                <div className="product-actions">

                    <Link
                        to={`/product/${product._id}`}
                        className="view-details-button"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}