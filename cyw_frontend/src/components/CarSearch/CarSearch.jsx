
import React from 'react'
import api from '../../api';
import CarCard from '../CarCard/CarCard';
import Pagination from '../Pagination/Pagination';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext, useState, useEffect } from 'react';
import { searchCarsUrl } from '../../constants';
import styles from './CarSearch.module.scss';
import useCarActions from '../../hooks/useCarActions';


function CarSearch(props) {
    const { query } = props;

    const { isAuthenticated } = useContext(AuthContext);

    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(false);
    const [prevPage, setPrevPage] = useState(null);
    const [nextPage, setNextPage] = useState(null);

    const {
        handleAddCollected,
        handleRemoveCollected,
        handleAddWishlisted,
        handleRemoveWishlisted,
    } = useCarActions(setCars);

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