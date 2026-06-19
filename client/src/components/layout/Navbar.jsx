// src/components/layout/Navbar.jsx
import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, Menu, X, Sun, Moon, Heart, Search,
  ChevronDown, Mail, MapPin, Facebook, Twitter, Instagram
} from 'lucide-react';
import useStore from '../../store/useStore';

const NAV_LINKS = [
  { to: '/',           label: 'Home' },
  { to: '/properties', label: 'Properties' },
  { to: '/agents',     label: 'Agents' },
  { to: '/about',      label: 'About' },
  { to: '/contact',    label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDark, toggleTheme, favorites } = useStore();
  const { pathname } = useLocation();

  // Sticky nav on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile nav on route change
  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <>
      {/* ── Top bar ───────────────────────────────── */}
      <div className="hidden md:block bg-dark-800 text-white text-xs py-2.5">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="mailto:info@homeverse.com" className="flex items-center gap-1.5 hover:text-primary-400 transition-colors">
              <Mail size={13} />
              <span>info@homeverse.com</span>
            </a>
            <span className="flex items-center gap-1.5">
              <MapPin size={13} className="text-primary-400" />
              <span>15/A, Nest Tower, NYC</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 text-gray-400">
              {[Facebook, Twitter, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="hover:text-primary-400 transition-colors"><Icon size={14} /></a>
              ))}
            </div>
            <Link to="/properties" className="px-3 py-1 bg-primary-500 text-white rounded-sm text-xs font-semibold hover:bg-primary-600 transition-colors">
              Add Listing
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main navbar ───────────────────────────── */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 dark:bg-dark-900/95 backdrop-blur-md shadow-lg'
            : 'bg-white dark:bg-dark-900'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <img
                src="/assets/images/logo.png"
                alt="Homeverse"
                className="h-10 w-auto group-hover:opacity-90 transition-opacity"
              />
            </Link>

            {/* Desktop nav links */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `relative px-4 py-2 text-sm font-semibold font-heading rounded-full transition-all duration-200 ${
                      isActive
                        ? 'text-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'text-gray-600 dark:text-gray-300 hover:text-primary-500 hover:bg-primary-50/60 dark:hover:bg-primary-900/10'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Dark mode toggle */}
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* Favorites */}
              <Link
                to="/favorites"
                className="relative w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
              >
                <Heart size={18} />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </Link>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile nav overlay ────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 h-full w-72 bg-white dark:bg-dark-800 z-50 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-dark-700">
                <img src="/assets/images/logo.png" alt="Homeverse" className="h-8 w-auto" />
                <button onClick={() => setMobileOpen(false)} className="text-gray-500 hover:text-primary-500">
                  <X size={22} />
                </button>
              </div>
              <nav className="flex-1 p-5 space-y-1">
                {NAV_LINKS.map(({ to, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                        isActive
                          ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-500'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700'
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                ))}
              </nav>
              <div className="p-5 border-t border-gray-100 dark:border-dark-700 flex items-center gap-3">
                <button onClick={toggleTheme} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  {isDark ? <Sun size={16} /> : <Moon size={16} />}
                  {isDark ? 'Light Mode' : 'Dark Mode'}
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
