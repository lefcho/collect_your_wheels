import React from 'react'

function CarCard( { car } ) {
    const series = car.series;

    return (
        <div className='car-card' dataid={car.id}>
            <h3>
                {car.model} <span>({car.toy_number})</span>
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