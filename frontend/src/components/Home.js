import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import Loader from "./layouts/Loader";
import MetaData from "./layouts/MetaData";
import Product from "./product/Product";
import { toast } from 'react-toastify';
import "./shop.css";
export default function Home() {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.productsState)

    useEffect(() => {
        if(error) {
            return toast.error(error, {
                position: toast.POSITION.BOTTOM_CENTER
            })
        }
        dispatch(getProducts())
    }, [error, dispatch])

    return (
        <Fragment>
            {loading ? <Loader/> : (
                <Fragment>
                    <MetaData title={'Buy Best Products'} />
                    <div className="shop-page">
                        <div className="shop-hero">
                            <div className="shop-hero-content">
                                <h1>Discover Our Products</h1>
                                <p>Browse through our carefully selected collection of premium products</p>
                            </div>
                        </div>
                        
                        <div className="shop-container">
                            <h2 className="products-title">
                                Latest Products
                                <span className="product-count">
                                    ({products?.length || 0} Products)
                                </span>
                            </h2>
                            
                            <div className="product-grid">
                                {products && products.map(product => (
                                    <Product key={product._id} product={product} />
                                ))}
                            </div>
                            
                            {(!products || products.length === 0) && (
                                <div className="no-products">
                                    <h3>No Products Found</h3>
                                    <p>We couldn't find any products matching your criteria.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
}