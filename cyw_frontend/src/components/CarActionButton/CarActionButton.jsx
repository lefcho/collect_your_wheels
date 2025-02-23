
import React from 'react';
import styles from './CarActionButton.module.scss';

function CarActionButton(props) {
    const {
        car_id,
        onClick, 
        iconRegular, 
        iconActive, 
        isActive, 
        buttonClass // collected-button or wishlisted-button
    } = props;

    return (
        <button 
            onClick={() => onClick(car_id)} 
            className={styles[buttonClass]}>
            <i className={isActive ? iconActive : iconRegular}></i>
            <p>Collect</p>
        </button>
    );
}

export default CarActionButton;
