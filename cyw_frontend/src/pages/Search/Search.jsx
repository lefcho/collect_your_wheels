
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../../api';
import Pagination from '../../components/Pagination/Pagination';


function Search() {
    const searchUrl = '/api/search-cars/';
    const wishlistedUrl = '/api/wishlisted-cars/';
    const collectedUrl = '/api/collected-cars/';

    const [searchParams] = useSearchParams();
    const query = searchParams.get('search_query');
    const navigate = useNavigate();

    const [searchFor, setSearchFor] = useState('cars');
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(false);
    const [prevPage, setPrevPage] = useState(null);
    const [nextPage, setNextPage] = useState(null);

    useEffect(() => {
        fetchSearchedCars();
    }, []);

    const fetchSearchedCars = async (url = searchUrl) => {
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
                    prevCars.filter((car) => {
                        return car.id !== car_id
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

    const handlePageChange = (url) => {
        if (url) {
            fetchCollectedCars(url);
        }
    };


    return (
        <div>
            <h1>Search Results</h1>
            {
                query ?
                    <p>Results for: {query}</p> :
                    <p>No results found.</p>
            }
            <Pagination
                prevPage={prevPage}
                nextPage={nextPage}
                loading={loading}
                fetchCars={fetchSearchedCars}
            />
        </div>

    );
}

export default Search;