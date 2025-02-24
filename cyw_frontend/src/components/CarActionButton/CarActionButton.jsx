
import React from 'react';
import styles from './CarActionButton.module.scss';

function CarActionButton(props) {
    const {
        car,
        onClick,
        iconRegular,
        iconActive,
        isActive,
        buttonClass // collected-button or wishlisted-button
    } = props;

    return (
        <button
            onClick={() => onClick(car.id)}
            className={styles[buttonClass]}>
            <i className={isActive ? iconActive : iconRegular}></i>
            {buttonClass === 'collected-button' ?
                (car.is_collected ?
                    <p>Remove from collection</p> :
                    <p>Collect</p>) :
                (car.is_wishlisted ?
                    <p>Undo wishlist</p> :
                    <p>Wishlist</p>)
            }
        </button>
    );
}

export default CarActionButton;
