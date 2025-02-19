import React from 'react'

function SmallCarCard(props) {

    const { car } = props;

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h5 style={{ display: 'flex', flexDirection: 'row' }}>
                <span>{car.series_number}</span><p>{car.model}</p><span>{car.toy_number}</span>
            </h5>
            {car.is_treasure_hunt && <p>
                Treasure Hunt
            </p>}
            {car.is_super_treasure_hunt && <p>
                Super Treasure Hunt
            </p>}
        </div>
    )
}

export default SmallCarCard;