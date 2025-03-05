
import React from 'react'
import styles from './Sidebar.module.scss'


function Sidebar(props) {
    const { toggleSidebar } = props;

    return (
        <div className={styles.sidebar}>
            <div className={styles.header}>
                <button 
                    onClick={toggleSidebar}
                    className={styles.cancelBtn}
                >
                    <i className="fa-solid fa-xmark"></i>
                </button>
                <h2>Collect Your Wheels</h2>
            </div>
        </div>
    )
}

export default Sidebar