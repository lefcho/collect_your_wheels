
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { checkAuth } from '../../utils/auth.js'
import Logout from '../Logout';

function Header() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        setIsAuthenticated(checkAuth());
        console.log(isAuthenticated);
    }, []);


    return (
        <header className="header">
            <nav>
                <Link to="/">Home</Link>
                {isAuthenticated ? (
                    <>
                        <Link to="/profile">Profile</Link>
                        <Link to="/collected-cars">Collected Cars</Link>
                        <Link to="/wishlisted-cars">Wishlisted Cars</Link>
                        <button onClick={<Logout />}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </nav>
        </header>
    );
}

export default Header;
