import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteReview, getReviews } from "../../actions/productActions";
import { clearError, clearReviewDeleted } from "../../slices/productSlice";
import { toast } from 'react-toastify';
import { MDBDataTable } from 'mdbreact';
import Loader from '../layouts/Loader';
import Sidebar from "./Sidebar";
import { Trash2, Search } from 'lucide-react';
import "./ReviewList.css";

export default function ReviewList() {
    const { reviews = [], loading = true, error, isReviewDeleted } = useSelector(state => state.productState);
    const [productId, setProductId] = useState("");
    const dispatch = useDispatch();

    const setReviews = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Rating',
                    field: 'rating',
                    sort: 'asc'
                },
                {
                    label: 'User',
                    field: 'user',
                    sort: 'asc'
                },
                {
                    label: 'Comment',
                    field: 'comment',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }
            ],
            rows: []
        };

        reviews.forEach(review => {
            data.rows.push({
                id: review._id,
                rating: (
                    <div className="review-rating">
                        <span className="rating-value">{review.rating}</span>
                        <div className="rating-stars">
                            <div className="rating-filled" style={{ width: `${(review.rating / 5) * 100}%` }}></div>
                        </div>
                    </div>
                ),
                user: review.user.name,
                comment: review.comment,
                actions: (
                    <button
                        onClick={e => deleteHandler(e, review._id)}
                        className="delete-btn"
                        aria-label="Delete review"
                    >
                        <Trash2 size={18} />
                    </button>
                )
            });
        });

        return data;
    };

    const deleteHandler = (e, id) => {
        e.target.disabled = true;
        dispatch(deleteReview(productId, id));
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(getReviews(productId));
    };

    useEffect(() => {
        if (error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearError()) }
            });
            return;
        }
        if (isReviewDeleted) {
            toast('Review Deleted Successfully!', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearReviewDeleted())
            });
            dispatch(getReviews(productId));
            return;
        }
    }, [dispatch, error, isReviewDeleted, productId]);

    return (
        <div className="admin-layout">

            <Sidebar />

            <div className="content-container">
                <div className="review-list-wrapper">
                    <div className="page-header">
                        <h1>Review List</h1>
                    </div>

                    <div className="search-section">
                        <form onSubmit={submitHandler} className="search-form">
                            <div className="form-group">
                                <label htmlFor="productId">Product ID</label>
                                <div className="input-wrapper">
                                    <input
                                        type="text"
                                        id="productId"
                                        onChange={e => setProductId(e.target.value)}
                                        value={productId}
                                        placeholder="Enter product ID"
                                    />
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="search-btn"
                                    >
                                        <Search size={20} />
                                        Search
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="reviews-table-container">
                        {loading ? (
                            <Loader />
                        ) : (
                            <MDBDataTable
                                data={setReviews()}
                                bordered
                                striped
                                hover
                                className="reviews-table"
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}