
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CarSearch from '../../components/CarSearch/CarSearch';
import SeriesSearch from '../../components/SeriesSearch/SeriesSearch';


function Search() {

    const [searchParams] = useSearchParams();
    const query = searchParams.get('search_query');

    const [searchFor, setSearchFor] = useState('cars');

    return (
        <div>
            <h1>Search Results</h1>
            {query && <div>
                <button
                    onClick={() => setSearchFor('cars')}>
                    Cars
                </button>
                <button
                    onClick={() => setSearchFor('series')}>
                    Series
                </button>
            </div>}
            {
            query ?
                <div>
                    <h5>Results for: {query}</h5>
                    {
                    searchFor === 'cars' ?
                        <CarSearch query={query} />
                        :
                        <SeriesSearch query={query} />
                    }
                </div> :
                <p>No results found.</p>
            }
        </div>

    );
}

export default Search;