
import React, { useState, useEffect } from 'react'
import api from '../../api';
import CarCard from '../../components/CarCard/CarCard';
import Pagination from '../../components/Pagination/Pagination';
import { collectedUrl } from '../../constants';
import styles from './CollectedCars.module.scss';


function CollectedCars() {

    const [cars, setCars] = useState([]);
    const [searchParam, setSearchParam] = useState('');
    const [clickedGo, setClickedGo] = useState(false);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleRemoveCollected = (car_id) => {
        api
            .delete(`/api/collected-cars/${car_id}/`)
            .then(() => {
                setCars(prevCars =>
                    prevCars.map(car => {
                        return car.id === car_id ? { ...car, is_collected: false } : car
                    })
                );
            })
            .catch((err) => alert(err));
    };

    const handleAddCollected = (car_id) => {
        api
            .post(`/api/collected-cars/${car_id}/`)
            .then(() => {
                setCars(prevCars =>
                    prevCars.map(car => {
                        return car.id === car_id ? { ...car, is_collected: true } : car
                    })
                );
            })
            .catch((err) => alert(err));
    }

    const fetchCollectedCars = async (url = collectedUrl) => {
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

    useEffect(() => {
        fetchCollectedCars();
    }, []);

    const handleSearchCollected = (e) => {
        e.preventDefault();
        setClickedGo(true);
        const searchQuery = searchParam
            ? `?search=${encodeURIComponent(searchParam)}`
            : '';
        fetchCollectedCars(`${collectedUrl}${searchQuery}`);
    };

    const handlePageChange = (url) => {
        if (url) {
            fetchCollectedCars(url);
        }
    };

    const handleAnimationEnd = () => {
        setClickedGo(false);
      };
    

    return (
        <div>
            <div className={styles.head}>
                <h1 className={styles.title}>Your Car <span>Collection</span></h1>
                <form className={styles['car-form']}>
                    <input
                        className={styles['car-input']}
                        type="text"
                        placeholder="Search in collection..."
                        value={searchParam}
                        onChange={(e) => setSearchParam(e.target.value)}
                    />

                    {searchParam && <button
                        className={styles['car-x-btn']}
                        type='reset'
                        onClick={() => setSearchParam('')}>
                        <i class="fa-solid fa-xmark"></i>
                    </button>}
                    <button
                        className={`${styles['car-go-btn']} ${clickedGo ? styles.clicked : ''}`}
                        onAnimationEnd={handleAnimationEnd}
                        type='submit'
                        onClick={(e) => handleSearchCollected(e)}>
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
                        handleAddCollected={() => handleAddCollected(car.id)}
                        page='collected'
                        isUserAuthenticated={true}
                    />
                ))}
            </div>

            <Pagination
                prevPage={prevPage}
                nextPage={nextPage}
                loading={loading}
                fetchCars={fetchCollectedCars}
            />
        </div>
    )
}

export default CollectedCars;