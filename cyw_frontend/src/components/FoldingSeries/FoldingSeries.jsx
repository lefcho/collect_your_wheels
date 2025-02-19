
import React, { useState, useEffect } from 'react'
import SmallCarCard from '../SmallCarCard/SmallCarCard';
import api from '../../api';
import { motion, AnimatePresence } from 'framer-motion';
import { collectedUrl, searchCarsUrl, wishlistedUrl } from '../../constants';


function FoldingSeries(props) {

    const { series } = props;

    const [cars, setCars] = useState([]);
    const [isFolded, setIsFolded] = useState(true);
    const [loading, setLoading] = useState(false);

    const fetchCarsFromSeries =
        async (url = `${searchCarsUrl}?series__title=${series.title}`) => {
            setLoading(true);
            api
                .get(url)
                .then((res) => res.data)
                .then((data) => {
                    setCars(data.results);
                })
                .catch((err) => alert(err));

            setLoading(false);
        };

    useEffect(() => {
        fetchCarsFromSeries();
    }, []);

    const handleAddCollected = (car_id) => {
        api
            .post(`${collectedUrl}${car_id}/`)
            .then(() => {
                setCars(prevCars =>
                    prevCars.map(car => {
                        return car.id === car_id ? {
                            ...car,
                            is_collected: true,
                            is_wishlisted: false
                        } : car
                    })
                );
            })
            .catch((err) => alert(err));

        handleRemoveWishlisted(car_id);
    }

    const handleRemoveCollected = (car_id) => {
        api
            .delete(`${collectedUrl}${car_id}/`)
            .then(() => {
                setCars(prevCars =>
                    prevCars.map(car => {
                        return car.id === car_id ? { ...car, is_collected: false } : car
                    })
                );
            })
            .catch((err) => alert(err));
    };

    const handleAddWishlisted = (car_id) => {
        api
            .post(`${wishlistedUrl}${car_id}/`)
            .then(() => {
                setCars(prevCars =>
                    prevCars.map((car) => {
                        return car.id === car_id ?
                            { ...car, is_wishlisted: true } :
                            car
                    })
                )
            })
    }

    const handleRemoveWishlisted = (car_id) => {
        api
            .delete(`${wishlistedUrl}${car_id}/`)
            .then(() => {
                setCars(prevCars =>
                    prevCars.map((car) => {
                        return car.id === car_id ?
                            { ...car, is_wishlisted: false } :
                            car
                    })
                )
            })
    }

    const contentVariants = {
        collapsed: { height: 0, opacity: 0 },
        expanded: { height: 'auto', opacity: 1 }
    };

    const caretVariants = {
        collapsed: { rotate: 0 },
        expanded: { rotate: 180 }
    };

    return (
        <div className='searched-series-cont'>
            <div
                className='searched-series-head'
                onClick={() => setIsFolded(!isFolded)}
                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
                <h3>{series.title}</h3>
                <motion.i
                    className="fa-solid fa-caret-down"
                    animate={isFolded ? 'collapsed' : 'expanded'}
                    variants={caretVariants}
                    transition={{ duration: 0.3 }}
                />
            </div>
            <AnimatePresence initial={false}>
                {!isFolded && (
                    <motion.div
                        className='searched-series-body'
                        initial="collapsed"
                        animate="expanded"
                        exit="collapsed"
                        variants={contentVariants}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                    >
                        {cars.map((car) => (
                            <SmallCarCard
                                handleRemoveWishlisted={handleRemoveWishlisted}
                                handleAddWishlisted={handleAddWishlisted}
                                handleRemoveCollected={handleRemoveCollected}
                                handleAddCollected={handleAddCollected}
                                key={car.id}
                                car={car}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default FoldingSeries;