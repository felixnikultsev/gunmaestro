import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import AdminPage from './pages/AdminPage';
import CreatePage from './pages/CreatePage';
import OrderPage from './pages/OrderPage';

const useRoutes = (isAuth, isAdmin) => {
    if (isAdmin) {
        return (
            <Switch>
                <Route path="/" component={HomePage} exact />
                <Route path="/product/:id" component={ProductPage} />
                <Route path="/cart/:id?" component={CartPage} />
                <Route path="/profile" component={ProfilePage} />
                <Route path="/admin" component={AdminPage} />
                <Route path="/create/:id?" component={CreatePage} />
                <Route path="/order/:id" component={OrderPage} />
                <Redirect to="/admin" />
            </Switch>
        );
    }

    if (isAuth) {
        return (
            <Switch>
                <Route path="/" component={HomePage} exact />
                <Route path="/product/:id" component={ProductPage} />
                <Route path="/cart/:id?" component={CartPage} />
                <Route path="/profile" component={ProfilePage} />
                <Route path="/order/:id" component={OrderPage} />
                <Redirect to="/" />
            </Switch>
        );
    }

    return (
        <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/register" component={RegisterPage} />
            <Route path="/auth" component={AuthPage} />
            <Redirect to="/register" />
        </Switch>
    );
};

export default useRoutes;
