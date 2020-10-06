import React from 'react';

const Search = React.memo(({ onClickSearch, onChangeSearch, searchKeyword }) => {
    return (
        <div className="row search">
            <div className="input-field col s10">
                <input
                    value={searchKeyword}
                    placeholder="Введите название модели"
                    id="search"
                    type="text"
                    onChange={(event) => onChangeSearch(event.target.value)}
                />
                <label className="active" htmlFor="search">
                    Поиск
                </label>
            </div>
            <button
                className="waves-effect waves-light btn black col s2"
                onClick={() => onClickSearch(searchKeyword)}>
                Искать
            </button>
        </div>
    );
});

export default Search;
