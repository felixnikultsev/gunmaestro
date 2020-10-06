import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct, getProducts } from '../redux/actions/products';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Empty from '../components/Empty';
import box from '../assets/images/box.svg';
import Popup from '../components/Popup';

function AdminPage() {
    const { categoryNames, products, loading, error } = useSelector((state) => state.products);
    const dispatch = useDispatch();
    const [popupActive, setPopupActive] = React.useState(false);
    const [currentProductId, setCurrentProductId] = React.useState(null);

    React.useEffect(() => {
        dispatch(getProducts());
    }, []); // eslint-disable-line

    const deleteProductHandler = (productId) => {
        setCurrentProductId(productId);
        setPopupActive(true);
    };

    const onConfirm = () => {
        dispatch(deleteProduct(currentProductId));
        setPopupActive(false);
    };

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
                    text="Вы уверены, что хотите удалить товар?"
                    onConfirm={onConfirm}
                    onCancel={() => setPopupActive(false)}
                />
            )}
            <Link
                to="/create"
                className="waves-effect waves-light white black-text btn create-button btn-outlined">
                Создать новый товар
            </Link>
            <table className="highlight centered">
                <thead>
                    <tr>
                        <th>Изображение</th>
                        <th>Модель</th>
                        <th>Категория</th>
                        <th>Цена</th>
                        <th>Количество</th>
                        <th>Действия</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td className="admin-image">
                                <img src={product.image} alt={product.model} />
                            </td>
                            <td>{product.model}</td>
                            <td>{categoryNames[product.category]}</td>
                            <td>${product.price}</td>
                            <td>{product.countInStock}</td>
                            <td>
                                <div className="admin-buttons">
                                    <Link
                                        to={`/create/${product._id}`}
                                        className="waves-effect waves-light black btn-small">
                                        Редактировать
                                    </Link>
                                    <button
                                        onClick={() => deleteProductHandler(product._id)}
                                        className="waves-effect waves-light black btn-small">
                                        Удалить
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {products.length === 0 && <Empty title="Товаров нет" image={box} />}
        </>
    );
}

export default AdminPage;
