import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../utils/logout';
import { AuthContext } from '../../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/logo.svg';
import styles from './Header.module.scss';

function Header() {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [showProfCont, setShowProfCont] = useState(false);

    const handleLogout = () => {
        logout();
        setIsAuthenticated(false);
        navigate('/');
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`/results?search_query=${encodeURIComponent(query)}`);
    };

    return (
        <header className={styles.header}>
            <Link to="/">
                <div>
                    <img className={styles.logo} src={logo} alt="Logo" />
                </div>
            </Link>
            <form className={styles['search-form']} onSubmit={handleSearchSubmit}>
                <input
                    className={styles['search-input']}
                    value={query}
                    type="text"
                    placeholder="Search . . ."
                    onChange={(e) => setQuery(e.target.value)}
                />
                {query && (
                    <button
                        type="reset"
                        className={styles['cancel-btn']}
                        onClick={() => setQuery('')}
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                )}
                <button className={styles['search-btn']} type="submit">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </form>
            <nav>
                {isAuthenticated ? (
                    <div className={styles['prof-cont']}>
                        <button
                            className={styles['prof-button']}
                            onClick={() => setShowProfCont((prev) => !prev)}
                        >
                            <i className="fa-solid fa-user"></i>
                        </button>
                        <AnimatePresence>
                            {showProfCont && (
                                <motion.div
                                    className={styles['prof-info-cont']}
                                    initial={{ opacity: 1, y: -50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -50 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Link className={styles['icon-text']} to="/collected">
                                        <i className="fa-solid fa-car"></i>
                                        <button>Collected Cars</button>
                                    </Link>
                                    <Link className={styles['icon-text']} to="/wishlisted">
                                        <i className="fa-solid fa-car-on"></i>
                                        <button>Wishlisted Cars</button>
                                    </Link>
                                    <button
                                        className={`${styles['icon-text']} ${styles['add-before']}`}
                                        onClick={handleLogout}
                                    >
                                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                        <p>Logout</p>
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
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
