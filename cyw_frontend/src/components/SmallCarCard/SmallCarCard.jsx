
import React, { useState, useContext } from 'react'
import CarActionButton from '../CarActionButton/CarActionButton';
import { AuthContext } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';


function SmallCarCard(props) {

    const {
        car,
        handleRemoveCollected,
        handleRemoveWishlisted,
        handleAddWishlisted,
        handleAddCollected,
    } = props;

    const { isAuthenticated } = useContext(AuthContext);

    return (
        <div
            style={{ display: 'flex', flexDirection: 'column' }}>
            <h5 style={{ display: 'flex', flexDirection: 'row' }}>
                <span>{car.series_number}</span><p>{car.model}</p><span>{car.toy_number}</span>
            </h5>
            {car.is_treasure_hunt && <p>
                Treasure Hunt
            </p>}
            {car.is_super_treasure_hunt && <p>
                Super Treasure Hunt
            </p>}
            {isAuthenticated ?
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
                    <CarActionButton
                        onClick={car.is_wishlisted ?
                            handleRemoveWishlisted :
                            handleAddWishlisted
                        }
                        iconRegular="fa-regular fa-heart"
                        iconActive="fa-solid fa-heart"
                        isActive={car.is_wishlisted}
                        buttonClass="wishlisted-button"
                    />
                </div> :
                <div>
                    <Link to="/login">Collect</Link>
                </div>
            }
        </div>
    )
}

export default SmallCarCard;