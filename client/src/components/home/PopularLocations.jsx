// src/components/home/PopularLocations.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { usePopularLocations } from '../../hooks/useProperties';
import SectionHeader from '../shared/SectionHeader';

const LOCATION_IMAGES = {
  'Chicago':     '/assets/images/property-1.jpg',
  'New York':    '/assets/images/property-2.jpg',
  'Brooklyn':    '/assets/images/property-3.jpg',
  'Long Island': '/assets/images/property-4.png',
};

export default function PopularLocations() {
  const { data: locations, isLoading } = usePopularLocations();

  return (
    <section className="py-20 bg-white dark:bg-dark-900">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          badge="Explore"
          title="Popular Locations"
          subtitle="Discover properties in the most sought-after neighbourhoods."
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="skeleton rounded-2xl aspect-[3/4]" />
              ))
            : locations?.map((loc, i) => (
                <motion.div
                  key={loc.city}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative rounded-2xl overflow-hidden group cursor-pointer ${i === 0 ? 'md:row-span-2' : ''}`}
                >
                  <Link to={`/properties?city=${loc.city}`}>
                    <div className={`relative overflow-hidden ${i === 0 ? 'aspect-[3/4] md:h-full' : 'aspect-[4/3]'}`}>
                      <img
                        src={LOCATION_IMAGES[loc.city] || 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80'}
                        alt={loc.city}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-dark-900/20 to-transparent" />

                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="flex items-center gap-1.5 mb-1">
                          <MapPin size={14} className="text-primary-400" />
                          <span className="text-white font-heading font-bold text-lg">{loc.city}</span>
                        </div>
                        <span className="text-xs text-gray-300 bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded-full">
                          {loc.count} {loc.count === 1 ? 'property' : 'properties'}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
}
