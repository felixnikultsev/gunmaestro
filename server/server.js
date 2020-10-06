import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import config from './config';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute';
import uploadRoute from './routes/uploadRoute';
import productRoute from './routes/productRoute';
import orderRoute from './routes/orderRoute';

dotenv.config();

const mongodbUrl = config.MONGODB_URL;
mongoose
    .connect(mongodbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .catch((error) => console.log(error.reason));

const app = express();

app.use(bodyParser.json());
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/uploads', uploadRoute);
app.use('/api/orders', orderRoute);
app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));

app.listen(5000, () => {
    console.log('Server started at port 5000');
});
