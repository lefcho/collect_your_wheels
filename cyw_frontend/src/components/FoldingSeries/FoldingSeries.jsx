
import React, { useState, useEffect } from 'react'
import SmallCarCard from '../SmallCarCard/SmallCarCard';
import api from '../../api';
import { motion, AnimatePresence } from 'framer-motion';


function FoldingSeries(props) {

    const { series } = props;
    const searchCarsUrl = '/api/search-cars/'


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
                            <SmallCarCard key={car.id} car={car} />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default FoldingSeries;