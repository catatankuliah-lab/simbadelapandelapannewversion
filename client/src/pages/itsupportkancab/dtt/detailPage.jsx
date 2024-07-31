import React from 'react';
import PropTypes from 'prop-types';


const DetailPage = ({ handlePageChange }) => {
    return (
        <div>
            <h1>Detail Page</h1>
            <button onClick={() => handlePageChange('index')}>Go to Index Page</button>
        </div>
    );
};

DetailPage.propTypes = {
    handlePageChange: PropTypes.func.isRequired,
    selectedId: PropTypes.number.isRequired,
};

export default DetailPage;
