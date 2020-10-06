import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
    model: { type: String, required: true },
    quantity: { type: Number, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
});

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [orderItemSchema],
    totalPrice: { type: Number, required: true },
    date: { type: String, required: true },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
