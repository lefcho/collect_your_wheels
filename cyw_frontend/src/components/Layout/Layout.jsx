
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header.jsx';
import Sidebar from '../Sidebar/Sidebar.jsx';
import Footer from '../Footer/Footer.jsx';
import styles from './Layout.module.scss';
import { useState } from 'react';


function Layout() {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev)
    }

    return (
        <div className={styles.layout}>
            <Header toggleSidebar={toggleSidebar} />
            <div className={styles.contentContainer}>
                {isSidebarOpen && 
                    <Sidebar
                        toggleSidebar={toggleSidebar} 
                    />}
                <main className={styles.main}>
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    );
}

export default Layout;
