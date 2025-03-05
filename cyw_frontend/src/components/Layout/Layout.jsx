
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header.jsx';
import Sidebar from '../Sidebar/Sidebar.jsx';
import Footer from '../Footer/Footer.jsx';
import styles from './Layout.module.scss';
import { AnimatePresence } from 'framer-motion';


function Layout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev);
    };

    return (
        <div className={styles.layout}>
            <Header toggleSidebar={toggleSidebar} />
            <AnimatePresence>
                {isSidebarOpen && 
                <Sidebar toggleSidebar={toggleSidebar} />}
            </AnimatePresence>
            <main className={styles.main}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default Layout;
