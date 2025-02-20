
import React, { useState, useEffect, useContext } from 'react'
import api from '../../api';
import { AuthContext } from '../../contexts/AuthContext';
import Pagination from '../Pagination/Pagination';
import FoldingSeries from '../FoldingSeries/FoldingSeries';

function SeriesSearch(props) {

    const { query } = props;

    const searchSeriesUrl = '/api/search-series/';
    const wishlistedUrl = '/api/wishlisted-cars/';
    const collectedUrl = '/api/collected-cars/';

    const { isAuthenticated } = useContext(AuthContext);

    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [prevPage, setPrevPage] = useState(null);
    const [nextPage, setNextPage] = useState(null);

    useEffect(() => {
        fetchSearchedSeries();
    }, [query]);


    const fetchSearchedSeries = async (url = `${searchSeriesUrl}?search=${query}`) => {
        setLoading(true);
        api
            .get(url)
            .then((res) => res.data)
            .then((data) => {
                setSeries(data.results);
                setNextPage(data.next);
                setPrevPage(data.previous);
            })
            .catch((err) => alert(err));

        setLoading(false);
    };

    return (
        <div>
            {series.map((series) => {
                return <FoldingSeries
                    key={series.id}
                    series={series}
                />
            })}
        </div>
    )
}

export default SeriesSearch;