
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../utils/logout';
import { AuthContext } from '../../contexts/AuthContext';


function Header() {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        setIsAuthenticated(false);
        navigate('/');
    };

    return (
        <header className="header">
            <nav>
                <Link to="/">Home</Link>
                {isAuthenticated ? (
                    <>
                        <Link to="/profile">Profile</Link>
                        <Link to="/collected-cars">Collected Cars</Link>
                        <Link to="/wishlisted-cars">Wishlisted Cars</Link>
                        <button onClick={handleLogout}>Logout</button>
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