import React, { useState, useEffect } from 'react';
import api from '../../api';
import CarCard from '../../components/CarCard/CarCard';
import Pagination from '../../components/Pagination/Pagination';
import { collectedUrl, wishlistedUrl } from '../../constants';
import styles from './WishlistedCars.module.scss';

function WishlistedCars() {
    const [cars, setCars] = useState([]);
    const [searchParam, setSearchParam] = useState('');
    const [clickedGo, setClickedGo] = useState(false);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchWishlistedCars();
    }, []);

    const fetchWishlistedCars = async (url = wishlistedUrl) => {
        setLoading(true);
        api.get(url)
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
        api.post(`${collectedUrl}${car_id}/`)
            .then(() => {
                setCars(prevCars => prevCars.filter(car => car.id !== car_id));
            })
            .catch((err) => alert(err));

        handleRemoveWishlisted(car_id);
    };

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
        api.post(`${wishlistedUrl}${car_id}/`)
            .then(() => {
                setCars(prevCars =>
                    prevCars.map((car) => {
                        return car.id === car_id ?
                            { ...car, is_wishlisted: true } :
                            car
                    })
                )
            })
    };

    const handleRemoveWishlisted = (car_id) => {
        api.delete(`${wishlistedUrl}${car_id}/`)
            .then(() => {
                setCars(prevCars =>
                    prevCars.map(car =>
                        car.id === car_id ? { ...car, is_wishlisted: false } : car
                    )
                );
            })
            .catch((err) => alert(err));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setClickedGo(true);
        const searchQuery = searchParam ? `?search=${encodeURIComponent(searchParam)}` : '';
        fetchWishlistedCars(`${wishlistedUrl}${searchQuery}`);
    };

    const handleAnimationEnd = () => {
        setClickedGo(false);
    };

    return (
        <div>
            <div className={styles.head}>
                <h1 className={styles.title}>Your Wishlisted <span>Cars</span></h1>
                <form className={styles['car-form']}>
                    <input
                        className={styles['car-input']}
                        type="text"
                        placeholder="Search in wishlisted"
                        value={searchParam}
                        onChange={(e) => setSearchParam(e.target.value)}
                    />

                    {searchParam && <button
                        className={styles['car-x-btn']}
                        type='reset'
                        onClick={() => setSearchParam('')}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>}
                    <button
                        className={`${styles['car-go-btn']} ${clickedGo ? styles.clicked : ''}`}
                        onAnimationEnd={handleAnimationEnd}
                        type='submit'
                        onClick={(e) => handleSearch(e)}>
                        <i className="fa-solid fa-arrow-right"></i>
                    </button>
                </form>
            </div>

            <div className='cars-container'>
                {cars.map((car) => (
                    <CarCard
                        key={car.id}
                        car={car}
                        handleRemoveCollected={() => handleRemoveCollected(car.id)}
                        handleAddWishlisted={() => handleAddWishlisted(car.id)}
                        handleAddCollected={() => handleAddCollected(car.id)}
                        handleRemoveWishlisted={() => handleRemoveWishlisted(car.id)}
                        page='wishlisted'
                        isUserAuthenticated={true}
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
    );
}

export default WishlistedCars;
