import { Link } from 'react-router-dom';
import "../shop.css"

export default function Product({ product }) {
    const rating = (product.ratings / 5) * 100;
    
    return (
        <div class="product-card">
            
            <div class="product-image-container">
            {product.image && (
        <img
            className="product-image"
            src={product.image} // ✅ Use `product.image` directly
            alt={product.name}
        />
    )}
                <div class="product-actions">
                    <button class="quick-view-button">Quick View</button>
                </div>
                
            </div>
            <div class="product-info">
                <h3 class="product-name">
                    <Link to={`/product/${product._id}`}>{product.name}</Link>
                </h3>
                <div class="product-rating">
                    <div class="stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                                key={star}
                                class={star <= product.ratings ? 'filled' : ''}
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                        ))}
                    </div>
                    <span class="rating-count">({product.numOfReviews} Reviews)</span>
                </div>
                <div class="product-price">${product.price}</div>
                <Link 
                    to={`/product/${product._id}`} 
                    class="view-details-button"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}