// src/components/property/PropertyCard.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, BedDouble, Bath, Square, MapPin, Eye, Scale } from 'lucide-react';
import useStore from '../../store/useStore';
import { formatPrice, getStatusClass } from '../../utils';
import toast from 'react-hot-toast';

export default function PropertyCard({ property, index = 0 }) {
  const { toggleFavorite, isFavorite, toggleCompare, isInCompare, compareList } = useStore();
  const favorited = isFavorite(property.id);
  const inCompare = isInCompare(property.id);

  const handleFavorite = (e) => {
    e.preventDefault();
    toggleFavorite(property);
    toast[favorited ? 'error' : 'success'](
      favorited ? 'Removed from favorites' : 'Added to favorites!'
    );
  };

  const handleCompare = (e) => {
    e.preventDefault();
    if (!inCompare && compareList.length >= 3) {
      toast.error('You can compare up to 3 properties at a time.');
      return;
    }
    toggleCompare(property);
    toast.success(inCompare ? 'Removed from comparison' : 'Added to comparison!');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="property-card group"
    >
      {/* ── Image Banner ── */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <Link to={`/properties/${property.id}`}>
          <img
            src={property.thumbnail}
            alt={property.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </Link>

        {/* Status badge */}
        <div className="absolute top-3 left-3">
          <span className={getStatusClass(property.status)}>
            {property.status}
          </span>
        </div>

        {/* Image count & views */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <span className="flex items-center gap-1 px-2 py-0.5 bg-black/50 rounded text-white text-xs backdrop-blur-sm">
            <Eye size={11} />
            {property.images?.length || 4}
          </span>
        </div>

        {/* Location on banner */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-xs">
          <MapPin size={12} className="text-primary-400 shrink-0" />
          <span>{property.location.address}, {property.location.city}</span>
        </div>
      </div>

      {/* ── Card Content ── */}
      <div className="p-5 border-b border-gray-100 dark:border-dark-700">
        <div className="flex items-start justify-between gap-2 mb-2">
          <p className="text-primary-500 font-heading font-bold text-lg leading-tight">
            {formatPrice(property.price, property.priceUnit)}
          </p>
          <span className="text-xs text-gray-400 dark:text-gray-500 mt-1 shrink-0">{property.type}</span>
        </div>

        <h3 className="font-heading font-semibold text-dark-900 dark:text-white mb-2 line-clamp-1">
          <Link to={`/properties/${property.id}`} className="hover:text-primary-500 transition-colors">
            {property.title}
          </Link>
        </h3>

        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 leading-relaxed">
          {property.description}
        </p>

        {/* Specs */}
        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          {property.bedrooms > 0 && (
            <span className="flex items-center gap-1">
              <BedDouble size={14} className="text-primary-400" />
              <strong className="text-dark-800 dark:text-gray-200">{property.bedrooms}</strong> Beds
            </span>
          )}
          <span className="flex items-center gap-1">
            <Bath size={14} className="text-primary-400" />
            <strong className="text-dark-800 dark:text-gray-200">{property.bathrooms}</strong> Baths
          </span>
          <span className="flex items-center gap-1">
            <Square size={14} className="text-primary-400" />
            <strong className="text-dark-800 dark:text-gray-200">{property.area.toLocaleString()}</strong> ft²
          </span>
        </div>
      </div>

      {/* ── Card Footer ── */}
      <div className="px-5 py-3.5 flex items-center justify-between">
        <AgentMini agentId={property.agentId} />
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleFavorite}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
              favorited
                ? 'bg-red-50 dark:bg-red-900/20 text-red-500'
                : 'bg-gray-100 dark:bg-dark-700 text-gray-400 hover:bg-red-50 hover:text-red-400'
            }`}
            title={favorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart size={14} fill={favorited ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={handleCompare}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
              inCompare
                ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-500'
                : 'bg-gray-100 dark:bg-dark-700 text-gray-400 hover:bg-primary-50 hover:text-primary-500'
            }`}
            title="Add to comparison"
          >
            <Scale size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// Minimal inline agent display
function AgentMini({ agentId }) {
  const AGENTS = {
    'agent-001': { name: 'William Seklo',   avatar: '/assets/images/author.jpg' },
    'agent-002': { name: 'Sarah Mitchell',  avatar: '/assets/images/author.jpg' },
    'agent-003': { name: 'Marcus Johnson',  avatar: '/assets/images/author.jpg' },
    'agent-004': { name: 'Elena Rodriguez', avatar: '/assets/images/author.jpg' },
  };
  const agent = AGENTS[agentId];
  if (!agent) return null;
  return (
    <div className="flex items-center gap-2">
      <img src={agent.avatar} alt={agent.name} className="w-7 h-7 rounded-full object-cover" />
      <div>
        <p className="text-xs font-semibold text-dark-800 dark:text-gray-200 leading-none">{agent.name}</p>
        <p className="text-[10px] text-gray-400 mt-0.5">Estate Agent</p>
      </div>
    </div>
  );
}
