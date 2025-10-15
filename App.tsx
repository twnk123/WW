
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

const HomePage = lazy(() => import('./pages/HomePage'));
const WorkPage = lazy(() => import('./pages/WorkPage'));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const PlansPage = lazy(() => import('./pages/PlansPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const DIYPage = lazy(() => import('./pages/DIYPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="bg-bg text-text-active font-body min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading...</div>}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/work" element={<WorkPage />} />
                <Route path="/work/:slug" element={<ProjectDetailPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/diy" element={<DIYPage />} />
                <Route path="/plans" element={<PlansPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/terms" element={<TermsPage />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
};

export default App;
