import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { getCurrentOrder, deleteOrder } from '../redux/actions/orders';
import { Link } from 'react-router-dom';
import Popup from '../components/Popup';

function OrderPage(props) {
    const dispatch = useDispatch();
    const { loading, error, currentOrder } = useSelector((state) => state.orders);
    const [popupActive, setPopupActive] = React.useState(false);

    const onConfirm = () => {
        dispatch(deleteOrder(currentOrder._id)).then(() => {
            props.history.push('/profile');
        });
        setPopupActive(false);
    };

    React.useEffect(() => {
        dispatch(getCurrentOrder(props.match.params.id));
    }, []); // eslint-disable-line

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <Error error={error} />;
    }

    return (
        <>
            {popupActive && (
                <Popup
                    text="Вы уверены, что хотите удалить заказ?"
                    onConfirm={onConfirm}
                    onCancel={() => setPopupActive(false)}
                />
            )}
            <Link
                to="/profile"
                className="waves-effect waves-light btn white black-text order-back-button btn-outlined">
                Вернуться назад
            </Link>
            <h3 className="order-title">
                Заказ: <strong>№{currentOrder._id}</strong>
                <br />
                Заказчик: {currentOrder.user && <strong>{currentOrder.user.name}</strong>}
                <br />
                Дата: <strong>{currentOrder.date}</strong>
                <br />
                Стоимость: <strong>${currentOrder.totalPrice}</strong>
            </h3>
            <table className="highlight centered">
                <thead>
                    <tr>
                        <th>Изображение</th>
                        <th>Модель</th>
                        <th>Цена</th>
                        <th>Количество</th>
                        <th>Страница товара</th>
                    </tr>
                </thead>
                <tbody>
                    {currentOrder.orderItems &&
                        currentOrder.orderItems.map((item) => (
                            <tr key={currentOrder._id}>
                                <td className="order-image">
                                    <img src={item.image} alt={item.model} />
                                </td>
                                <td>{item.model}</td>
                                <td>${item.price}</td>
                                <td>{item.quantity}</td>
                                <td>
                                    <Link
                                        to={`/product/${item.product}`}
                                        className="waves-effect waves-light black btn-small">
                                        Перейти
                                    </Link>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <button
                onClick={() => setPopupActive(true)}
                className="waves-effect waves-light black btn order-button">
                Удалить заказ
            </button>
        </>
    );
}

export default OrderPage;
