import React from 'react';
import warning from '../assets/images/warning.svg';

function Error({ error, small }) {
    return (
        <div className={`error black-text ${small ? 'error-small' : 'error-big'}`}>
            <span>{error}</span>
            {!small && <img src={warning} alt="Ошибка" className="error-image" />}
        </div>
    );
}

export default Error;
