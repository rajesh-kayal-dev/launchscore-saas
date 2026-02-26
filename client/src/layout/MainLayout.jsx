import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import MobileSidebar from './MobileSidebar';
import Navbar from './Navbar';

const MainLayout = () => {
    return (
        <div className="flex min-h-screen bg-[#0f0f0f] text-white overflow-hidden">
            {/* Grid Background Effect - Fixed to back */}
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />

            {/* 1. Sidebar: Hidden on mobile, fixed width on desktop */}
            <aside className="hidden lg:block w-64 border-r border-white/5 bg-[#1a1a1a] flex-shrink-0 relative z-20">
                <Sidebar />
            </aside>

            {/* 2. Mobile Sidebar: Absolute/Fixed overlay for small screens */}
            <MobileSidebar />

            {/* 3. Main Content Wrapper */}
            <div className="flex-1 flex flex-col min-w-0 relative z-10 overflow-y-auto">
                {/* Navbar sits at the top of the content area */}
                <header className="sticky top-0 z-30 bg-[#0f0f0f]/80 backdrop-blur-md border-b border-white/5">
                    <Navbar />
                </header>

                {/* Page Content */}
                <main className="p-4 md:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;