import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts, setSearchKeyword } from '../redux/actions/products';
import Categories from '../components/Categories';
import Catalog from '../components/Catalog';
import Search from '../components/Search';

function HomePage() {
    const dispatch = useDispatch();
    const { products, loading, error, categoryNames, category, searchKeyword } = useSelector(
        (state) => state.products,
    );

    React.useEffect(() => {
        dispatch(getProducts());
    }, []); // eslint-disable-line

    const onClickCategory = (category = '') => {
        dispatch(getProducts(category));
    };

    const onClickSearch = (searchKeyword = '') => {
        dispatch(getProducts(null, searchKeyword));
        dispatch(setSearchKeyword(''));
    };

    const onChangeSearch = (text) => {
        dispatch(setSearchKeyword(text));
    };

    return (
        <div className="row">
            <Search
                onClickSearch={onClickSearch}
                onChangeSearch={onChangeSearch}
                searchKeyword={searchKeyword}
            />
            <Categories
                categoryNames={categoryNames}
                onClickCategory={onClickCategory}
                activeCategory={category}
            />
            <Catalog products={products} loading={loading} error={error} />
        </div>
    );
}

export default HomePage;
