import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/auth';
import Loader from '../components/Loader';
import Error from '../components/Error';

function AuthPage() {
    const { loading, error } = useSelector((state) => state.auth);
    const [formData, setFormData] = React.useState({ email: '', password: '' });
    const dispatch = useDispatch();

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(login(formData.email, formData.password));
    };

    return (
        <div className="form">
            <form onSubmit={submitHandler}>
                <h3 className="auth-title">Авторизация</h3>
                <div className="row">
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
                        Войти
                    </button>
                    {loading && <Loader small statical />}
                    {error && <Error error={error} small />}
                    <span className="auth-link">
                        Еще нет аккаунта? <Link to="/register">Зарегистрируйтесь!</Link>
                    </span>
                </div>
            </form>
        </div>
    );
}

export default AuthPage;
