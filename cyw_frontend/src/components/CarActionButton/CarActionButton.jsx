
import React from 'react';


function CarActionButton(props) {
    const {
        car_id,
        onClick, 
        iconRegular, 
        iconActive, 
        isActive, 
        buttonClass 
    } = props;

    const btnType = buttonClass;

    return (
        <button onClick={() => onClick(car_id)} className={buttonClass}>
            <i className={isActive ? iconActive : iconRegular}></i>
        </button>
    );
}

export default CarActionButton;
