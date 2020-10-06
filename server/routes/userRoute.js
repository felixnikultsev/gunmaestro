import { Router } from 'express';
import User from '../models/User';
import { getToken, isAuth } from '../utils';
import { check, validationResult } from 'express-validator';

const router = Router();

router.post(
    '/register',
    [
        check('name', 'Поле имя является обязательным').isLength({ min: 1 }),
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 5 символов').isLength({ min: 5 }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при регистрации',
                });
            }

            const candidate = await User.findOne({ email: req.body.email });
            if (candidate) {
                return res
                    .status(400)
                    .json({ message: 'Пользователь с данным email уже существует' });
            }

            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            });
            const newUser = await user.save();
            res.status(201).json({
                message: 'Пользователь создан',
                user: {
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    isAdmin: newUser.isAdmin,
                    token: getToken(newUser),
                },
            });
        } catch (error) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
        }
    },
);

router.post('/auth', async (req, res) => {
    try {
        const authUser = await User.findOne({
            email: req.body.email,
            password: req.body.password,
        });

        if (!authUser) {
            return res.status(400).json({ message: 'Неверный логин или пароль' });
        }

        res.json({
            message: 'Авторизация прошла успешно',
            user: {
                _id: authUser._id,
                name: authUser.name,
                email: authUser.email,
                isAdmin: authUser.isAdmin,
                token: getToken(authUser),
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
});

router.put(
    '/:id',
    isAuth,
    [
        check('name', 'Поле имя является обязательным').isLength({ min: 1 }),
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 5 символов').isLength({ min: 5 }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при регистрации',
                });
            }

            const id = req.params.id;
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }

            const candidate = await User.findOne({ email: req.body.email });
            if (candidate && user.email !== req.body.email) {
                return res
                    .status(400)
                    .json({ message: 'Пользователь с данным email уже существует' });
            }

            user.name = req.body.name;
            user.email = req.body.email;
            user.password = req.body.password;
            const updatedUser = await user.save();
            res.json({
                message: 'Данные обновлены',
                user: {
                    _id: updatedUser._id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    isAdmin: updatedUser.isAdmin,
                    token: getToken(updatedUser),
                },
            });
        } catch (error) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
        }
    },
);

router.get('/createadmin', async (req, res) => {
    try {
        const user = new User({
            name: 'Felix',
            email: '7stormoond7@gmail.com',
            password: '123456',
            isAdmin: true,
        });

        const newUser = await user.save();
        res.json({ message: 'Пользователь создан', user: newUser });
    } catch (error) {
        res.json({ message: error.message });
    }
});

export default router;
