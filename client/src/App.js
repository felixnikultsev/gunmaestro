import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import useRoutes from './routes';

function App() {
    const { user } = useSelector((state) => state.auth);
    const isAuth = !!user.token;
    const isAdmin = user.isAdmin;
    const routes = useRoutes(isAuth, isAdmin);

    return (
        <Router>
            <Navbar user={user} />
            <div className="container">{routes}</div>
        </Router>
    );
}

export default App;
