
import React from 'react'
import api from '../../api';
import CarCard from '../CarCard/CarCard';
import Pagination from '../Pagination/Pagination';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext, useState, useEffect } from 'react';
import { collectedUrl, searchCarsUrl, wishlistedUrl } from '../../constants';
import styles from './CarSearch.module.scss';


function CarSearch(props) {
    const { query } = props;

    const { isAuthenticated } = useContext(AuthContext);

    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(false);
    const [prevPage, setPrevPage] = useState(null);
    const [nextPage, setNextPage] = useState(null);

    useEffect(() => {
        fetchSearchedCars();
    }, [query]);


    const fetchSearchedCars = async (url = `${searchCarsUrl}?search=${query}`) => {
        setLoading(true);
        api
            .get(url)
            .then((res) => res.data)
            .then((data) => {
                setCars(data.results);
                setNextPage(data.next);
                setPrevPage(data.previous);
            })
            .catch((err) => alert(err));

        setLoading(false);
    };

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

    return (
        <div className={styles['cars-container']}>
            {cars.map((car) => (
                <CarCard
                    key={car.id}
                    car={car}
                    handleAddCollected={() => handleAddCollected(car.id)}
                    handleAddWishlisted={() => handleAddWishlisted(car.id)}
                    handleRemoveWishlisted={() => handleRemoveWishlisted(car.id)}
                    handleRemoveCollected={() => handleRemoveCollected(car.id)}
                    isUserAuthenticated={isAuthenticated}
                    page='basic'
                />
            ))}
            <Pagination
                prevPage={prevPage}
                nextPage={nextPage}
                loading={loading}
                fetchCars={fetchSearchedCars}
            />
        </div>
    )
}

export default CarSearch