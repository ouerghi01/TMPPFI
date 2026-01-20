import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Layout Components
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { Chatbot } from './components/Chatbot';

// Front-Office Pages
import { Dashboard } from './pages/Dashboard';
import { ThemesPage } from './pages/ThemesPage';
import { ThemeDetailPage } from './pages/ThemeDetailPage';
import { PetitionsPage } from './pages/PetitionsPage';
import { PetitionDetailPage } from './pages/PetitionDetailPage';
import { VotesPage } from './pages/VotesPage';
import { VoteDetailPage } from './pages/VoteDetailPage';
import { AssembliesPage } from './pages/AssembliesPage';
import { ConferencesPage } from './pages/ConferencesPage';
import { SpeakerDetailPage } from './pages/SpeakerDetailPage';
import { ConsultationsPage } from './pages/ConsultationsPage';
import { ConsultationDetailPage } from './pages/ConsultationDetailPage';
import { LegislativeConsultationsPage } from './pages/LegislativeConsultationsPage';
import { LegislativeConsultationDetailPage } from './pages/LegislativeConsultationDetailPage';
import { ProposeIdeaPage } from './pages/ProposeIdeaPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { FAQPage } from './pages/FAQPage';
import { GuidesPage } from './pages/GuidesPage';
import { SupportPage } from './pages/SupportPage';
import { LegalNoticePage } from './pages/LegalNoticePage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { AccessibilityPage } from './pages/AccessibilityPage';
import { CookiesPage } from './pages/CookiesPage';
import { NewsletterPage } from './pages/NewsletterPage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import YouthSpacePage from './pages/YouthSpacePage';
import YouthPollDetailPage from './pages/YouthPollDetailPage';
import IVRAccessPage from './pages/IVRAccessPage';
import { SignalementsPage } from './pages/SignalementsPage';
import { CreateSignalementPage } from './pages/CreateSignalementPage';
import { SignalementDetailPage } from './pages/SignalementDetailPage';

// Back-Office Admin Components & Pages
import { AdminLayout } from './admin/components/AdminLayout';
import { AdminDashboard } from './admin/pages/AdminDashboard';
import { UsersManagement } from './admin/pages/UsersManagement';
import { ProcessesManagement } from './admin/pages/ProcessesManagement';
import { ModerationPage } from './admin/pages/ModerationPage';
import { ThemesManagement } from './admin/pages/ThemesManagement';
import { CalendarManagement } from './admin/pages/CalendarManagement';
import { AnalyticsPage } from './admin/pages/AnalyticsPage';
import { ResultsPublication } from './admin/pages/ResultsPublication';
import { ExportsPage } from './admin/pages/ExportsPage';
import { ParticipationsManagement } from './admin/pages/ParticipationsManagement';
import { GeneralSettings } from './admin/pages/settings/GeneralSettings';
import IVRSynthesisPage from './admin/pages/IVRSynthesisPage';
import { NotificationsSettings } from './admin/pages/settings/NotificationsSettings';
import { DataSettings } from './admin/pages/settings/DataSettings';
import { AuditSettings } from './admin/pages/settings/AuditSettings';

// Back-Office SaaS Components & Pages
import { SaasLayout } from './saas/components/SaasLayout';
import { SaasDashboard } from './saas/pages/SaasDashboard';
import { OrganizationsPage } from './saas/pages/OrganizationsPage';
import { UsersPage } from './saas/pages/UsersPage';
import { ModulesPage } from './saas/pages/ModulesPage';
import { StatisticsPage } from './saas/pages/StatisticsPage';
import { AuditPage } from './saas/pages/AuditPage';
import { SettingsPage as SaasSettingsPage } from './saas/pages/SettingsPage';
import { Toaster } from './components/ui/sonner';

