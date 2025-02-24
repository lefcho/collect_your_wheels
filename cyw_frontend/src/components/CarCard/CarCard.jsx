import React, { useState } from 'react'
import CarActionButton from '../CarActionButton/CarActionButton'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './CarCard.module.scss'

function CarCard(props) {
    const {
        car,
        page,
        handleRemoveCollected,
        handleAddCollected,
        handleAddWishlisted,
        handleRemoveWishlisted,
        isUserAuthenticated,
    } = props

    const series = car.series
    const [isFolded, setIsFolded] = useState(true);

    const contentVariants = {
        collapsed: { height: 0, opacity: 0.8 },
        expanded: { height: 'auto', opacity: 1 }
    }

    return (
        <div className={styles['car-card']} dataid={car.id}>
            <h3
                onClick={() => setIsFolded(!isFolded)}
                className={`
          ${styles['car-title']} 
          ${car.is_treasure_hunt ? styles['treasure-hunt-bg'] : ''} 
          ${car.is_super_treasure_hunt ? styles['s-treasure-hunt-bg'] : ''}
        `}
                style={{ cursor: 'pointer' }}
            >
                {car.model}
                {car.is_treasure_hunt && (
                    <p className={styles['treasure-hunt-p']}>
                        <i className="fa-solid fa-crown"></i>
                    </p>
                )}
                {car.is_super_treasure_hunt && (
                    <p className={styles['s-treasure-hunt-p']}>
                        <i className="fa-solid fa-chess-king"></i>
                    </p>
                )}
            </h3>
            <AnimatePresence initial={false}>
                {!isFolded && (
                    <motion.div
                        className={styles['car-info-container']}
                        initial="collapsed"
                        animate="expanded"
                        exit="collapsed"
                        variants={contentVariants}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                    >
                        <div className={styles['car-info']}>
                            <p className={styles['info-title']}>ID</p>
                            <p className={styles['info']}>{car.toy_number}</p>
                        </div>
                        <div className={styles['car-info']}>
                            <p className={styles['info-title']}>Series</p>
                            <p className={styles['info']}>{series.title}</p>
                        </div>
                        <div className={styles['car-info']}>
                            <p className={styles['info-title']}>Number in Series</p>
                            <p className={styles['info']}>
                                {car.series_number}/<span>{series.number_of_cars}</span>
                            </p>
                        </div>
                        <div className={styles['car-info']}>
                            <p className={styles['info-title']}>Released</p>
                            <p className={styles['info']}>{series.year}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            {isUserAuthenticated ? (
                <div className={styles['car-action-buttons']}>
                    <CarActionButton
                        onClick={car.is_collected ? handleRemoveCollected : handleAddCollected}
                        iconRegular="fa-regular fa-square-check"
                        iconActive="fa-solid fa-square-check"
                        isActive={car.is_collected}
                        buttonClass="collected-button"
                        car={car}
                    />
                    {page !== 'collected' && (
                        <CarActionButton
                            onClick={car.is_wishlisted ? handleRemoveWishlisted : handleAddWishlisted}
                            iconRegular="fa-regular fa-heart"
                            iconActive="fa-solid fa-heart"
                            isActive={car.is_wishlisted}
                            buttonClass="wishlisted-button"
                            car={car}
                        />
                    )}
                </div>
            ) : (
                <div>
                    <Link to="/login">Collect</Link>
                </div>
            )}
        </div>
    )
}

export default CarCard
