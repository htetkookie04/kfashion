import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Layout } from './components/layout/Layout';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { UsersPage } from './pages/UsersPage';
import { InfluencersPage } from './pages/InfluencersPage';
import { FeedsPage } from './pages/FeedsPage';
import { ReportsPageEnhanced } from './pages/ReportsPageEnhanced';
import { ReportDetailPage } from './pages/ReportDetailPage';
import { CollaborationsPageEnhanced } from './pages/CollaborationsPageEnhanced';
import { CollaborationDetailPage } from './pages/CollaborationDetailPage';
import { AIRecommendationsPage } from './pages/AIRecommendationsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { NoticesPage } from './pages/NoticesPage';
import { EventsPage } from './pages/EventsPage';
import { SettingsPage } from './pages/SettingsPage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />}
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <DashboardPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <Layout>
              <UsersPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/influencers"
        element={
          <ProtectedRoute>
            <Layout>
              <InfluencersPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/feeds"
        element={
          <ProtectedRoute>
            <Layout>
              <FeedsPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <Layout>
              <ReportsPageEnhanced />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <ReportDetailPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/collaborations"
        element={
          <ProtectedRoute>
            <Layout>
              <CollaborationsPageEnhanced />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/collaborations/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <CollaborationDetailPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/ai-recommendations"
        element={
          <ProtectedRoute>
            <Layout>
              <AIRecommendationsPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <Layout>
              <AnalyticsPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/notices"
        element={
          <ProtectedRoute>
            <Layout>
              <NoticesPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/events"
        element={
          <ProtectedRoute>
            <Layout>
              <EventsPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Layout>
              <SettingsPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
