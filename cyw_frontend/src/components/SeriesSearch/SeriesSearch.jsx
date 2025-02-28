
import React, { useState, useEffect } from 'react'
import api from '../../api';
import Pagination from '../Pagination/Pagination';
import { searchSeriesUrl } from '../../constants';
import SeriesCard from '../SeriesCard/SeriesCard';



function SeriesSearch(props) {

    const { query } = props;

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
                return (
                    <SeriesCard series={series} key={series.id}/>
                )
            })}
        </div>
    )
}

export default SeriesSearch;