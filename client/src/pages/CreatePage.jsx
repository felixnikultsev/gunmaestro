import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { saveNewProduct } from '../redux/actions/products';
import { getCurrentProduct } from '../redux/actions/products';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { Link } from 'react-router-dom';

function CreatePage(props) {
    const dispatch = useDispatch();
    const { categoryNames, currentProduct, loading, error } = useSelector(
        (state) => state.products,
    );

    const id = props.match.params.id;

    const [formData, setFormData] = React.useState({
        model: '',
        category: 'rifle',
        price: 0,
        description: '',
        countInStock: 0,
        image: '',
    });
    const [uploading, setUploading] = React.useState(false);

    React.useEffect(() => {
        if (id) {
            dispatch(getCurrentProduct(id));
        }
    }, []); // eslint-disable-line

    React.useEffect(() => {
        if (id) {
            setFormData({
                model: currentProduct.model,
                category: currentProduct.category,
                price: currentProduct.price,
                description: currentProduct.description,
                countInStock: currentProduct.countInStock,
                image: currentProduct.image,
            });
        }
    }, [currentProduct]); // eslint-disable-line

    const uploadFile = (event) => {
        const file = event.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setUploading(true);
        axios
            .post('/api/uploads', bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                setFormData({ ...formData, image: response.data });
                setUploading(false);
            })
            .catch((error) => {
                console.log(error);
                setUploading(false);
            });
    };

    const submitHandler = (event) => {
        event.preventDefault();
        const newProduct = {
            _id: id,
            model: formData.model,
            category: formData.category,
            price: formData.price,
            description: formData.description,
            countInStock: formData.countInStock,
            image: formData.image,
        };
        dispatch(saveNewProduct(newProduct)).then(() => {
            props.history.push('/admin');
        });
    };

    return (
        <>
            <Link to="/admin" className="waves-effect waves-light btn black back-button">
                Вернуться назад
            </Link>
            <div className="form create-form">
                <form onSubmit={submitHandler}>
                    <h3 className="auth-title">Создание товара</h3>
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                placeholder="Введите модель"
                                id="model"
                                type="text"
                                name="model"
                                value={formData.model}
                                onChange={(event) =>
                                    setFormData({ ...formData, model: event.target.value })
                                }
                            />
                            <label className="active" htmlFor="model">
                                Модель
                            </label>
                        </div>
                        <div className="input-field col s12">
                            <select
                                id="category"
                                value={formData.category}
                                onChange={(event) => {
                                    setFormData({ ...formData, category: event.target.value });
                                }}
                                className="admin-select">
                                {Object.keys(categoryNames).map((key) => (
                                    <option key={key} value={key}>
                                        {categoryNames[key]}
                                    </option>
                                ))}
                            </select>
                            <label className="active" htmlFor="category">
                                Категория
                            </label>
                        </div>
                        <div className="input-field col s12">
                            <input
                                placeholder="Введите цену"
                                id="price"
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={(event) =>
                                    setFormData({ ...formData, price: event.target.value })
                                }
                            />
                            <label className="active" htmlFor="price">
                                Цена
                            </label>
                        </div>
                        <div className="input-field col s12">
                            <textarea
                                placeholder="Введите описание"
                                value={formData.description}
                                id="description"
                                name="description"
                                className="materialize-textarea"
                                onChange={(event) =>
                                    setFormData({ ...formData, description: event.target.value })
                                }
                            />
                            <label className="active" htmlFor="description">
                                Описание
                            </label>
                        </div>
                        <div className="input-field col s12">
                            <input
                                placeholder="Введите количество"
                                id="countInStock"
                                type="number"
                                name="countInStock"
                                value={formData.countInStock}
                                onChange={(event) =>
                                    setFormData({ ...formData, countInStock: event.target.value })
                                }
                            />
                            <label className="active" htmlFor="countInStock">
                                Количество
                            </label>
                        </div>
                        <div className="input-field col s12">
                            <input
                                placeholder="Изображение не выбрано"
                                id="image"
                                type="text"
                                name="image"
                                value={formData.image}
                                disabled
                            />
                            <label className="active" htmlFor="image">
                                Изображение
                            </label>
                        </div>
                        <label
                            htmlFor="file"
                            className="waves-effect waves-light btn white black-text auth-button file-label btn-outlined">
                            {uploading ? 'Загрузка...' : 'Выбрать изображение'}
                        </label>
                        <input
                            id="file"
                            name="file"
                            type="file"
                            className="input-file"
                            onChange={uploadFile}
                        />
                        {loading && <Loader small statical />}
                        {error && <Error error={error} small />}
                        <button
                            type="submit"
                            className="waves-effect waves-light btn black form-button">
                            Сохранить
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default CreatePage;
