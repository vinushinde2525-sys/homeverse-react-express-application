// src/layouts/MainLayout.jsx
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CompareBar from '../components/property/CompareBar';
import useStore from '../store/useStore';

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  enter:   { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.2, ease: 'easeIn' } },
};

export default function MainLayout() {
  const { pathname } = useLocation();
  const { initTheme } = useStore();

  // Initialize saved theme on mount
  useEffect(() => { initTheme(); }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-dark-900">
      <Navbar />
      <main className="flex-1">
        <motion.div
          key={pathname}
          initial="initial"
          animate="enter"
          exit="exit"
          variants={pageVariants}
        >
          <Outlet />
        </motion.div>
      </main>
      <CompareBar />
      <Footer />
    </div>
  );
}
