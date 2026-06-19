// src/components/home/FeaturedProperties.jsx
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFeaturedProperties } from '../../hooks/useProperties';
import PropertyCard from '../property/PropertyCard';
import PropertyCardSkeleton from '../property/PropertyCardSkeleton';
import SectionHeader from '../shared/SectionHeader';

export default function FeaturedProperties() {
  const { data: properties, isLoading, isError } = useFeaturedProperties();

  return (
    <section className="py-20 bg-white dark:bg-dark-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <SectionHeader
            badge="Properties"
            title="Featured Listings"
            subtitle="Handpicked premium properties across NYC and Chicago."
            center={false}
          />
          <Link to="/properties" className="btn-outline shrink-0 self-start md:self-auto">
            View All Properties <ArrowRight size={16} />
          </Link>
        </div>

        {isError && (
          <p className="text-center text-gray-500 py-10">Could not load properties. Make sure the API server is running.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => <PropertyCardSkeleton key={i} />)
            : properties?.map((p, i) => <PropertyCard key={p.id} property={p} index={i} />)
          }
        </div>
      </div>
    </section>
  );
}
