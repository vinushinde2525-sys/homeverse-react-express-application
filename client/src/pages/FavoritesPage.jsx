// src/pages/FavoritesPage.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';
import useStore from '../store/useStore';
import PropertyCard from '../components/property/PropertyCard';

export default function FavoritesPage() {
  const { favorites } = useStore();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      <div className="bg-dark-800 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <span className="section-badge">Saved</span>
          <h1 className="font-heading font-extrabold text-4xl md:text-5xl text-white mt-2">My Favorites</h1>
          <p className="text-gray-400 mt-3 text-sm">{favorites.length} saved {favorites.length === 1 ? 'property' : 'properties'}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 gap-4 text-center"
          >
            <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center">
              <Heart size={36} className="text-red-300" />
            </div>
            <h2 className="font-heading font-bold text-2xl text-dark-900 dark:text-white">No favorites yet</h2>
            <p className="text-gray-400 text-sm max-w-md">
              Start browsing properties and tap the heart icon to save your favorites here.
            </p>
            <Link to="/properties" className="btn-primary mt-2">
              Explore Properties <ArrowRight size={16} />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((p, i) => (
              <PropertyCard key={p.id} property={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
