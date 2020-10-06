import React from 'react';
import CartItem from '../components/CartItem';
import { clearCartItems } from '../redux/actions/cart';
import { createOrder } from '../redux/actions/orders';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Empty from '../components/Empty';
import shoppingCart from '../assets/images/shopping-cart.svg';
import Popup from '../components/Popup';

function CartPage(props) {
    const { cartItems, loading, error } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [popupActive, setPopupActive] = React.useState(false);

    const onConfirm = React.useCallback(() => {
        const order = {
            orderItems: cartItems,
            totalPrice: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        };
        dispatch(createOrder(order)).then(() => {
            dispatch(clearCartItems());
            props.history.push('/profile');
        });
        setPopupActive(false);
    }, []);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <Error error={error} />;
    }

    return (
        <div className="cart">
            {popupActive && (
                <Popup
                    text="Подтвердите оплату"
                    onConfirm={onConfirm}
                    onCancel={() => setPopupActive(false)}
                />
            )}
            {cartItems.length ? (
                <table className="highlight">
                    <thead>
                        <tr>
                            <th>Изображение</th>
                            <th>Модель</th>
                            <th>Категория</th>
                            <th>Количество</th>
                            <th>Цена</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item) => (
                            <CartItem key={item.product} item={item} />
                        ))}
                    </tbody>
                </table>
            ) : (
                <Empty title="Корзина пуста" image={shoppingCart} />
            )}
            {cartItems.length ? (
                <div className="cart-info">
                    <span className="cart-count">
                        Общее количество:{' '}
                        <strong>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</strong>
                    </span>
                    <span className="cart-price">
                        Общая цена:{' '}
                        <strong>
                            ${cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}
                        </strong>
                    </span>
                    <button
                        onClick={() => setPopupActive(true)}
                        className="waves-effect waves-light btn black cart-button">
                        Оплатить
                    </button>
                </div>
            ) : (
                <Link to="/" className="waves-effect waves-light btn black cart-back">
                    Вернуться назад
                </Link>
            )}
        </div>
    );
}

export default CartPage;
