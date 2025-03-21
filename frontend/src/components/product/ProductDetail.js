import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { createReview, getProduct } from "../../actions/productActions"
import Loader from '../layouts/Loader';
import { Carousel } from 'react-bootstrap';
import MetaData from "../layouts/MetaData";
import { addCartItem } from "../../actions/cartActions";
import { clearReviewSubmitted, clearError, clearProduct } from '../../slices/productSlice';
import { Modal } from 'react-bootstrap';
import { toast } from "react-toastify";
import ProductReview from "./ProductReview";

export default function ProductDetail() {
    const { loading, product = {}, isReviewSubmitted, error } = useSelector((state) => state.productState);
    const { user } = useSelector(state => state.authState);
    const dispatch = useDispatch();
    const { id } = useParams()
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(""); // Added for size selection
    useEffect(() => {
        if (product.sizes && product.sizes.length > 0) {
            setSelectedSize(product.sizes[0].size); // Default to first size
            setPrice(product.sizes[0].price); // Default to first price
        }
    }, [product.sizes]); // Runs when product.sizes changes
    
    
    const [price, setPrice] = useState(product.price);


    const increaseQty = () => {
        const count = document.querySelector('.count')
        if (product.stock == 0 || count.valueAsNumber >= product.stock) return;
        const qty = count.valueAsNumber + 1;
        setQuantity(qty);
    }

    const decreaseQty = () => {
        const count = document.querySelector('.count')
        if (count.valueAsNumber == 1) return;
        const qty = count.valueAsNumber - 1;
        setQuantity(qty);
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState("");

    const reviewHandler = () => {
        const formData = new FormData();
        formData.append('rating', rating);
        formData.append('comment', comment);
        formData.append('productId', id);
        dispatch(createReview(formData))
    }

    useEffect(() => {
        if (isReviewSubmitted) {
            handleClose()
            toast('Review Submitted successfully', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearReviewSubmitted())
            })
        }
        if (error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearError()) }
            })
            return
        }
        if (!product._id || isReviewSubmitted) {
            dispatch(getProduct(id))
        }

        return () => {
            dispatch(clearProduct())
        }
    }, [dispatch, id, isReviewSubmitted, error])

    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title={product.name} />
                    <div className="row f-flex justify-content-around">
                        <div className="col-12 col-lg-5 img-fluid" id="product_image">
                        {product.image && (
        <img
            className="d-block w-100"
            src={product.image} // ✅ Access single image directly
            alt={product.name}
            height="500"
            width="500"
        />
    )}
                        </div>

                        <div className="col-12 col-lg-5 mt-5">
                            <h3>{product.name}</h3>
                            <p id="product_id">Product # {product._id}</p>

                            <hr />

                            <div className="rating-outer">
                                <div className="rating-inner" style={{ width: `${product.ratings / 5 * 100}%` }}></div>
                            </div>
                            <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>

                            <hr />

                            <p id="product_price">${price}</p>

                            <div className="stockCounter d-inline">
                                <span className="btn btn-danger minus" onClick={decreaseQty} >-</span>

                                <input type="number" className="form-control count d-inline" value={quantity} readOnly />

                                <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                            </div>

                            
                            {/* Size Selection */}
{product.sizes && product.sizes.length > 0 ? (
    <div className="d-flex">
        {product.sizes.map((sizeObj, index) => (
            <button
                key={index}
                className={`btn ${selectedSize === sizeObj.size ? "btn-primary" : "btn-outline-primary"} mx-2`}
                onClick={() => {
                    setSelectedSize(sizeObj.size);
                    setPrice(sizeObj.price); // Update price based on selected size
                }}
            >
                {sizeObj.size}
            </button>
        ))}
    </div>
) : (
    <p>No sizes available</p>
)}



<button 
    type="button" 
    id="cart_btn"
    disabled={product.stock === 0}
    onClick={() => {
        if (!selectedSize) {
            toast("Please select a size", { type: "warning", position: toast.POSITION.BOTTOM_CENTER });
            return;
        }
        dispatch(addCartItem(product._id, quantity, selectedSize, price)); // Pass the correct price
        toast('Cart Item Added!', {
            type: 'success',
            position: toast.POSITION.BOTTOM_CENTER
        });
    }}
    className="btn btn-primary d-inline ml-4"
>
    Add to Cart
</button>



                            <hr />

                            <p>Status: <span className={product.stock > 0 ? 'greenColor' : 'redColor'} id="stock_status">{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>

                            <hr />

                            <h4 className="mt-2">Description:</h4>
                            <p>{product.description}</p>
                            <hr />
                            <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>

                            {/* Nutritional Information */}
                            <div className="mt-4">
                                <h4>Nutritional Information:</h4>
                                {product.nutritionalInformation ? (
                                    <ul>
                                        <li><strong>Energy:</strong> {product.nutritionalInformation.energy} kcal</li>
                                        <li><strong>Protein:</strong> {product.nutritionalInformation.protein} g</li>
                                        <li><strong>Fat:</strong> {product.nutritionalInformation.fat} g</li>
                                        <li><strong>Carbohydrates:</strong> {product.nutritionalInformation.carbohydrates} g</li>
                                    </ul>
                                ) : (
                                    <p>No nutritional information available</p>
                                )}
                            </div>

                            {user ?
                                <button onClick={handleShow} id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal">
                                    Submit Your Review
                                </button> :
                                <div className="alert alert-danger mt-5"> Login to Post Review</div>
                            }

                        </div>
                    </div>

                    {product.reviews && product.reviews.length > 0 ?
                        <ProductReview reviews={product.reviews} /> : null
                    }
                </Fragment>}
        </Fragment>
    )
}
