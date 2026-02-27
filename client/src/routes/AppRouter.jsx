import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

// Public Pages
import LandingPage from "../pages/public/LandingPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

// App Pages
import DashboardPage from "../pages/app/DashboardPage";
import WebsitesPage from "../pages/app/WebsitesPage";
import MonitoringPage from "../pages/app/MonitoringPage";
import ScansPage from "../pages/app/ScansPage";
import AlertsPage from "../pages/app/AlertsPages";
import ReportsPage from "../pages/app/ReportsPage";
import ComparePage from "../pages/app/ComparePage";
import SettingsPage from "../pages/app/SettingsPage";
import ScanResultPage from "../pages/app/ScanResultPage";
import APIHealthPage from "../pages/app/APIHealthPage";
import FeedbackPage from "../pages/app/FeedbackPage";
import ProfilePage from "../pages/app/ProfilePage";
import SingleReportPage from "../pages/app/SingleReportPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* PROTECTED APP ROUTES */}
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="/app/dashboard" element={<DashboardPage />} />
          <Route path="/app/websites" element={<WebsitesPage />} />
          <Route path="/app/scans" element={<ScansPage />} />
          <Route path="/app/scan-result" element={<ScanResultPage />} />
          <Route path="/app/monitoring" element={<MonitoringPage />} />
          <Route path="/app/alerts" element={<AlertsPage />} />
          <Route path="/app/reports" element={<ReportsPage />} />
          <Route path="/app/compare" element={<ComparePage />} />
          <Route path="/app/settings" element={<SettingsPage />} />
          <Route path="/app/api-health" element={<APIHealthPage />} />
          <Route path="/app/feedback" element={<FeedbackPage />} />
          <Route path="/app/profile" element={<ProfilePage />} />
          <Route path="/app/report/:id" element={<SingleReportPage />} />
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;