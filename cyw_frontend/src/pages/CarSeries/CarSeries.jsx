
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api';
import SmallCarCard from '../../components/SmallCarCard/SmallCarCard';
import styles from './CarSeries.module.scss';


function CarSeries() {
    const { slug } = useParams();
    const navigate = useNavigate();

    const [series, setSeries] = useState(null);
    const [cars, setCars] = useState([]);
    const [loadingSeries, setLoadingSeries] = useState(false);
    const [loadingCars, setLoadingCars] = useState(false);

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
            <h1>{series.title}</h1>
            {loadingCars ? (
                <div>Loading...</div>
            ) : (
                <div className={styles["cars-container"]}>
                    {cars.map((car) => (
                        <SmallCarCard key={car.id} car={car} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default CarSeries;
