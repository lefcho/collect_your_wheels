
import React, { useState, useEffect } from 'react'
import api from '../../api';
import CarCard from '../../components/CarCard/CarCard';


function CollectedCars() {

    const [cars, setCars] = useState([]);
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


    const fetchCollectedCars = async (url = '/api/collected-cars/') => {
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

    return (
        <div>
            <h1>Collected Cars</h1>
            <form >
                <input
                    type="text"
                    placeholder='Search collected cars...'
                />
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



            <button onClick={() => {
                console.log(cars);
            }}>
                Show Cars
            </button>
        </div>
    )
}

export default CollectedCars;