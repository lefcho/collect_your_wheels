
import React, { useState, useEffect } from 'react'
import api from '../../api';
import CarCard from '../../components/CarCard/CarCard';
import Pagination from '../../components/Pagination/Pagination';

function WishlistedCars() {

    const wishlistedUrl = '/api/wishlisted-cars/';
    const collectedUrl = '/api/collected-cars/';

    const [cars, setCars] = useState([]);
    const [searchParam, setSearchParam] = useState(null);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchWishlistedCars();
    }, []);

    const fetchWishlistedCars = async (url = wishlistedUrl) => {
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


    const handleSearch = (e) => {
        e.preventDefault();
        const searchQuery = searchParam ?
            `?search=${encodeURIComponent(searchParam)}` :
            '';
        fetchWishlistedCars(`${wishlistedUrl}${searchQuery}`);
    };

    return (
        <div>
            <h1>Wishlisted Cars</h1>
            <form >
                <input
                    type="text"
                    onChange={(e) => setSearchParam(e.target.value)}
                    placeholder='Search wishlisted cars...'
                />
                <button
                    onClick={(e) => handleSearch(e)}>
                    Search
                </button>
            </form>

            <div className='cars-container'>
                {cars.map((car) => (
                    <CarCard
                        key={car.id}
                        car={car}
                        handleAddCollected={() => handleAddCollected(car.id)}
                        handleAddWishlisted={() => handleAddWishlisted(car.id)}
                        handleRemoveWishlisted={() => handleRemoveWishlisted(car.id)}
                        handleRemoveCollected={() => handleRemoveCollected(car.id)}
                        page='wishlisted'
                    />
                ))}
            </div>
            <Pagination 
                prevPage={prevPage} 
                nextPage={nextPage}
                loading={loading}
                fetchCars={fetchWishlistedCars}
            />
        </div>
    )
}

export default WishlistedCars;