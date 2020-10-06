import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, removeItemFromCart } from '../redux/actions/cart';

function CartItem({ item }) {
    const dispatch = useDispatch();
    const { categoryNames } = useSelector((state) => state.products);

    const removeFromCartHandler = (productId) => {
        dispatch(removeItemFromCart(productId));
    };

    return (
        <tr key={item.product}>
            <td className="cart-image">
                <img src={item.image} alt={item.model} />
            </td>
            <td>{item.model}</td>
            <td>{categoryNames[item.category]}</td>
            <td>
                <select
                    value={item.quantity}
                    onChange={(event) => {
                        dispatch(addItemToCart(item.product, Number(event.target.value)));
                    }}
                    className="cart-select">
                    {[...Array(item.countInStock).keys()].map((value) => (
                        <option key={value} value={value + 1}>
                            {value + 1}
                        </option>
                    ))}
                </select>
            </td>
            <td>${item.price}</td>
            <td>
                <span
                    className="cart-delete"
                    onClick={() => {
                        removeFromCartHandler(item.product);
                    }}>
                    &times;
                </span>
            </td>
        </tr>
    );
}

export default CartItem;
