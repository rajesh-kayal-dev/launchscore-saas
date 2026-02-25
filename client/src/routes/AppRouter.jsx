import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layout
import MainLayout from "../components/layout/MainLayout";

// Pages
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import WebsitesPage from "../pages/WebsitesPage";
import ScansPage from "../pages/ScansPage";
import MonitoringPage from "../pages/MonitoringPage";
import AlertsPage from "../pages/AlertsPages";
import ReportsPage from "../pages/ReportsPage";
import ComparePage from "../pages/ComparePage";
import SettingsPage from "../pages/SettingsPage";
import ScanResultPage from "../pages/ScanResultPage";
import APIHealthPage from "../pages/APIHealthPage";
import FeedbackPage from "../pages/FeedbackPage";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* 1. Public Routes (No Sidebar/Header) */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />

                {/* 2. Protected/Internal Routes (Using MainLayout) */}
                <Route element={<MainLayout />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/websites" element={<WebsitesPage />} />
                    <Route path="/scans" element={<ScansPage />} />
                    <Route path="/scan-result" element={<ScanResultPage />} />
                    <Route path="/monitoring" element={<MonitoringPage />} />
                    <Route path="/alerts" element={<AlertsPage />} />
                    <Route path="/reports" element={<ReportsPage />} />
                    <Route path="/compare" element={<ComparePage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/api-health" element={<APIHealthPage />} />
                    <Route path="/feedback" element={<FeedbackPage />} />
                </Route>

                {/* 3. Catch all - redirect to landing */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;