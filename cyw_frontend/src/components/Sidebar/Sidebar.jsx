
import React from 'react';
import { motion } from 'framer-motion';
import styles from './Sidebar.module.scss';


function Sidebar(props) {
    const { toggleSidebar } = props;

    const sidebarVariants = {
        hidden: { x: '-100%' },
        visible: { x: '0%' },
        exit: { x: '-100%' },
    };

    return (
        <motion.div
            className={styles.sidebar}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sidebarVariants}
            transition={{ type: 'tween', duration: 0.3 }}
        >
            <div className={styles.header}>
                <button onClick={toggleSidebar} className={styles.cancelBtn}>
                    <i className="fa-solid fa-xmark"></i>
                </button>
                <h2>Collect Your Wheels</h2>
            </div>
        </motion.div>
    );
}

export default Sidebar;
