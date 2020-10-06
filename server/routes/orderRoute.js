import { Router } from 'express';
import Order from '../models/Order';
import { isAuth, isAdmin } from '../utils';

const router = Router();

router.get('/', isAuth, isAdmin, async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user');
        res.json({ orders });
    } catch (error) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
});

router.get('/mine', isAuth, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id });
        res.json({ orders });
    } catch (error) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
});

router.get('/:id', isAuth, async (req, res) => {
    try {
        const order = await Order.findOne({ _id: req.params.id }).populate('user');
        if (order) {
            res.json({ order });
        } else {
            res.status(404).json({ message: 'Заказ не найден' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
});

router.post('/', isAuth, async (req, res) => {
    try {
        const order = new Order({
            orderItems: req.body.orderItems,
            user: req.user._id,
            totalPrice: req.body.totalPrice,
            date: Date().toString().split(' GMT')[0],
        });
        const newOrder = await order.save();
        res.status(201).json({ message: 'Новый заказ создан', order: newOrder });
    } catch (error) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
});

router.delete('/:id', isAuth, async (req, res) => {
    try {
        const order = await Order.findOne({ _id: req.params.id });
        if (order) {
            const deletedOrder = await order.remove();
            res.json({ message: 'Заказ удален', order: deletedOrder });
        } else {
            res.status(404).json({ message: 'Заказ не найден' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
});

export default router;
