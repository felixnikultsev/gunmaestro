import React from 'react';

function Empty({ title, image }) {
    return (
        <div className="empty">
            <h2 className="empty-title">{title}</h2>
            <img className="empty-image" src={image} alt="Пусто" />
        </div>
    );
}

export default Empty;
