
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CarSearch from '../../components/CarSearch/CarSearch';
import SeriesSearch from '../../components/SeriesSearch/SeriesSearch';
import styles from './Search.module.scss';
import { s } from 'framer-motion/client';


function Search() {

    const [searchParams] = useSearchParams();
    const query = searchParams.get('search_query');

    const [searchFor, setSearchFor] = useState('cars');

    return (
        <div>
            {query && <h1 className={styles.title}>
                Searching for: <span>'{query}'</span></h1>}
            {query && <div className={styles['button-container']}>
                <button
                    className={searchFor === 'cars' ? styles.active : styles.unactive}
                    onClick={() => setSearchFor('cars')}>
                    Cars
                </button>
                <button
                    className={searchFor === 'series' ? styles.active : styles.unactive}
                    onClick={() => setSearchFor('series')}>
                    Series
                </button>
            </div>}
            {
            query ?
                <div>
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