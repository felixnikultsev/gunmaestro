import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    model: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
    countInStock: { type: Number, required: true, default: 0 },
    image: { type: String, required: true },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
