import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CardItem = React.memo(({ product: { _id, model, category, price, description, image } }) => {
    const { categoryNames } = useSelector((state) => state.products);
    return (
        <div className="col s6">
            <div className="card">
                <div className="card-image">
                    <Link to={`/product/${_id}`}>
                        <img src={image} alt={model} />
                    </Link>
                </div>
                <div className="card-content">
                    <span className="card-title">{model}</span>
                    <span className="card-category">{categoryNames[category]}</span>
                    <p>{description}</p>
                    <strong className="card-price">${price}</strong>
                </div>
            </div>
        </div>
    );
});

export default CardItem;
