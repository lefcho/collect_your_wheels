
import React from 'react'
import styles from './Pagination.module.scss';


function Pagination(props) {

    const { prevPage, nextPage, loading, fetchCars } = props;

    const handlePageChange = (url) => {
        if (url) {   
            fetchCars(url);
        }
    };


    return (
        <div className={styles.pagination}>
            {prevPage && (
                <button onClick={() => handlePageChange(prevPage)} disabled={loading}>
                    Previous
                </button>
            )}
            {nextPage && (
                <button onClick={() => handlePageChange(nextPage)} disabled={loading}>
                    Next
                </button>
            )}
        </div>
    )
}

export default Pagination;