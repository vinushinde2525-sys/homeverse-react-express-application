// src/pages/PropertiesPage.jsx
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutGrid, List, SlidersHorizontal } from 'lucide-react';
import { useProperties } from '../hooks/useProperties';
import PropertyCard from '../components/property/PropertyCard';
import PropertyCardSkeleton from '../components/property/PropertyCardSkeleton';
import SearchFilter from '../components/property/SearchFilter';

export default function PropertiesPage() {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  // Initialize filters from URL query params
  const [filters, setFilters] = useState({
    type:   searchParams.get('type')   || 'all',
    status: searchParams.get('status') || 'all',
    city:   searchParams.get('city')   || 'all',
    beds:   searchParams.get('beds')   || 'any',
    sort:   searchParams.get('sort')   || 'newest',
    search: searchParams.get('search') || '',
  });

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Build API params (exclude 'all' / 'any' defaults)
  const apiParams = Object.fromEntries(
    Object.entries(filters).filter(([, v]) => v && v !== 'all' && v !== 'any')
  );

  const { data: properties, isLoading, isError } = useProperties(apiParams);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      {/* ── Page Header ── */}
      <div className="bg-dark-800 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-badge">Browse</span>
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl text-white mt-2">
              Property Listings
            </h1>
            <p className="text-gray-400 mt-3 text-sm">
              {isLoading ? 'Loading...' : `${properties?.length ?? 0} properties found`}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* ── Filters ── */}
        <SearchFilter filters={filters} onChange={handleFilterChange} />

        {/* ── Results header ── */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {!isLoading && (
              <span><strong className="text-dark-900 dark:text-white">{properties?.length ?? 0}</strong> properties found</span>
            )}
          </p>

          {/* View mode toggle */}
          <div className="flex items-center gap-1 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'grid' ? 'bg-primary-500 text-white' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'list' ? 'bg-primary-500 text-white' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <List size={16} />
            </button>
          </div>
        </div>

        {/* ── Error state ── */}
        {isError && (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400 mb-2">Could not load properties.</p>
            <p className="text-sm text-gray-400">Make sure the API server is running on <code className="bg-gray-100 dark:bg-dark-700 px-1 rounded">localhost:3001</code></p>
          </div>
        )}

        {/* ── Grid ── */}
        {!isError && (
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'flex flex-col gap-4'
          }>
            {isLoading
              ? Array.from({ length: 8 }).map((_, i) => <PropertyCardSkeleton key={i} />)
              : properties?.length === 0
                ? (
                  <div className="col-span-full text-center py-20">
                    <SlidersHorizontal size={48} className="text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400 font-semibold">No properties match your filters.</p>
                    <p className="text-sm text-gray-400 mt-1">Try adjusting or clearing your filters.</p>
                  </div>
                )
                : properties.map((p, i) => (
                  <PropertyCard
                    key={p.id}
                    property={p}
                    index={i}
                  />
                ))
            }
          </div>
        )}
      </div>
    </div>
  );
}
