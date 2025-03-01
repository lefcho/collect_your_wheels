
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api';
import SmallCarCard from '../../components/SmallCarCard/SmallCarCard';
import styles from './CarSeries.module.scss';
import { AuthContext } from '../../contexts/AuthContext';
import useCarActions from '../../hooks/useCarActions';


function CarSeries() {

    const { slug } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);

    const [series, setSeries] = useState(null);
    const [cars, setCars] = useState([]);
    const [loadingSeries, setLoadingSeries] = useState(false);
    const [loadingCars, setLoadingCars] = useState(false);
    const [collectedNumber, setCollectedNumber] = useState(0);

    const {
        handleAddCollected,
        handleRemoveCollected,
        handleAddWishlisted,
        handleRemoveWishlisted,
    } = useCarActions(setCars);

    useEffect(() => {
        setLoadingSeries(true);
        api.get(`/api/series/${slug}/`)
            .then((res) => {
                setSeries(res.data);
                setLoadingSeries(false);
            })
            .catch((err) => {
                console.error(err);
                setLoadingSeries(false);
                navigate('/404');
            });
    }, [slug, navigate]);

    useEffect(() => {
        if (series) {
            setLoadingCars(true);
            api.get(`/api/search-cars/?series__slug=${series.slug}`)
                .then((res) => {
                    setCars(res.data.results);
                    setCollectedNumber(res.data.results.filter(
                        (car) => car.is_collected).length);
                    setLoadingCars(false);
                })
                .catch((err) => {
                    console.error(err);
                    setLoadingCars(false);
                });
        }
    }, [series]);

    if (loadingSeries) return <div>Loading...</div>;

    if (!series) return null;

    return (
        <div className={styles['car-series-cont']}>
            <div className={styles['series-heading']}>
                <div>
                    <h1>{series.title}</h1>
                    <div className={styles['series-info']}>
                        <p>{series.year}</p>
                        <p>&#x2022;</p>
                        <p>{series.number_of_cars} <span>Unique</span> cars</p>
                        <p>&#x2022;</p>
                        <p>{cars.length} <span>Total</span> cars</p>
                    </div>
                </div>
                {isAuthenticated && <div className={styles['collected-cars']}>
                    {collectedNumber}/{series.number_of_cars}
                </div>}
            </div>
            {loadingCars ? (
                <div>Loading...</div>
            ) : (
                <div className={styles["cars-container"]}>
                    {cars.map((car) => (
                        <SmallCarCard 
                            key={car.id} 
                            car={car}
                            handleAddCollected={handleAddCollected}
                            handleRemoveCollected={handleRemoveCollected}
                            handleAddWishlisted={handleAddWishlisted}
                            handleRemoveWishlisted={handleRemoveWishlisted}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default CarSeries;
