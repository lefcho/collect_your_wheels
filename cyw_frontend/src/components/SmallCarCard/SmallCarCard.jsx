
import React, { useState, useContext } from 'react'
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
        <div>
            <h5>
                <span>{car.series_number}</span>
                <p>{car.model}</p>
                <span>{car.toy_number}</span>
            </h5>
            {car.is_treasure_hunt && <p>
                Treasure Hunt
            </p>}
            {car.is_super_treasure_hunt && <p>
                Super Treasure Hunt
            </p>}
            {isAuthenticated ?
                <div className="action-buttons">
                    <button>
                        {car.is_collected ?
                            <span onClick={() => handleRemoveCollected(car.id)}>
                                <i className="fa-solid fa-square-check"></i>
                            </span> :
                            <span onClick={() => handleAddCollected(car.id)}>
                                <i className="fa-regular fa-square-check"></i>
                            </span>
                        }
                    </button>
                    <button>
                        {car.is_wishlisted ?
                            <span onClick={() => handleRemoveWishlisted(car.id)}>
                                <i className="fa-solid fa-heart"></i>
                            </span> :
                            <span onClick={() => handleAddWishlisted(car.id)}>
                                <i className="fa-regular fa-heart"></i>
                            </span>}
                    </button>
                </div> :
                <div>
                    <Link to="/login">Collect</Link>
                </div>
            }
        </div>
    )
}

export default SmallCarCard;