import { Router } from 'express';
import Product from '../models/Product';
import { isAuth, isAdmin } from '../utils';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const category = req.query.category ? { category: req.query.category } : {};
        const searchKeyword = req.query.searchKeyword
            ? {
                  model: {
                      $regex: req.query.searchKeyword,
                      $options: 'i',
                  },
              }
            : {};
        const products = await Product.find({ ...category, ...searchKeyword });
        res.json({ products });
    } catch (error) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json({ product });
        } else {
            res.status(404).json({ message: 'Товар не найден' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
});

router.post('/', isAuth, isAdmin, async (req, res) => {
    try {
        if (Object.values(req.body).some((elem) => elem === '')) {
            return res.status(400).json({ message: 'Все поля должны быть заполнены' });
        }
        const product = new Product({
            model: req.body.model,
            category: req.body.category,
            price: req.body.price,
            description: req.body.description,
            countInStock: req.body.countInStock,
            image: req.body.image,
        });
        const newProduct = await product.save();
        res.status(201).json({ message: 'Новый товар создан', product: newProduct });
    } catch (error) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
});

router.put('/:id', isAuth, async (req, res) => {
    //Проверить корректность работы
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);

        product.model = req.body.model || product.model;
        product.price = !req.body.price && !req.body.proce !== 0 ? product.price : req.body.price;
        product.image = req.body.image || product.image;
        product.category = req.body.category || product.category;
        product.countInStock =
            !req.body.countInStock && req.body.countInStock !== 0
                ? product.countInStock
                : req.body.countInStock;
        product.description = req.body.description || product.description;

        const updatedProduct = await product.save();
        res.status(200).json({ message: 'Товар обновлен', product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
});

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
    try {
        const deletedProduct = await Product.findById(req.params.id);
        if (deletedProduct) {
            await deletedProduct.remove();
            res.json({ message: 'Товар удален', product: deletedProduct });
        } else {
            res.status(404).json('Товар не найден');
        }
    } catch (error) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
});

export default router;
