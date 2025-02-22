
import styles from './Header.module.scss';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../utils/logout';
import { AuthContext } from '../../contexts/AuthContext';
import logo from '../../assets/logo.svg'


function Header() {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

    const navigate = useNavigate();

    const [query, setQuery] = useState('');
    const [showProfCont, setShowProfCont] = useState(true);

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
        <header className={styles.header}>

            <Link to="/">
                <div>
                    <img className={styles.logo} src={logo} alt="Logo" />
                </div>
            </Link>
            <form
                className={styles['search-form']}
                onSubmit={(e) => handleSearchSubmit(e)}>
                <input
                    className={styles['search-input']}
                    value={query}
                    placeholder="Search . . ."
                    onChange={(e) => setQuery(e.target.value)}
                />
                {query && <button
                    type='reset'
                    className={styles['cancel-btn']}
                    onClick={() => setQuery('')}>
                    <i className="fa-solid fa-xmark"></i>
                </button>}
                <button className={styles['search-btn']} type="submit">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </form>
            <nav>
                {isAuthenticated ? (
                    <div className={styles['prof-cont']}>
                        <button
                            className={styles['prof-button']}
                            onClick={() =>
                                setShowProfCont(!showProfCont)}>
                            <i className="fa-solid fa-user"></i>
                        </button>
                        {showProfCont && <div
                            className={styles['prof-info-cont']}>
                            <Link 
                                className={styles['icon-text']} 
                                to="/collected">
                                <i className="fa-solid fa-car"></i>
                                <button>Collected Cars</button>
                            </Link>
                            <Link 
                                className={styles['icon-text']} 
                                to="/wishlisted">
                                <i className="fa-solid fa-car-on"></i>
                                <button>Wishlisted Cars</button>
                            </Link>
                            <button
                                className={`${styles['icon-text']} ${styles['add-before']}`}
                                onClick={handleLogout}>
                                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                <p>Logout</p>
                            </button>
                        </div>}
                    </div>
                ) : (
                    <Link to="/login">
                        <button className={styles['login-btn']}>
                            <i className="fa-solid fa-arrow-right"></i>
                            <p>Log in</p>
                        </button>
                    </Link>
                )}
            </nav>
        </header>
    );
}

export default Header;