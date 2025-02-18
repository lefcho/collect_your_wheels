
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Search from '../../pages/Search/Search.jsx';
import { logout } from '../../utils/logout';
import { AuthContext } from '../../contexts/AuthContext';


function Header() {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

    const navigate = useNavigate();

    const [query, setQuery] = useState('');

    const handleLogout = () => {
        logout();
        setIsAuthenticated(false);
        navigate('/');
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`/results?search_query=${encodeURIComponent(query)}`);
    }

    return (
        <header className="header">
            <Link to="/">Home</Link>
            <form onSubmit={(e) => handleSearchSubmit(e)}>
                <input 
                    className="search-input" 
                    type="text"
                    placeholder="Search . . ."
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className="circle" type="submit">Search</button>
            </form>
            <nav>
                {isAuthenticated ? (
                    <>
                        <Link to="/profile">Profile</Link>
                        <Link to="/collected">Collected Cars</Link>
                        <Link to="/wishlisted">Wishlisted Cars</Link>
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