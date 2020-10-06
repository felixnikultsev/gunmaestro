import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, update } from '../redux/actions/auth';
import { Link } from 'react-router-dom';
import { getMyOrders, getOrders } from '../redux/actions/orders';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Empty from '../components/Empty';
import cancel from '../assets/images/cancel.svg';
import Popup from '../components/Popup';

function ProfilePage(props) {
    const dispatch = useDispatch();
    const { user, error, loading } = useSelector((state) => state.auth);
    const orders = useSelector((state) => state.orders);

    const [formData, setFormData] = React.useState({
        name: user.name,
        email: user.email,
        password: '',
    });

    const [popupActive, setPopupActive] = React.useState(false);

    const submitHandler = (event) => {
        event.preventDefault();
        setPopupActive(true);
    };

    const onConfirm = () => {
        dispatch(
            update({
                id: user._id,
                name: formData.name,
                email: formData.email,
                password: formData.password,
            }),
        );
        setPopupActive(false);
    };

    const logoutHandler = () => {
        dispatch(logout());
        props.history.push('/auth');
    };

    React.useEffect(() => {
        if (user.isAdmin) {
            dispatch(getOrders());
        } else {
            dispatch(getMyOrders());
        }
    }, []); // eslint-disable-line

    return (
        <div className="profile">
            {popupActive && (
                <Popup
                    text="Подтвердите изменения"
                    onConfirm={onConfirm}
                    onCancel={() => setPopupActive(false)}
                />
            )}
            <form onSubmit={submitHandler} className="profile-form">
                <div className="input-field col s12">
                    <input
                        placeholder="Введите имя"
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                    />
                    <label className="active" htmlFor="name">
                        Имя
                    </label>
                </div>
                <div className="input-field col s12">
                    <input
                        placeholder="Введите email"
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={(event) =>
                            setFormData({ ...formData, email: event.target.value })
                        }
                    />
                    <label className="active" htmlFor="email">
                        Email
                    </label>
                </div>
                <div className="input-field col s12">
                    <input
                        placeholder="Введите новый пароль"
                        id="password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={(event) =>
                            setFormData({ ...formData, password: event.target.value })
                        }
                    />
                    <label className="active" htmlFor="password">
                        Пароль
                    </label>
                </div>
                {loading && <Loader small statical />}
                {error && <Error error={error} small />}
                <button type="submit" className="waves-effect waves-light btn black profile-button">
                    Обновить
                </button>
                {user.isAdmin && (
                    <Link className="waves-effect waves-light btn black profile-button" to="/admin">
                        Админ-панель
                    </Link>
                )}
                <button
                    onClick={logoutHandler}
                    className="waves-effect waves-light btn black profile-button">
                    Выйти
                </button>
            </form>
            <div className="table-wrap">
                {orders.loading ? (
                    <Loader />
                ) : orders.error ? (
                    <Error error={orders.error} />
                ) : (
                    <div className="table">
                        <h3>Мои заказы</h3>
                        <table className="highlight centered">
                            <thead>
                                <tr>
                                    <th>Номер заказа</th>
                                    {user.isAdmin && <th>Пользователь</th>}
                                    <th>Дата</th>
                                    <th>Сумма</th>
                                    <th>Подробная информация</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.orders &&
                                    orders.orders.map((order) => (
                                        <tr key={order._id}>
                                            <td>{order._id}</td>
                                            {user.isAdmin && <td>{order.user.name}</td>}
                                            <td>{order.date}</td>
                                            <td>${order.totalPrice}</td>
                                            <td>
                                                <Link
                                                    to={`/order/${order._id}`}
                                                    className="waves-effect waves-light black btn-small">
                                                    Перейти
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                        {orders.orders && orders.orders.length === 0 && (
                            <Empty title="Заказов нет" image={cancel} />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProfilePage;
