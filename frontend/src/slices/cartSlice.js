import { createSlice } from "@reduxjs/toolkit";



const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')): [],
        loading: false,
        shippingInfo: localStorage.getItem('shippingInfo')? JSON.parse(localStorage.getItem('shippingInfo')): {}
    },
    reducers: {
        addCartItemRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        addCartItemSuccess(state, action) {
            const item = action.payload;
        
            // Find if the item with the same product AND selected size already exists
            const isItemExist = state.items.find(i => i.product === item.product && i.size === item.size);
            
            if (isItemExist) {
                // If the item exists, update its quantity (Keep the correct price)
                state.items = state.items.map(i =>
                    i.product === item.product && i.size === item.size
                        ? { ...i, quantity: i.quantity + item.quantity } 
                        : i
                );
            } else {
                // If item is new, store it with the correct price for the selected size
                state.items.push({
                    ...item,
                    price: item.price // Ensure selected size’s price is stored
                });
            }
        
            state.loading = false;
            localStorage.setItem('cartItems', JSON.stringify(state.items));
        },
        
        increaseCartItemQty(state, action) {
            state.items = state.items.map(item => {
                if (item.product === action.payload.product && item.size === action.payload.size) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
            localStorage.setItem('cartItems', JSON.stringify(state.items));
        },
        
        decreaseCartItemQty(state, action) {
            state.items = state.items.map(item => {
                if (item.product === action.payload.product && item.size === action.payload.size) {
                    return { ...item, quantity: Math.max(1, item.quantity - 1) };
                }
                return item;
            });
            localStorage.setItem('cartItems', JSON.stringify(state.items));
        },
        
        removeItemFromCart(state, action) {
            const filterItems = state.items.filter(item => {
                return item.product !== action.payload
            })
            localStorage.setItem('cartItems', JSON.stringify(filterItems));
            return {
                ...state,
                items: filterItems
            }
        },
        saveShippingInfo(state, action) {
            localStorage.setItem('shippingInfo', JSON.stringify(action.payload));
            return {
                ...state,
                shippingInfo: action.payload
            }
        },
        orderCompleted(state, action) {
            localStorage.removeItem('shippingInfo');
            localStorage.removeItem('cartItems');
            sessionStorage.removeItem('orderInfo');
            return {
                items: [],
                loading: false,
                shippingInfo: {}
            }
        }

    }
});

const { actions, reducer } = cartSlice;

export const { 
    addCartItemRequest, 
    addCartItemSuccess,
    decreaseCartItemQty,
    increaseCartItemQty,
    removeItemFromCart,
    saveShippingInfo,
    orderCompleted
 } = actions;

export default reducer;

