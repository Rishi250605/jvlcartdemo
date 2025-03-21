import { addCartItemRequest, addCartItemSuccess } from '../slices/cartSlice';
import axios from 'axios';

export const addCartItem = (id, quantity, size) => async (dispatch) => {
    try {
        dispatch(addCartItemRequest());

        const { data } = await axios.get(`/api/v1/product/${id}`);

        console.log("API Response:", data.product);
        console.log("Sizes Data:", data.product.sizes);

        // Extract correct price based on selected size
        const selectedSizeData = data.product.sizes.find(s => s.size === size);
        const selectedSizePrice = selectedSizeData ? selectedSizeData.price : data.product.price;

        dispatch(addCartItemSuccess({
            product: data.product._id,
            name: data.product.name,
            price: selectedSizePrice,  // ✅ Now using the correct price
            image: data.product.image,
            stock: data.product.stock,
            quantity,
            size,  
        }));
    } catch (error) {
        console.error('Error adding item to cart:', error);
    }
};
