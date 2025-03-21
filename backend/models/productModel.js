const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, "Please enter product name"],
        trim: true,
        maxLength: [100, "Product name cannot exceed 100 characters"]
    },
    price: {
        type: Number,
        required: true,
        default: 0.0
    },
    description: {
        type: String,
        required: [true, "Please enter product description"]
    },
    nutritionalInformation: {
        energy: { type: String, required: true },
        carbohydrates: { type: String, required: true }, // in grams
        protein: { type: String, required: true }, // in grams
        fat: { type: String, required: true }, // in grams
        
    },
    sizes: [{
        size: {
            type: String,
            // enum: ["Small", "Medium", "Large"]
        },
        price: {
            type: Number,
            required: true
        }
    }],
    ratings: {
        type: String,
        default: 0
    },
    image: { type: String, required: true },
    stock: {
        type: Number,
        required: [true, "Please enter product stock"],
        maxLength: [20, 'Product stock cannot exceed 20']
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            rating: {
                type: String,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user: {
        type : mongoose.Schema.Types.ObjectId
    }
    ,
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

let schema = mongoose.model('Product', productSchema)

module.exports = schema