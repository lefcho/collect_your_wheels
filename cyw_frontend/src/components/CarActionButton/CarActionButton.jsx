
import React from 'react';


function CarActionButton(props) {
    const {
        onClick, 
        iconRegular, 
        iconActive, 
        isActive, 
        buttonClass 
    } = props;

    return (
        <button onClick={onClick} className={buttonClass}>
            <i className={isActive ? iconActive : iconRegular}></i>
        </button>
    );
}

export default CarActionButton;
