import React from 'react';

const Categories = React.memo(({ categoryNames, onClickCategory, activeCategory }) => {
    return (
        <div className="categories">
            <button
                className={`waves-effect waves-light btn-large ${
                    activeCategory === '' ? 'black' : 'black-text white'
                }`}
                onClick={() => onClickCategory()}>
                Все
            </button>
            {Object.keys(categoryNames).map((category) => (
                <button
                    key={category}
                    className={`waves-effect waves-light btn-large ${
                        activeCategory === category ? 'black' : 'black-text white'
                    }`}
                    onClick={() => onClickCategory(category)}>
                    {categoryNames[category]}
                </button>
            ))}
        </div>
    );
});

export default Categories;
