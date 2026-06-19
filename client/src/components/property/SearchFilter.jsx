// src/components/property/SearchFilter.jsx
import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { debounce } from '../../utils';

const TYPES    = ['all', 'Apartment', 'Villa', 'House', 'Townhouse', 'Penthouse', 'Studio'];
const STATUSES = ['all', 'For Rent', 'For Sale'];
const CITIES   = ['all', 'Chicago', 'New York', 'Brooklyn', 'Long Island'];
const SORTS    = [
  { value: 'newest',     label: 'Newest First' },
  { value: 'popular',    label: 'Most Popular' },
  { value: 'price_asc',  label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating',     label: 'Top Rated' },
];

export default function SearchFilter({ filters, onChange }) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [localSearch, setLocalSearch]   = useState(filters.search || '');

  // Debounce search input to avoid firing on every keystroke
  const debouncedSearch = debounce((val) => onChange({ search: val }), 400);

  useEffect(() => {
    debouncedSearch(localSearch);
  }, [localSearch]);

  const handleChange = (key, value) => onChange({ [key]: value });

  const hasActiveFilters = filters.type !== 'all' || filters.status !== 'all' ||
    filters.city !== 'all' || filters.search;

  return (
    <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-card border border-gray-100 dark:border-dark-700 p-5 mb-8">
      {/* ── Main search row ── */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, city, or address…"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="form-input pl-10"
          />
          {localSearch && (
            <button onClick={() => { setLocalSearch(''); onChange({ search: '' }); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <X size={15} />
            </button>
          )}
        </div>

        <select
          value={filters.sort || 'newest'}
          onChange={(e) => handleChange('sort', e.target.value)}
          className="form-select w-full sm:w-48"
        >
          {SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>

        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`flex items-center gap-2 px-4 py-3 rounded-lg border text-sm font-semibold transition-all ${
            showAdvanced || hasActiveFilters
              ? 'bg-primary-50 border-primary-300 text-primary-600 dark:bg-primary-900/20 dark:border-primary-700 dark:text-primary-400'
              : 'border-gray-200 dark:border-dark-600 text-gray-600 dark:text-gray-300 hover:border-primary-300'
          }`}
        >
          <SlidersHorizontal size={16} />
          Filters
          {hasActiveFilters && (
            <span className="w-5 h-5 bg-primary-500 text-white text-xs rounded-full flex items-center justify-center">
              !
            </span>
          )}
          <ChevronDown size={14} className={`transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* ── Advanced filters ── */}
      {showAdvanced && (
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-dark-700 grid grid-cols-2 md:grid-cols-4 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Property Type</label>
            <select value={filters.type || 'all'} onChange={(e) => handleChange('type', e.target.value)} className="form-select">
              {TYPES.map(t => <option key={t} value={t}>{t === 'all' ? 'All Types' : t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Status</label>
            <select value={filters.status || 'all'} onChange={(e) => handleChange('status', e.target.value)} className="form-select">
              {STATUSES.map(s => <option key={s} value={s}>{s === 'all' ? 'All Status' : s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">City</label>
            <select value={filters.city || 'all'} onChange={(e) => handleChange('city', e.target.value)} className="form-select">
              {CITIES.map(c => <option key={c} value={c}>{c === 'all' ? 'All Cities' : c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Min Bedrooms</label>
            <select value={filters.beds || 'any'} onChange={(e) => handleChange('beds', e.target.value)} className="form-select">
              {['any', '1', '2', '3', '4', '5'].map(b => (
                <option key={b} value={b}>{b === 'any' ? 'Any' : `${b}+`}</option>
              ))}
            </select>
          </div>

          {hasActiveFilters && (
            <button
              onClick={() => onChange({ type: 'all', status: 'all', city: 'all', search: '', beds: 'any', sort: 'newest' })}
              className="col-span-2 md:col-span-4 text-sm text-primary-500 hover:text-primary-600 font-semibold flex items-center gap-1.5 mt-1"
            >
              <X size={14} /> Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
