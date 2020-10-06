import React from 'react';
import { getCurrentProduct } from '../redux/actions/products';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../redux/actions/cart';
import Loader from '../components/Loader';
import Error from '../components/Error';

function ProductPage(props) {
    const { currentProduct, loading, error, categoryNames } = useSelector(
        (state) => state.products,
    );
    const dispatch = useDispatch();
    const { model, category, price, description, countInStock, image } = currentProduct;
    const [quantity, setQuantity] = React.useState(1);

    const addToCart = () => {
        dispatch(addItemToCart(props.match.params.id, Number(quantity)));
        props.history.push('/cart');
    };

    React.useEffect(() => {
        dispatch(getCurrentProduct(props.match.params.id));
    }, []); // eslint-disable-line

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <Error error={error} />;
    }

    return (
        <div className="product">
            <div className="product-image">
                <img src={image} alt={model} />
            </div>
            <div className="product-info">
                <h2 className="product-title">
                    <strong>Модель:</strong> {model}
                </h2>
                <span className="product-category">
                    <strong>Категория:</strong> {categoryNames[category]}
                </span>
                <p className="product-desc">
                    <strong>Описание:</strong> {description}
                </p>
            </div>
            <div className="product-purchase">
                <span className="product-price">
                    Цена: <strong>${price}</strong>
                </span>
                {!!countInStock && (
                    <span className="product-count">Количество в наличии: {countInStock}</span>
                )}
                {!!countInStock && (
                    <select
                        value={quantity}
                        className="product-select"
                        onChange={(event) => {
                            setQuantity(event.target.value);
                        }}>
                        {[...Array(countInStock).keys()].map((value) => (
                            <option key={value} value={value + 1}>
                                {value + 1}
                            </option>
                        ))}
                    </select>
                )}
                <button
                    className="waves-effect waves-light btn black product-button"
                    onClick={addToCart}
                    disabled={!countInStock}>
                    {countInStock ? 'Добавить в корзину' : 'Нет в наличии'}
                </button>
            </div>
        </div>
    );
}

export default ProductPage;
