import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createReview, getProduct } from "../../actions/productActions";
import { addCartItem } from "../../actions/cartActions";
import { clearReviewSubmitted, clearError, clearProduct } from '../../slices/productSlice';
import { toast } from "react-toastify";
import Loader from '../layouts/Loader';
import MetaData from "../layouts/MetaData";
import ProductReview from "./ProductReview";
import { Star, ShoppingCart, ChevronRight, Heart, Share2, Shield, Truck, RefreshCw, Award } from 'lucide-react';
import "./ProductDetail.css";

const ReviewModal = ({ show, handleClose, rating, setRating, comment, setComment, reviewHandler }) => (
  <div className={`review-modal ${show ? 'show' : ''}`}>
    <div className="review-modal-content">
      <h2>Share Your Experience</h2>
      <p className="review-subtitle">Your review helps others make better choices</p>

      <div className="rating-selector">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className={`star-btn ${star <= rating ? 'active' : ''}`}
            aria-label={`Rate ${star} stars`}
          >
            <Star className={star <= rating ? 'filled' : ''} />
          </button>
        ))}
      </div>

      <textarea
        className="review-comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Tell us what you liked or didn't like about this product..."
      />

      <div className="modal-actions">
        <button className="cancel-btn" onClick={handleClose}>Cancel</button>
        <button className="submit-btn" onClick={reviewHandler}>Submit Review</button>
      </div>
    </div>
  </div>
);

const ProductFeatures = () => (
  <div className="product-features">
    <div className="feature-card">
      <Shield className="feature-icon" />
      <h4>Quality Guaranteed</h4>
      <p>100% authentic products</p>
    </div>
    <div className="feature-card">
      <Truck className="feature-icon" />
      <h4>Fast Delivery</h4>
      <p>Free shipping on orders above ₹500</p>
    </div>
    <div className="feature-card">
      <RefreshCw className="feature-icon" />
      <h4 className="easy">Easy Returns</h4>
      <p>10-day return policy</p>
    </div>
    <div className="feature-card">
      <Award className="feature-icon" />
      <h4>Premium Quality</h4>
      <p>Certified organic products</p>
    </div>
  </div>
);

