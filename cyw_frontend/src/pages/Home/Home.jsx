
import React from 'react';
import videoBg from '../../assets/videoBg.mp4';
import styles from './Home.module.scss';

function Home() {
    return (
        <div className={styles.home}>
            <div className={styles.overlay}></div>
            <video className={styles['video-bg']} autoPlay loop muted>
                <source src={videoBg} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className={styles['text-content']}>
                <h1>Collect Your Wheels</h1>
                <button className={styles['welcome-btn']}>
                    Start Collecting
                </button>
            </div>
        </div>
    );
}

export default Home;
