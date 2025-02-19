import React from 'react'

function Pagination(props) {

    const { prevPage, nextPage, loading, fetchCars } = props;

    const handlePageChange = (url) => {
        if (url) {   
            fetchCars(url);
        }
    };


    return (
        <div className="pagination">
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