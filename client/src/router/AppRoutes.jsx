import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';
import ITSupportIndexKantorCabangPage from '../pages/itsupportkancab/kantorcabang/indexPage';
import ITSupportIndexAdminKantorCabangPage from '../pages/itsupportkancab/adminkantorcabang/indexPage';
import IndexPetugasPenyalurPage from '../pages/itsupportkancab/petugaspenyalur/indexPage';
import ITSupportIndexGudangPage from '../pages/itsupportkancab/gudang/indexPage';
import ITSupportIndexPICGudangPage from '../pages/itsupportkancab/picgudang/indexPage';
import ITSupportIndexCheckerGudangPage from '../pages/itsupportkancab/checkergudang/indexPage';
import IndexMasterDataKPMPage from '../pages/itsupportkancab/masterdatakpm/indexPage';
import IndexDTTPage from '../pages/itsupportkancab/dtt/indexPage';
import IndexWoPage from '../pages/itsupportkancab/wo/indexPage';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/kantorcabang" element={<ITSupportIndexKantorCabangPage />} />
            <Route path="/adminkantorcabang" element={<ITSupportIndexAdminKantorCabangPage />} />
            <Route path="/petugaspenyalur" element={<IndexPetugasPenyalurPage />} />
            <Route path="/gudang" element={<ITSupportIndexGudangPage />} />
            <Route path="/picgudang" element={<ITSupportIndexPICGudangPage />} />
            <Route path="/checkergudang" element={<ITSupportIndexCheckerGudangPage />} />
            <Route path="/kpm" element={<IndexMasterDataKPMPage />} />
            <Route path="/dtt" element={<IndexDTTPage />} />
            <Route path="/wo" element={<IndexWoPage />} />
        </Routes>
    );
};

export default AppRoutes;
