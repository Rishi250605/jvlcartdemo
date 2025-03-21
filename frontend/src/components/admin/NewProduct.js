import { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";
import { createNewProduct } from "../../actions/productActions";
import { clearError, clearProductCreated } from "../../slices/productSlice";
import { toast } from "react-toastify";

export  default function NewProduct () {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [sizes, setSizes] = useState([{ size: '', price: '' }]);
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
    const [stock, setStock] = useState(0);
    
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    
    
    const { loading, isProductCreated, error } = useSelector( state => state.productState)

    const [nutrition, setNutrition] = useState({
        energy: "",
        carbohydrates: "",
        protein: "",
        fat: ""
    });
    
    const handleNutritionChange = (e) => {
        setNutrition({ ...nutrition, [e.target.name]: e.target.value });
    };
    

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onImageChange = (e) => {
        const file = e.target.files[0]; // Get the selected file
    
        if (file) {
            const reader = new FileReader();
    
            reader.onloadend = () => {
                setImagePreview(reader.result); // Set preview image
                setImage(file); // Set actual file
            };
    
            reader.readAsDataURL(file);
        }
    };
    
    

    const submitHandler = (e) => {
        e.preventDefault();
        console.log("Image before FormData:", image);
        const formData = new FormData();
        console.log("Image before FormData:", image); // Check if image exists
        formData.append('name', name);  
        formData.append('price', price);
        formData.append('stock', stock);
        formData.append('description', description);
    
        // Append Sizes as JSON
        formData.append('sizes', JSON.stringify(sizes));
    
        // Append Nutrition Info as JSON
        formData.append('nutritionalInformation', JSON.stringify(nutrition));
    
        formData.append('image', image);
        console.log("soldgolfnnaldfkgkn")
        formData.forEach((value, key) => {
            console.log(`SARANZ  ${key}: ${value} `);
        });
        
        dispatch(createNewProduct(formData));
    };
    

    useEffect(() => {
        if(isProductCreated) {
            toast('Product Created Succesfully!',{
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearProductCreated())
            })
            navigate('/admin/products')
            return;
        }

        if(error)  {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: ()=> { dispatch(clearError()) }
            })
            return
        }
    }, [isProductCreated, error, dispatch])


    return (
        <div className="row">
            <div className="col-12 col-md-2">
                    <Sidebar/>
            </div>
            <div className="col-12 col-md-10">
                <Fragment>
                    <div className="wrapper my-5"> 
                        <form onSubmit={submitHandler} className="shadow-lg" encType='multipart/form-data'>
                            <h1 className="mb-4">New Product</h1>

                            <div className="form-group">
                            <label htmlFor="name_field">Name</label>
                            <input
                                type="text"
                                id="name_field"
                                className="form-control"
                                onChange={e => setName(e.target.value)}
                                value={name}
                            />
                            </div>

                            <div className="form-group">
                                <label htmlFor="price_field">Price</label>
                                <input
                                type="text"
                                id="price_field"
                                className="form-control"
                                onChange={e => setPrice(e.target.value)}
                                value={price}
                                />
                            </div>
                            <div className="form-group">
    <label>Sizes & Prices</label>
    {sizes.map((s, index) => (
        <div key={index} className="d-flex mb-2">
            <input
                type="text"
                className="form-control mr-2"
                placeholder="Size"
                value={s.size}
                onChange={(e) => handleSizeChange(index, "size", e.target.value)}
            />
            <input
                type="number"
                className="form-control mr-2"
                placeholder="Price"
                value={s.price}
                onChange={(e) => handleSizeChange(index, "price", e.target.value)}
            />
            <button type="button" className="btn btn-danger" onClick={() => removeSizeField(index)}>X</button>
        </div>
    ))}
    <button type="button" className="btn btn-primary mt-2" onClick={addSizeField}>+ Add Size</button>
</div>

                            <div className="form-group">
                                <label htmlFor="description_field">Description</label>
                                <textarea 
                                    className="form-control"
                                    id="description_field" 
                                    rows="8"
                                    onChange={e => setDescription(e.target.value)}
                                    value={description}
                                  ></textarea>
                            </div>

                           
                            <div className="form-group">
                                <label htmlFor="stock_field">Stock</label>
                                <input
                                type="number"
                                id="stock_field"
                                className="form-control"
                                onChange={e => setStock(e.target.value)}
                                value={stock}
                                />
                            </div>
                            <div className="form-group">
    <label htmlFor="energy">Energy (kcal)</label>
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
    <label htmlFor="carbohydrates">Carbohydrates (g)</label>
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
    <label htmlFor="protein">Protein (g)</label>
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
    <label htmlFor="fat">Fat (g)</label>
    <input
        type="number"
        id="fat"
        name="fat"
        className="form-control"
        value={nutrition.fat}
        onChange={handleNutritionChange}
    />
</div>

                            
                            
<div className='form-group'>
    <label>Image</label>
    <div className='custom-file'>
        <input
            type='file'
            name='product_image'
            className='custom-file-input'
            id='customFile'
            onChange={onImageChange} // Updated function
        />
        <label className='custom-file-label' htmlFor='customFile'>
            Choose Image
        </label>
    </div>

    {/* Show preview only if an image is selected */}
    {imagePreview && (
        <img
            className="mt-3"
            src={imagePreview}
            alt="Image Preview"
            width="55"
            height="52"
        />
    )}
</div>

                
                            <button
                            id="login_button"
                            type="submit"
                            disabled={loading}
                            className="btn btn-block py-3"
                            >
                            CREATE
                            </button>

                        </form>
                    </div>
                </Fragment>
            </div>
        </div>
        
    )
}