function ProductDetail() {
  const { loading, product = {}, isReviewSubmitted, error } = useSelector((state) => state.productState);
  const { user } = useSelector(state => state.authState);
  const dispatch = useDispatch();
  const { id } = useParams();

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [price, setPrice] = useState(product.price);
  const [show, setShow] = useState(false);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0].size);
      setPrice(product.sizes[0].price);
    }
  }, [product.sizes]);

  const increaseQty = () => {
    if (product.stock === 0 || quantity >= product.stock) return;
    setQuantity(prev => prev + 1);
  };

  const decreaseQty = () => {
    if (quantity <= 1) return;
    setQuantity(prev => prev - 1);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const reviewHandler = () => {
    const formData = new FormData();
    formData.append('rating', rating);
    formData.append('comment', comment);
    formData.append('productId', id);
    dispatch(createReview(formData));
  };

  const addToCartHandler = () => {
    if (!selectedSize) {
      toast("Please select a size", {
        type: "warning",
        position: toast.POSITION.BOTTOM_CENTER
      });
      return;
    }
    dispatch(addCartItem(product._id, quantity, selectedSize, price));
    toast('Cart Item Added!', {
      type: 'success',
      position: toast.POSITION.BOTTOM_CENTER
    });
  };

  useEffect(() => {
    if (isReviewSubmitted) {
      handleClose();
      toast('Review Submitted successfully', {
        type: 'success',
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearReviewSubmitted())
      });
    }
    if (error) {
      toast(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: 'error',
        onOpen: () => { dispatch(clearError()) }
      });
      return;
    }
    if (!product._id || isReviewSubmitted) {
      dispatch(getProduct(id));
    }

    return () => {
      dispatch(clearProduct());
    };
  }, [dispatch, id, isReviewSubmitted, error]);

  if (loading) return <Loader />;

  return (
    <Fragment>
      <MetaData title={product.name} />
      <div className="product-detail-wrapper">
        <div className="breadcrumb">
          <span>Home</span>
          <ChevronRight size={16} />
          <span>Products</span>
          <ChevronRight size={16} />
          <span className="current">{product.name}</span>
        </div>

        <div className="product-detail-container">
          <div className="product-detail-main">
            <div className="product-image-section">
              <div className="product-image-containers">
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-main-image"
                  />
                )}
                <div className="image-actions">
                  <button className="action-btn" aria-label="Add to wishlist">
                    <Heart />
                  </button>
                  <button className="action-btn" aria-label="Share product">
                    <Share2 />
                  </button>
                </div>
              </div>
            </div>

            <div className="product-info-sections">
              <div className="info-section">
                <h3>Product Description</h3>
                <p>{product.description}</p>
              </div>

              <div className="info-section">
                <h3>Nutritional Information</h3>
                {product.nutritionalInformation ? (
                  <div className="nutrition-grid">
                    <div className="nutrition-item">
                      <span>Energy</span>
                      <span>{product.nutritionalInformation.energy} kcal</span>
                    </div>
                    <div className="nutrition-item">
                      <span>Protein</span>
                      <span>{product.nutritionalInformation.protein}g</span>
                    </div>
                    <div className="nutrition-item">
                      <span>Fat</span>
                      <span>{product.nutritionalInformation.fat}g</span>
                    </div>
                    <div className="nutrition-item">
                      <span>Carbohydrates</span>
                      <span>{product.nutritionalInformation.carbohydrates}g</span>
                    </div>
                  </div>
                ) : (
                  <p>No nutritional information available</p>
                )}
              </div>
            </div>
          </div>

          <div className="product-detail-sidebar">
            <div className="product-header">
              <h1 className="product-name">{product.name}</h1>
              <p className="product-id">Product #{product._id}</p>
            </div>

            <div className="rating-section">
              <div className="rating-stars">
                <div className="rating-filled" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
              </div>
              <span className="review-count">{product.numOfReviews} Reviews</span>
            </div>

            <div className="price-section">
              <h2 className="product-price">₹{price}</h2>
              <p className="stock-status">
                Status:
                <span className={product.stock > 0 ? 'in-stock' : 'out-of-stock'}>
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </p>
            </div>

            <div className="purchase-section">
              <div className="size-selector">
                <h3>Select Size</h3>
                <div className="size-options">
                  {product.sizes && product.sizes.length > 0 ? (
                    product.sizes.map((sizeObj, index) => (
                      <button
                        key={index}
                        className={`size-btn ${selectedSize === sizeObj.size ? 'selected' : ''}`}
                        onClick={() => {
                          setSelectedSize(sizeObj.size);
                          setPrice(sizeObj.price);
                        }}
                      >
                        {sizeObj.size}
                      </button>
                    ))
                  ) : (
                    <p className="no-sizes">No sizes available</p>
                  )}
                </div>
              </div>

              <div className="quantity-section">
                <h3>Quantity</h3>
                <div className="quantity-selector">
                  <button
                    className="quantity-btn minus"
                    onClick={decreaseQty}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="quantity-input"
                    value={quantity}
                    readOnly
                  />
                  <button
                    className="quantity-btn plus"
                    onClick={increaseQty}
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                className="add-to-cart-btn"
                disabled={product.stock === 0}
                onClick={addToCartHandler}
              >
                <ShoppingCart />
                Add to Cart
              </button>
            </div>


          </div>
        </div>

        <div className="product-features-section">
          <ProductFeatures />
        </div>

        <div className="review-sections">
          {user ? (
            <button className="review-btn" onClick={handleShow}>
              Write a Review
            </button>
          ) : (
            <div className="login-alert">
              Please login to submit a review
            </div>
          )}

          {product.reviews && product.reviews.length > 0 && (
            <div className="reviews-section">

              <ProductReview reviews={product.reviews} />
            </div>
          )}
        </div>
      </div>

      <ReviewModal
        show={show}
        handleClose={handleClose}
        rating={rating}
        setRating={setRating}
        comment={comment}
        setComment={setComment}
        reviewHandler={reviewHandler}
      />
    </Fragment>
  );
}

export default ProductDetail;