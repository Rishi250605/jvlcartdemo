import React, { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { getProduct, updateProduct } from "../../actions/productActions";
import { clearError, clearProductUpdated } from "../../slices/productSlice";
import { toast } from "react-toastify";
import { Package, Plus, X, Upload, DollarSign, Scale, FileText, Box, Activity, Cookie, Beef, Droplet } from 'lucide-react';
import "./UpdateProduct.css";

export default function UpdateProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [stock, setStock] = useState(0);
    const [image, setImage] = useState(null);
    const [imageCleared, setImageCleared] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [sizes, setSizes] = useState([{ size: '', price: '' }]);
    const [nutrition, setNutrition] = useState({
        energy: "",
        carbohydrates: "",
        protein: "",
        fat: ""
    });

    const { id: productId } = useParams();
    const { loading, isProductUpdated, error, product } = useSelector(state => state.productState);
    const dispatch = useDispatch();

    const handleNutritionChange = (e) => {
        setNutrition({ ...nutrition, [e.target.name]: e.target.value });
    };

    const addSizeField = () => {
        setSizes([...sizes, { size: '', price: '' }]);
    };

    const handleSizeChange = (index, field, value) => {
        const updatedSizes = [...sizes];
        updatedSizes[index][field] = value;
        setSizes(updatedSizes);
    };

    const removeSizeField = (index) => {
        setSizes(sizes.filter((_, i) => i !== index));
    };

    const clearImage = () => {
        setImage(null);
        setImagePreview(null);
        setImageCleared(true);
    };

    const onImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setImage(file);
                setImageCleared(false);
            };
            reader.readAsDataURL(file);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name || product.name);
        formData.append('price', price !== "" ? price : product.price);
        formData.append('stock', stock !== "" ? stock : product.stock);
        formData.append('description', description || product.description);
        formData.append('sizes', JSON.stringify(sizes));
        formData.append('nutritionalInformation', JSON.stringify(nutrition));
        if (image) formData.append('image', image);
        formData.append('imageCleared', imageCleared);
        dispatch(updateProduct(productId, formData));
    };

    useEffect(() => {
        if (isProductUpdated) {
            toast('Product Updated Successfully!', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearProductUpdated())
            });
            return;
        }

        if (error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearError()) }
            });
            return;
        }

        dispatch(getProduct(productId));
    }, [isProductUpdated, error, dispatch, productId]);

    useEffect(() => {
        if (product._id) {
            setName(product.name);
            setPrice(product.price);
            setStock(product.stock);
            setDescription(product.description);
            setSizes(product.sizes || [{ size: '', price: '' }]);
            setNutrition(product.nutritionalInformation || {
                energy: "",
                carbohydrates: "",
                protein: "",
                fat: ""
            });
            setImagePreview(product.image);
        }
    }, [product]);

    return (
        <div className="admin-layout">
            
                <Sidebar />
            
            <div className="content-container">
                <div className="page-header">
                    <div className="header-content">
                        <Package size={24} className="header-icon" />
                        <h1>Update Product</h1>
                    </div>
                </div>

                <div className="update-product-card">
                    <form onSubmit={submitHandler} encType='multipart/form-data'>
                        <div className="form-group">
                            <label htmlFor="name_field">
                                <FileText size={18} className="icon" /> Product Name
                            </label>
                            <input
                                type="text"
                                id="name_field"
                                className="form-control"
                                onChange={e => setName(e.target.value)}
                                value={name}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="price_field">
                                <DollarSign size={18} className="icon" /> Base Price
                            </label>
                            <input
                                type="text"
                                id="price_field"
                                className="form-control"
                                onChange={e => setPrice(e.target.value)}
                                value={price}
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <Scale size={18} className="icon" /> Sizes & Prices
                            </label>
                            {sizes.map((s, index) => (
                                <div key={index} className="size-row">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Size"
                                        value={s.size}
                                        onChange={e => handleSizeChange(index, "size", e.target.value)}
                                    />
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Price"
                                        value={s.price}
                                        onChange={e => handleSizeChange(index, "price", e.target.value)}
                                    />
                                    <button 
                                        type="button" 
                                        className="remove-size-btn"
                                        onClick={() => removeSizeField(index)}
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                            ))}
                            <button type="button" className="add-size-btn" onClick={addSizeField}>
                                <Plus size={18} /> Add Size
                            </button>
                        </div>

                        <div className="form-group">
                            <label htmlFor="description_field">
                                <FileText size={18} className="icon" /> Description
                            </label>
                            <textarea
                                className="form-control"
                                id="description_field"
                                rows="8"
                                onChange={e => setDescription(e.target.value)}
                                value={description}
                            ></textarea>
                        </div>

                        <div className="form-group">
                            <label htmlFor="stock_field">
                                <Box size={18} className="icon" /> Stock
                            </label>
                            <input
                                type="number"
                                id="stock_field"
                                className="form-control"
                                onChange={e => setStock(e.target.value)}
                                value={stock}
                            />
                        </div>

                        <div className="form-group">
                            <label>Nutritional Information</label>
                            <div className="nutrition-grid">
                                <div className="form-group">
                                    <label htmlFor="energy">
                                        <Activity size={18} className="icon" /> Energy (kcal)
                                    </label>
                                    <input
                                        type="number"
                                        id="energy"
                                        name="energy"
                                        className="form-control"
                                        value={nutrition.energy}
                                        onChange={handleNutritionChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="carbohydrates">
                                        <Cookie size={18} className="icon" /> Carbohydrates (g)
                                    </label>
                                    <input
                                        type="number"
                                        id="carbohydrates"
                                        name="carbohydrates"
                                        className="form-control"
                                        value={nutrition.carbohydrates}
                                        onChange={handleNutritionChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="protein">
                                        <Beef size={18} className="icon" /> Protein (g)
                                    </label>
                                    <input
                                        type="number"
                                        id="protein"
                                        name="protein"
                                        className="form-control"
                                        value={nutrition.protein}
                                        onChange={handleNutritionChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="fat">
                                        <Droplet size={18} className="icon" /> Fat (g)
                                    </label>
                                    <input
                                        type="number"
                                        id="fat"
                                        name="fat"
                                        className="form-control"
                                        value={nutrition.fat}
                                        onChange={handleNutritionChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Product Image</label>
                            <div className="image-upload">
                                <input
                                    type="file"
                                    onChange={onImageChange}
                                    accept="image/*"
                                />
                                <Upload size={24} />
                                <p>Click or drag image to upload</p>
                            </div>
                            {imagePreview && (
                                <div className="image-preview">
                                    <img src={imagePreview} alt="Preview" />
                                    <button
                                        type="button"
                                        className="clear-image-btn"
                                        onClick={clearImage}
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="update-btn"
                        >
                            <Upload size={18} />
                            {loading ? 'Updating...' : 'Update Product'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}