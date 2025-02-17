
import React, {useState, useEffect} from 'react'
import api from '../../api';

function CollectedCars() {

    const [cars, setCars] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchCollectedCars = async (url = '/api/collected-cars/') => {
        setLoading(true);
        api
        .get(url)
        .then((res) => res.data)
        .then((data) => {
            setCars(data.results);
            setNextPage(data.next);
            setPrevPage(data.previous);
        })
        .catch((err) => alert(err));
        
        setLoading(false);
    };

    useEffect(() => {
        fetchCollectedCars();
    }, []);

    return (
        <div>
            <h1>Collected Cars</h1>
            <form >
                <input
                    type="text"
                    placeholder='Search collected cars...'
                />
                <div className="paginator-cont">

                </div>
            </form>
        </div>
    )
}

export default CollectedCars;