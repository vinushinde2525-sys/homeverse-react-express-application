// src/App.jsx
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import MainLayout from './layouts/MainLayout';
import PageLoader from './components/ui/PageLoader';
import ScrollToTop from './components/shared/ScrollToTop';

// Lazy-load all pages for code splitting
const HomePage         = lazy(() => import('./pages/HomePage'));
const PropertiesPage   = lazy(() => import('./pages/PropertiesPage'));
const PropertyDetail   = lazy(() => import('./pages/PropertyDetailPage'));
const AgentsPage       = lazy(() => import('./pages/AgentsPage'));
const FavoritesPage    = lazy(() => import('./pages/FavoritesPage'));
const AboutPage        = lazy(() => import('./pages/AboutPage'));
const ContactPage      = lazy(() => import('./pages/ContactPage'));
const NotFoundPage     = lazy(() => import('./pages/NotFoundPage'));

export default function App() {
  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/"                  element={<HomePage />} />
              <Route path="/properties"        element={<PropertiesPage />} />
              <Route path="/properties/:id"    element={<PropertyDetail />} />
              <Route path="/agents"            element={<AgentsPage />} />
              <Route path="/favorites"         element={<FavoritesPage />} />
              <Route path="/about"             element={<AboutPage />} />
              <Route path="/contact"           element={<ContactPage />} />
              <Route path="*"                  element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </AnimatePresence>
    </>
  );
}
