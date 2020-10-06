import React from 'react';
import Empty from '../components/Empty';
import box from '../assets/images/box.svg';
import CatalogItem from './CatalogItem';
import Loader from '../components/Loader';
import Error from '../components/Error';

const Catalog = React.memo(({ products, loading, error }) => {
    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <Error error={error} />;
    }

    return (
        <div className="row">
            {products.length ? (
                products.map((product) => <CatalogItem key={product._id} product={product} />)
            ) : (
                <Empty title="Каталог пуст. Ожидайте пополнения..." image={box} />
            )}
        </div>
    );
});

export default Catalog;
