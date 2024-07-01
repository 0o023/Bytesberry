// MainLayout.jsx

import React from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

const MainLayout = () => {
    return (
        <div className="main-layout">
            <Sidebar />
            <MainContent />
        </div>
    );
};

export default MainLayout;
