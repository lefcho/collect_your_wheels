
import api from '../api';
import { collectedUrl, wishlistedUrl } from '../constants';


const useCarActions = (setCars) => {

    const handleAddCollected = (car_id) => {
        api
            .post(`${collectedUrl}${car_id}/`)
            .then(() => {
                setCars((prevCars) =>
                    prevCars.map((car) =>
                        car.id === car_id ?
                            { ...car, is_collected: true } : car
                    )
                );
            })
            .catch((err) => alert(err));

        handleRemoveWishlisted(car_id);
    };

    const handleRemoveCollected = (car_id) => {
        api
            .delete(`${collectedUrl}${car_id}/`)
            .then(() => {
                setCars((prevCars) =>
                    prevCars.map((car) =>
                        car.id === car_id ?
                            { ...car, is_collected: false } : car
                    )
                );
            })
            .catch((err) => alert(err));
    };

    const handleAddWishlisted = (car_id) => {
        api
            .post(`${wishlistedUrl}${car_id}/`)
            .then(() => {
                setCars((prevCars) =>
                    prevCars.map((car) =>
                        car.id === car_id ?
                            { ...car, is_wishlisted: true } : car
                    )
                );
            })
            .catch((err) => alert(err));
    };

    const handleRemoveWishlisted = (car_id) => {
        api
            .delete(`${wishlistedUrl}${car_id}/`)
            .then(() => {
                setCars((prevCars) =>
                    prevCars.map((car) =>
                        car.id === car_id ?
                            { ...car, is_wishlisted: false } : car
                    )
                );
            })
            .catch((err) => alert(err));
    };

    return {
        handleAddCollected,
        handleRemoveCollected,
        handleAddWishlisted,
        handleRemoveWishlisted,
    };
};

export default useCarActions;
