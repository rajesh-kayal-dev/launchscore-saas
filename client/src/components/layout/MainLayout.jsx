import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import MobileSidebar from './MobileSidebar';
import Header from './Header';

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-[#0f0f0f]">
            {/* Grid Background Effect */}
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

            {/* Navigation Components */}
            <div className="hidden lg:block">
                <Sidebar />
            </div>
            <MobileSidebar />
            <Header />

            {/* Content Area */}
            <main className="lg:ml-64 pt-16 relative z-0">
                <div className="p-4 md:p-8">
                    {/* The Outlet renders the matching child route */}
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default MainLayout;