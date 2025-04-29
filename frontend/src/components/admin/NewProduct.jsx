import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { createNewProduct } from "../../actions/productActions";
import { clearError, clearProductCreated } from "../../slices/productSlice";
import { toast } from "react-toastify";
import { Plus, X, Upload, Package } from 'lucide-react';
import './NewProduct.css';

export default function NewProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [sizes, setSizes] = useState([{ size: '', price: '' }]);
    const [stock, setStock] = useState(0);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [nutrition, setNutrition] = useState({
        energy: "",
        carbohydrates: "",
        protein: "",
        fat: ""
    });

    const { loading, isProductCreated, error } = useSelector(state => state.productState);
    const navigate = useNavigate();
    const dispatch = useDispatch();

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

    const handleNutritionChange = (e) => {
        setNutrition({ ...nutrition, [e.target.name]: e.target.value });
    };

    const onImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setImage(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('stock', stock);
        formData.append('description', description);
        formData.append('sizes', JSON.stringify(sizes));
        formData.append('nutritionalInformation', JSON.stringify(nutrition));
        formData.append('image', image);
        dispatch(createNewProduct(formData));
    };

    useEffect(() => {
        if (isProductCreated) {
            toast('Product Created Successfully!', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearProductCreated())
            });
            navigate('/admin/products');
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
    }, [isProductCreated, error, dispatch]);

    return (
        <div className="admin-layout">
            <Sidebar />
            <main className="admin-main">
                <div className="new-product-container">
                    <div className="page-header">
                        <Package className="header-icons" />
                        <h1>New Product</h1>
                    </div>

                    <form onSubmit={submitHandler} className="product-form" encType='multipart/form-data'>
                        <div className="form-grid">
                            <div className="form-section">
                                <h2>Basic Information</h2>
                                <div className="form-group">
                                    <label htmlFor="name_field">Product Name</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        onChange={e => setName(e.target.value)}
                                        value={name}
                                        placeholder="Enter product name"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="price_field">Base Price</label>
                                    <input
                                        type="text"
                                        id="price_field"
                                        onChange={e => setPrice(e.target.value)}
                                        value={price}
                                        placeholder="Enter base price"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description_field">Description</label>
                                    <textarea
                                        id="description_field"
                                        rows="4"
                                        onChange={e => setDescription(e.target.value)}
                                        value={description}
                                        placeholder="Enter product description"
                                    ></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="stock_field">Stock Quantity</label>
                                    <input
                                        type="number"
                                        id="stock_field"
                                        onChange={e => setStock(e.target.value)}
                                        value={stock}
                                        placeholder="Enter stock quantity"
                                    />
                                </div>
                            </div>

                            <div className="form-section">
                                <h2>Size Variants</h2>
                                <div className="sizes-container">
                                    {sizes.map((s, index) => (
                                        <div key={index} className="size-row">
                                            <input
                                                type="text"
                                                placeholder="Size (e.g., Small)"
                                                value={s.size}
                                                onChange={(e) => handleSizeChange(index, "size", e.target.value)}
                                            />
                                            <input
                                                type="number"
                                                placeholder="Price"
                                                value={s.price}
                                                onChange={(e) => handleSizeChange(index, "price", e.target.value)}
                                            />
                                            <button
                                                type="button"
                                                className="remove-size"
                                                onClick={() => removeSizeField(index)}
                                            >
                                                <X size={18} />
                                            </button>
                                        </div>
                                    ))}
                                    <button type="button" className="add-size" onClick={addSizeField}>
                                        <Plus size={18} />
                                        Add Size Variant
                                    </button>
                                </div>
                            </div>

                            <div className="form-section">
                                <h2>Nutritional Information</h2>
                                <div className="nutrition-grid">
                                    <div className="form-group">
                                        <label htmlFor="energy">Energy (kcal)</label>
                                        <input
                                            type="number"
                                            id="energy"
                                            name="energy"
                                            value={nutrition.energy}
                                            onChange={handleNutritionChange}
                                            placeholder="Enter energy value"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="carbohydrates">Carbohydrates (g)</label>
                                        <input
                                            type="number"
                                            id="carbohydrates"
                                            name="carbohydrates"
                                            value={nutrition.carbohydrates}
                                            onChange={handleNutritionChange}
                                            placeholder="Enter carbs value"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="protein">Protein (g)</label>
                                        <input
                                            type="number"
                                            id="protein"
                                            name="protein"
                                            value={nutrition.protein}
                                            onChange={handleNutritionChange}
                                            placeholder="Enter protein value"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="fat">Fat (g)</label>
                                        <input
                                            type="number"
                                            id="fat"
                                            name="fat"
                                            value={nutrition.fat}
                                            onChange={handleNutritionChange}
                                            placeholder="Enter fat value"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-section">
                                <h2>Product Image</h2>
                                <div className="image-upload-container">
                                    <input
                                        type="file"
                                        name="product_image"
                                        id="customFile"
                                        onChange={onImageChange}
                                        className="file-input"
                                    />
                                    <label htmlFor="customFile" className="upload-label">
                                        <Upload size={24} />
                                        <span>Choose Image</span>
                                    </label>
                                    {imagePreview && (
                                        <div className="image-preview">
                                            <img src={imagePreview} alt="Preview" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="submit-button"
                        >
                            {loading ? 'Creating...' : 'Create Product'}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}