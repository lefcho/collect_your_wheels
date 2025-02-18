
import React from 'react'
import CarActionButton from '../CarActionButton/CarActionButton'


function CarCard(props) {

    const { 
        car, 
        page, 
        handleRemoveCollected, 
        handleAddCollected,
        handleAddWishlisted,
        handleRemoveWishlisted,
    } = props;

    const series = car.series;

    return (
        <div className='car-card' dataid={car.id}>
            <h3>
                {car.model} <span>({car.toy_number})</span>
                <div className="action-buttons">
                    <CarActionButton
                        onClick={car.is_collected ?
                            handleRemoveCollected :
                            handleAddCollected
                        }
                        iconRegular="fa-regular fa-square-check"
                        iconActive="fa-solid fa-square-check"
                        isActive={car.is_collected}
                        buttonClass="collected-button"
                    />
                    {page !== 'collected' && <CarActionButton
                        onClick={car.is_wishlisted ?
                            handleRemoveWishlisted :
                            handleAddWishlisted
                        }
                        iconRegular="fa-regular fa-heart"
                        iconActive="fa-solid fa-heart"
                        isActive={car.is_wishlisted}
                        buttonClass="wishlisted-button"
                    />}
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