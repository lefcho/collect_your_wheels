
import React from 'react'
import CarActionButton from '../CarActionButton/CarActionButton'
import api from '../../api'


function CarCard({ car, page }) {

    const series = car.series;
    let isWishlisted = car.is_wishlisted;
    let isCollected = car.is_collected;

    const handleRemoveCollected = () => {
        api
            .delete(`/api/collected-cars/${car.id}/`)
            .catch((err) => alert(err));
        
        isCollected = false;
    }

    const handleAddCollected = () => {

    }

    const handleRemoveWishlisted = () => {

    }

    const handleAddWishlisted = () => {

    }

    return (
        <div className='car-card' dataid={car.id}>
            <h3>
                {car.model} <span>({car.toy_number})</span>
                <div className="action-buttons">
                    <CarActionButton
                        onClick={isCollected ?
                            handleRemoveCollected :
                            handleAddCollected
                        }
                        iconRegular="fa-regular fa-square-check"
                        iconActive="fa-solid fa-square-check"
                        isActive={isCollected}
                        buttonClass="collected-button"
                    />
                    <CarActionButton
                        onClick={isWishlisted ?
                            handleRemoveWishlisted :
                            handleAddWishlisted
                        }
                        iconRegular="fa-regular fa-heart"
                        iconActive="fa-solid fa-heart"
                        isActive={isWishlisted}
                        buttonClass="wishlisted-button"
                    />
                </div>
            </h3>
            {car.is_treasure_hunt && <p>Treasure Hunt</p>}
            {car.is_super_treasure_hunt && <p>Super Treasure Hunt</p>}
            <div>
                <h4>
                    <span>Series: </span>{series.title}
                </h4>
                <p>
                    {car.series_number}/<span>{series.number_of_cars}</span>
                </p>
            </div>
            <p>
                <span>Year: </span>{series.year}
            </p>
        </div>
    )
}

export default CarCard;