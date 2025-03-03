
import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import styles from './SmallCarCard.module.scss';
import { s } from 'framer-motion/client';


function SmallCarCard(props) {

    const {
        car,
        handleRemoveCollected,
        handleRemoveWishlisted,
        handleAddWishlisted,
        handleAddCollected,
    } = props;

    const { isAuthenticated } = useContext(AuthContext);

    return (
        <div className={styles['sm-car-card']}>
            <div className={styles['car-info-cont']}>
                <h5 className={styles['car-info']}>
                    <span
                        className={styles['series-number']}>
                        {car.series_number}
                    </span>
                    <div className={styles['car-name']}>
                        <p>{car.model}</p>
                        <span className={styles['toy-number']}>
                            ({car.toy_number})
                        </span>
                    </div>
                </h5>
                {car.is_treasure_hunt && <p
                    className={styles['treasure-hunt']}>
                    Treasure Hunt
                </p>}
                {car.is_super_treasure_hunt && <p
                    className={styles['super-treasure-hunt']}>
                    Super Treasure Hunt
                </p>}
            </div>
            {isAuthenticated ?
                <div className={styles["action-buttons"]}>
                    {car.is_collected ? (
                        <button
                            onClick={() => handleRemoveCollected(car.id)}>
                            <i
                                className={`${styles.button} fa-solid fa-square-check`}

                            ></i>
                        </button>
                    ) : (
                        <button
                            onClick={() => handleAddCollected(car.id)}>
                            <i
                                className={`${styles.button} fa-regular fa-square-check`}

                            ></i>
                        </button>
                    )}

                    {car.is_wishlisted ? (
                        <button
                            onClick={() => handleRemoveWishlisted(car.id)}>
                            <i
                                className={`${styles.button} fa-solid fa-heart`}
                            ></i>
                        </button>
                    ) : (
                        <button
                            onClick={() => handleAddWishlisted(car.id)}>
                            <i
                                className={`${styles.button} fa-regular fa-heart`}

                            ></i>
                        </button>
                    )}

                </div> :
                <div className={styles['collect-btn']}>
                    <Link to="/login">Collect</Link>
                </div>
            }
        </div>
    )
}

export default SmallCarCard;