import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar({ user }) {
    return (
        <nav className="navbar black">
            <div className="nav-wrapper">
                <NavLink to="/" className="brand-logo navbar-logo">
                    GunMaestro
                </NavLink>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li>
                        <NavLink to="/">Catalog</NavLink>
                    </li>
                    <li>
                        <NavLink to="/cart">Cart</NavLink>
                    </li>
                    <li className="navbar-auth">
                        {user.token ? (
                            <NavLink to="/profile">{user.name}</NavLink>
                        ) : (
                            <NavLink to="/auth">Sign In</NavLink>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
