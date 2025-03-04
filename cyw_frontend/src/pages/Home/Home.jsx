
import React, { useContext } from 'react';
import videoBg from '../../assets/videoBg.mp4';
import styles from './Home.module.scss';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';


function Home() {

    const { isAuthenticated } = useContext(AuthContext);

    return (
        <div className={styles.home}>
            <div className={styles.overlay}></div>
            <video className={styles['video-bg']} autoPlay loop muted>
                <source src={videoBg} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className={styles['text-content']}>
                <h1>Collect Your Wheels</h1>
                {isAuthenticated ?
                    <button className={styles['welcome-btn']}>
                        <Link to={{ pathname:"/collected" }}>
                            Your Car Collection
                        </Link>
                    </button> :
                    <button
                        className={styles['welcome-btn']}>
                        <Link to={{ pathname:"/login" }}>
                            Start Collecting
                        </Link>
                    </button>
                }
            </div>
        </div>
    );
}

export default Home;