// Main application component
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={
                <div className="min-h-screen bg-gray-50">
                  <Header />
                  <main>
                    <Dashboard />
                  </main>
                  <Footer />
                  <Toaster />
                </div>
              } />
              <Route path="/themes" element={
                <div className="min-h-screen bg-gray-50">
                  <Header />
                  <main><ThemesPage /></main>
                  <Footer />
                  <Toaster />
                </div>
              } />
              <Route path="/themes/:themeId" element={
                <div className="min-h-screen bg-gray-50">
                  <Header />
                  <main><ThemeDetailPage /></main>
                  <Footer />
                  <Toaster />
                </div>
              } />
              <Route path="/petitions" element={
                <div className="min-h-screen bg-gray-50">
                  <Header />
                  <main><PetitionsPage /></main>
                  <Footer />
                  <Toaster />
                </div>
              } />
              <Route path="/petitions/:petitionId" element={
                <div className="min-h-screen bg-gray-50">
                  <Header />
                  <main><PetitionDetailPage /></main>
                  <Footer />
                  <Toaster />
                </div>
              } />
              <Route path="/votes" element={
                <div className="min-h-screen bg-gray-50">
                  <Header />
                  <main><VotesPage /></main>
                  <Footer />
                  <Toaster />
                </div>
              } />
              <Route path="/votes/:voteId" element={
                <div className="min-h-screen bg-gray-50">
                  <Header />
                  <main><VoteDetailPage /></main>
                  <Footer />
                  <Toaster />
                </div>
              } />
              <Route path="/assemblies" element={
                <div className="min-h-screen bg-gray-50">
                  <Header />
                  <main><AssembliesPage /></main>
                  <Footer />
                  <Toaster />
                </div>
              } />
              <Route path="/conferences" element={
                <div className="min-h-screen bg-gray-50">
                  <Header />
                  <main><ConferencesPage /></main>
                  <Footer />
                  <Toaster />
                </div>
              } />
              <Route path="/speakers/:speakerId" element={
                <div className="min-h-screen bg-gray-50">
                  <Header />
                  <main><SpeakerDetailPage /></main>
                  <Footer />
                  <Toaster />
                </div>
              } />
              <Route path="/consultations" element={
                <div className="min-h-screen bg-gray-50">
                  <Header />
                  <main><ConsultationsPage /></main>
                  <Footer />
                  <Toaster />
                </div>
              } />
              <Route path="/consultations/:id" element={
                <div className="min-h-screen bg-gray-50">
                  <Header />
                  <main><ConsultationDetailPage /></main>
                  <Footer />
                  <Toaster />
                </div>
              } />
              <Route path="/legislative-consultations" element={
                <div className="min-h-screen bg-gray-50">
                  <Header />
                  <main><LegislativeConsultationsPage /></main>
                  <Footer />
                  <Toaster />
                </div>
              } />
              <Route path="/legislative-consultations/:id" element={
                <div className="min-h-screen bg-gray-50">
                  <Header />
                  <main><LegislativeConsultationDetailPage /></main>
                  <Footer />
                  <Toaster />
                </div>
              } />
              <Route path="/propose-idea" element={
                <div className="min-h-screen bg-gray-50">
                  <Header />
                  <main><ProposeIdeaPage /></main>
                  <Footer />
                  <Toaster />
                </div>
              } />
              <Route path="/profile" element={
                <div className="min-h-screen bg-gray-50">
                  <Header />
                  <main><ProfilePage /></main>
                  <Footer />
                  <Toaster />
                </div>
              } />
              <Route path="/settings" element={
                <div className="min-h-screen bg-gray-50">
                  <Header />
                  <main><SettingsPage /></main>
                  <Footer />
                  <Toaster />
                </div>
              } />
              <Route path="/search" element={
                <div className="min-h-screen bg-gray-50">
                  <Header />
                  <main><SearchResultsPage /></main>
                  <Footer />
                  <Toaster />
                </div>
              } />
              <Route path="/resources" element={
                <div className="min-h-screen bg-gray-50">
                  <Header />
                  <main><ResourcesPage /></main>
                  <Footer />
                  <Toaster />
                </div>
              } />
              <Route path="/how-it-works" element={
                <div className="min-h-screen bg-gray-50">
                  <Header />
                  <main><HowItWorksPage /></main>
                  <Footer />
                  <Toaster />
                </div>
              } />
              <Route path="/faq" element={
                <div className="min-h-screen bg-gray-50">
                  <Header />
                  <main><FAQPage /></main>
                  <Footer />
                  <Toaster />
                </div>
              } />
              <Route path="/guides" element={
                <div className="min-h-screen bg-gray-50">
                  <Header />
                  <main><GuidesPage /></main>
                  <Footer />
                  <Toaster />
                </div>
              } />
              <Route path="/support" element={
                <div className="min-h-screen bg-gray-50">
                  <Header />
                  <main><SupportPage /></main>
                  <Footer />
                  <Toaster />
                </div>
              } />
              <Route path="/legal-notice" element={
                <div className="min-h-screen bg-gray-50">
                  <Header />
                  <main><LegalNoticePage /></main>
                  <Footer />
                  <Toaster />
                </div>
              } />
              <Route path="/privacy" element={
                <div className="min-h-screen bg-gray-50">
                  <Header />
                  <main><PrivacyPage /></main>
                  <Footer />
                  <Toaster />
                </div>
              } />
              <Route path="/terms" element={
                <div className="min-h-screen bg-gray-50">
                  <Header />
                  <main><TermsPage /></main>
                  <Footer />
                  <Toaster />
                </div>
              } />
              <Route path="/accessibility" element={
                <div className="min-h-screen bg-gray-50">
                  <Header />
                  <main><AccessibilityPage /></main>
                  <Footer />
                  <Toaster />
                </div>
              } />
              <Route path="/cookies" element={
                <div className="min-h-screen bg-gray-50">
                  <Header />
                  <main><CookiesPage /></main>
                  <Footer />
                  <Toaster />
                </div>
              } />
              <Route path="/newsletter" element={
                <div className="min-h-screen bg-gray-50">
                  <Header />
                  <main><NewsletterPage /></main>
                  <Footer />
                  <Toaster />
                </div>
              } />
              <Route path="/register" element={
                <div className="min-h-screen">
                  <RegisterPage />
                  <Toaster />
                </div>
              } />
              <Route path="/login" element={
                <div className="min-h-screen">
                   <LoginPage />
                  <Toaster />
                </div>
              } />
              <Route path="/forgot-password" element={
                <div className="min-h-screen">
                   <ForgotPasswordPage />
                  <Toaster />
                </div>
              } />
              <Route path="/youth-space" element={
                <div className="min-h-screen bg-gray-50">
                  <Header />
                  <main><YouthSpacePage /></main>
                  <Footer />
                  <Toaster />
                </div>
              } />
              <Route path="/youth-space/:id" element={
                <div className="min-h-screen bg-gray-50">
                  <Header />
                  <main><YouthPollDetailPage /></main>
                  <Footer />
                  <Toaster />
                </div>
              } />
              <Route path="/ivr-access" element={
                <div className="min-h-screen bg-gray-50">
                  <Header />
                  <main><IVRAccessPage /></main>
                  <Footer />
                  <Toaster />
                </div>
              } />
              <Route path="/signalements" element={
                <div className="min-h-screen bg-gray-50">
                  <Header />
                  <main><SignalementsPage /></main>
                  <Footer />
                  <Toaster />
                </div>
              } />
              <Route path="/signalements/create" element={
                <div className="min-h-screen bg-gray-50">
                  <Header />
                  <main><CreateSignalementPage /></main>
                  <Footer />
                  <Toaster />
                </div>
              } />
              <Route path="/signalements/:id" element={
                <div className="min-h-screen bg-gray-50">
                  <Header />
                  <main><SignalementDetailPage /></main>
                  <Footer />
                  <Toaster />
                </div>
              } />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="users" element={<UsersManagement />} />
                <Route path="processes" element={<ProcessesManagement />} />
                <Route path="moderation" element={<ModerationPage />} />
                <Route path="themes" element={<ThemesManagement />} />
                <Route path="calendar" element={<CalendarManagement />} />
                <Route path="analytics" element={<AnalyticsPage />} />
                <Route path="results" element={<ResultsPublication />} />
                <Route path="exports" element={<ExportsPage />} />
                <Route path="participations" element={<ParticipationsManagement />} />
                <Route path="ivr" element={<IVRSynthesisPage />} />
                <Route path="settings/general" element={<GeneralSettings />} />
                <Route path="settings/notifications" element={<NotificationsSettings />} />
                <Route path="settings/data" element={<DataSettings />} />
                <Route path="settings/audit" element={<AuditSettings />} />
              </Route>

              {/* Saas Routes */}
              <Route path="/saas" element={<SaasLayout />}>
                <Route index element={<SaasDashboard />} />
                <Route path="organizations" element={<OrganizationsPage />} />
                <Route path="users" element={<UsersPage />} />
                <Route path="modules" element={<ModulesPage />} />
                <Route path="statistics" element={<StatisticsPage />} />
                <Route path="audit" element={<AuditPage />} />
                <Route path="settings" element={<SaasSettingsPage />} />
              </Route>
            </Routes>
            <Chatbot />
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}