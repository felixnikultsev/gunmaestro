import React from 'react';

const Popup = React.memo(({ text, onConfirm, onCancel }) => {
    return (
        <div className="popup">
            <p className="popup-text">{text}</p>
            <div className="popup-buttons">
                <button
                    className="waves-effect waves-light btn black popup-button"
                    onClick={onConfirm}>
                    Подтвердить
                </button>
                <button
                    className="waves-effect waves-light btn black popup-button"
                    onClick={onCancel}>
                    Отмена
                </button>
            </div>
        </div>
    );
});

export default Popup;
