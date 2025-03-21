const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middlewares/catchAsyncError')
const APIFeatures = require('../utils/apiFeatures');

//Get Products - /api/v1/products
exports.getProducts = catchAsyncError(async (req, res, next) => {
    const resPerPage = 3;

    let buildQuery = () => {
        return new APIFeatures(Product.find(), req.query).search().filter()
    }

    const filteredProductsCount = await buildQuery().query.countDocuments({})
    const totalProductsCount = await Product.countDocuments({});
    let productsCount = totalProductsCount;

    if (filteredProductsCount !== totalProductsCount) {
        productsCount = filteredProductsCount;
    }

    const products = await buildQuery().paginate(resPerPage).query;

    res.status(200).json({
        success: true,
        count: productsCount,
        resPerPage,
        products
    })
})

exports.newProduct = catchAsyncError(async (req, res, next) => {
    console.log("req.file:", req.file);

    // console
    // console.log("sanjayyyyyyyyyyyyyy")
    console.log("hello from backend sanajay thevdiya", JSON.parse(req.body.nutritionalInformation));
    // console.log("22222 hello from backend sanajay thevdiya", typeof req.file);
    
    let BASE_URL = process.env.BACKEND_URL;
    if (process.env.NODE_ENV === "production") {
        console.log("hello 1");
        BASE_URL = `${req.protocol}://${req.get('host')}`;

    }
    console.log("base url", BASE_URL);
    if (req.file) {
        req.body.image = `${BASE_URL}/uploads/product/${req.file.filename}`;
        console.log("Image Path Assigned:", req.body.image);
    } else {
        return next(new ErrorHandler("Image file is required", 400));
    }
    

    req.body.user = req.user.id;
    

    console.log("hello 3");
    

    req.body.user = req.user.id;
    if (req.body.sizes) {
        console.log("hello 4");
        try {
            req.body.sizes = JSON.parse(req.body.sizes);
            if (!Array.isArray(req.body.sizes)) {
                console.log("hello 5");
                return next(new ErrorHandler('Invalid sizes format', 400));
            }
        } catch (error) {
            return next(new ErrorHandler('Invalid sizes format', 400));
        }
    }
    console.log("hello 6");

    req.body.nutritionalInformation = JSON.parse(req.body.nutritionalInformation);

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
});




//Get Single Product - api/v1/product/:id
exports.getSingleProduct = catchAsyncError(async (req, res, next) => {

    const product = await Product.findById(req.params.id).select("+size").populate("reviews.user", "name email");


    if (!product) {
        return next(new ErrorHandler('Product not found', 400));
    }
    console.log("products", JSON.stringify(product));
    res.status(201).json({
        success: true,
        product
    })
})

//Update Product - api/v1/product/:id
exports.updateProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    //uploading images
    let images = []

    //if images not cleared we keep existing images
    if (req.body.imagesCleared === 'false') {
        images = product.images;
    }
    let BASE_URL = process.env.BACKEND_URL;
    if (process.env.NODE_ENV === "production") {
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }

    if (req.files.length > 0) {
        req.files.forEach(file => {
            let url = `${BASE_URL}/uploads/product/${file.originalname}`;
            images.push({ image: url })
        })
    }


    req.body.images = images;
    if (req.body.sizes) {
        try {
            req.body.sizes = JSON.parse(req.body.sizes);
            if (!Array.isArray(req.body.sizes)) {
                return next(new ErrorHandler('Invalid sizes format', 400));
            }
        } catch (error) {
            return next(new ErrorHandler('Invalid sizes format', 400));
        }
    }

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    console.log("from bk ", product);
    res.status(200).json({
        success: true,
        product
    })

})

//Delete Product - api/v1/product/:id
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    await product.remove();

    res.status(200).json({
        success: true,
        message: "Product Deleted!"
    })

})

//Create Review - api/v1/review
exports.createReview = catchAsyncError(async (req, res, next) => {
    const { productId, rating, comment } = req.body;

    const review = {
        user: req.user.id,
        rating,
        comment
    }

    const product = await Product.findById(productId);
    //finding user review exists
    const isReviewed = product.reviews.find(review => {
        return review.user.toString() == req.user.id.toString()
    })

    if (isReviewed) {
        //updating the  review
        product.reviews.forEach(review => {
            if (review.user.toString() == req.user.id.toString()) {
                review.comment = comment
                review.rating = rating
            }

        })

    } else {
        //creating the review
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }
    //find the average of the product reviews
    product.ratings = product.reviews.reduce((acc, review) => {
        return review.rating + acc;
    }, 0) / product.reviews.length;
    product.ratings = isNaN(product.ratings) ? 0 : product.ratings;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    })


})

//Get Reviews - api/v1/reviews?id={productId}
exports.getReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id).populate('reviews.user', 'name email');

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

//Delete Review - api/v1/review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    //filtering the reviews which does match the deleting review id
    const reviews = product.reviews.filter(review => {
        return review._id.toString() !== req.query.id.toString()
    });
    //number of reviews 
    const numOfReviews = reviews.length;

    //finding the average with the filtered reviews
    let ratings = reviews.reduce((acc, review) => {
        return review.rating + acc;
    }, 0) / reviews.length;
    ratings = isNaN(ratings) ? 0 : ratings;

    //save the product document
    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        numOfReviews,
        ratings
    })
    res.status(200).json({
        success: true
    })


});

// get admin products  - api/v1/admin/products
exports.getAdminProducts = catchAsyncError(async (req, res, next) => {
    const products = await Product.find();
    res.status(200).send({
        success: true,
        products
    })
});