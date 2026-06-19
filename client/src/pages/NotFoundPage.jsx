// src/pages/NotFoundPage.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="font-heading font-extrabold text-[120px] md:text-[160px] leading-none text-gray-100 dark:text-dark-700 select-none">
          404
        </p>
        <div className="-mt-8 relative z-10">
          <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-dark-900 dark:text-white mb-3">
            Page Not Found
          </h1>
          <p className="text-gray-400 text-sm max-w-md mx-auto mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/" className="btn-primary">
              <Home size={16} /> Go Home
            </Link>
            <Link to="/properties" className="btn-outline">
              <ArrowLeft size={16} /> Browse Properties
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
