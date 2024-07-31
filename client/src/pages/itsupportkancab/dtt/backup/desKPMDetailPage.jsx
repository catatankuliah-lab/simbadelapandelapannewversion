import React from 'react';
import PropTypes from 'prop-types';

const DetailDesaPage = ({ detailIdDesa, handleBackClick, setCurrentView }) => {
    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="mb-3">
                    <div className="divider text-start">
                        <div className="divider-text">
                            <span className="menu-header-text fs-6 fw-bold">Detail Desa</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-12">
                <div className="">
                    Klik <button className="fw-bold btn btn-link p-0" onClick={handleBackClick}>disini</button> untuk kembali ke halaman tambah data.
                </div>
            </div>
            <div className="col-md-12 mt-3">
                <h6>ID Desa yang Dipilih</h6>
                <span>{detailIdDesa}</span>
            </div>
        </div>
    );
};

DetailDesaPage.propTypes = {
    setCurrentView: PropTypes.func.isRequired,
    handleBackClick: PropTypes.func.isRequired,
    detailIdDesa: PropTypes.number
};

export default DetailDesaPage;
