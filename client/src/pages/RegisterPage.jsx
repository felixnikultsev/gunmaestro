import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { Link } from 'react-router-dom';
import { register } from '../redux/actions/auth';

function RegisterPage() {
    const { loading, error } = useSelector((state) => state.auth);
    const [formData, setFormData] = React.useState({ name: '', email: '', password: '' });
    const dispatch = useDispatch();

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(register(formData.name, formData.email, formData.password));
    };

    return (
        <div className="form">
            <form onSubmit={submitHandler}>
                <h3 className="auth-title">Создание аккаунта</h3>
                <div className="row">
                    <div className="input-field col s12">
                        <input
                            placeholder="Введите имя"
                            id="name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={(event) =>
                                setFormData({ ...formData, name: event.target.value })
                            }
                        />
                        <label className="active" htmlFor="name">
                            Имя
                        </label>
                    </div>
                    <div className="input-field col s12">
                        <input
                            placeholder="Введите email"
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={(event) =>
                                setFormData({ ...formData, email: event.target.value })
                            }
                        />
                        <label className="active" htmlFor="email">
                            Email
                        </label>
                    </div>
                    <div className="input-field col s12">
                        <input
                            placeholder="Введите пароль"
                            id="password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={(event) =>
                                setFormData({ ...formData, password: event.target.value })
                            }
                        />
                        <label className="active" htmlFor="password">
                            Пароль
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="waves-effect waves-light btn black auth-button">
                        Зарегистрироваться
                    </button>
                    {loading && <Loader small statical />}
                    {error && <Error error={error} small />}
                    <span className="auth-link">
                        Уже есть аккаунт? <Link to="/auth">Авторизируйтесь!</Link>
                    </span>
                </div>
            </form>
        </div>
    );
}

export default RegisterPage;
