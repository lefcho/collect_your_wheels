
import React, { useState, useEffect } from 'react'
import api from '../../api';
import CarCard from '../../components/CarCard/CarCard';


function CollectedCars() {

    const collectedUrl = '/api/collected-cars/';

    const [cars, setCars] = useState([]);
    const [searchParam, setSearchParam] = useState(null);
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
        const searchQuery = searchParam ? `?search=${encodeURIComponent(searchParam)}` : '';
        fetchCollectedCars(`${collectedUrl}${searchQuery}`);
    };

    const handlePageChange = (url) => {
        if (url) {
          fetchCollectedCars(url);
        }
      };

    return (
        <div>
            <h1>Collected Cars</h1>
            <form >
                <input
                    type="text"
                    onChange={(e) => setSearchParam(e.target.value)}
                    placeholder='Search collected cars...'
                />
                <button
                    onClick={(e) => handleSearchCollected(e)}>
                    Search
                </button>
            </form>

            <div className='cars-container'>
                {cars.map((car) => (
                    <CarCard
                        key={car.id}
                        car={car}
                        handleRemoveCollected={() => handleRemoveCollected(car.id)}
                        handleAddCollected={() => handleAddCollected(car.id)}
                        page='collected'
                    />
                ))}
            </div>

            <div className="pagination">
                {prevPage && (
                    <button onClick={() => handlePageChange(prevPage)} disabled={loading}>
                        Previous
                    </button>
                )}
                {nextPage && (
                    <button onClick={() => handlePageChange(nextPage)} disabled={loading}>
                        Next
                    </button>
                )}
            </div>


            <button onClick={() => {
                console.log(cars);
            }}>
                Show Cars
            </button>
        </div>
    )
}

export default CollectedCars;