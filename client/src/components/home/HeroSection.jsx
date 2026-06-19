// src/components/home/HeroSection.jsx
// Layout: diagonal white/orange split (ref image 1) + Three.js spring-wave field
// drifting inside the orange panel (ref images 4 & 5), framer-motion entrance.
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search, ArrowRight, Star, CheckCircle } from 'lucide-react';
import ThreeWaveHero from '../shared/ThreeWaveHero';

const HERO_STATS = [
  { value: '10K+', label: 'Properties' },
  { value: '5K+',  label: 'Happy Clients' },
  { value: '200+', label: 'Expert Agents' },
];

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[94vh] flex items-center bg-white dark:bg-dark-900 overflow-hidden">

      {/* Right orange panel: diagonal curved split, ref image 1 */}
      <div
        className="absolute inset-y-0 right-0 w-full lg:w-[68%] bg-gradient-to-br from-primary-400 via-primary-500 to-primary-700"
        style={{ clipPath: 'ellipse(75% 100% at 100% 50%)' }}
      >
        <ThreeWaveHero />
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-black/5" />
      </div>

      <div className="relative max-w-7xl w-full mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left: white panel content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 dark:bg-primary-900/20 rounded-full text-primary-600 text-xs font-semibold">
              <Home size={13} />
              Real Estate Agency
            </span>
            <span className="flex items-center gap-1 text-xs text-yellow-500">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
              <span className="text-gray-500 dark:text-gray-400 ml-1">4.9 / 5</span>
            </span>
          </div>

          <h1 className="font-heading font-extrabold text-5xl md:text-6xl text-primary-700 dark:text-white leading-[1.08] mb-6">
            Find Your<br />
            <span className="text-gradient">Dream House</span><br />
            By Us
          </h1>

          <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed mb-8 max-w-md">
            Lorem ipsum dolor sit amet, ex duo vide nusquam ullamcorper eam id alienum
            consetetur. Browse premium listings and find your perfect home today.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <button onClick={() => navigate('/properties')} className="btn-dark text-base px-8 py-4">
              See More
            </button>
            <button onClick={() => navigate('/contact')} className="btn-outline-dark text-base px-8 py-4">
              Try Now
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            {['Verified Listings', 'Expert Agents', 'Best Price Guarantee'].map(label => (
              <span key={label} className="flex items-center gap-1.5">
                <CheckCircle size={15} className="text-accent-green" />
                {label}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Right: floating stat / price cards over the wave panel */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="relative hidden lg:block h-[420px]"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="absolute top-6 left-2 bg-white/95 dark:bg-dark-800/95 shadow-card2 rounded-xl p-4 flex items-center gap-3 backdrop-blur-sm"
          >
            <div className="w-10 h-10 bg-primary-500/10 rounded-lg flex items-center justify-center">
              <Home size={20} className="text-primary-500" />
            </div>
            <div>
              <p className="text-xs text-gray-500">New listing</p>
              <p className="text-sm font-bold text-dark-900 dark:text-white">Penthouse NYC</p>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 3, delay: 1.2, ease: 'easeInOut' }}
            className="absolute bottom-24 right-2 bg-white shadow-glow rounded-xl p-4 text-primary-600"
          >
            <p className="text-xs opacity-70">Starting from</p>
            <p className="text-xl font-heading font-bold">$8,500<span className="text-sm font-normal">/mo</span></p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[92%] glass-card bg-white/90 dark:bg-dark-800/90 p-4 rounded-xl"
          >
            <div className="flex items-center justify-between">
              {HERO_STATS.map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p className="font-heading font-bold text-xl text-primary-500">{value}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Quick search bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4"
      >
        <div className="bg-white dark:bg-dark-800 shadow-card2 rounded-t-2xl px-6 py-4 flex flex-wrap gap-3 items-end">
          <QuickSearchForm />
        </div>
      </motion.div>
    </section>
  );
}

function QuickSearchForm() {
  const navigate = useNavigate();
  const submit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const params = new URLSearchParams();
    for (const [k, v] of form.entries()) { if (v && v !== 'all') params.set(k, v); }
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <form onSubmit={submit} className="flex flex-wrap gap-3 w-full items-end">
      <div className="flex-1 min-w-[150px]">
        <label className="block text-xs font-semibold text-gray-500 mb-1">Location</label>
        <select name="city" className="form-select">
          <option value="all">All Cities</option>
          <option value="Chicago">Chicago</option>
          <option value="New York">New York</option>
          <option value="Brooklyn">Brooklyn</option>
        </select>
      </div>
      <div className="flex-1 min-w-[130px]">
        <label className="block text-xs font-semibold text-gray-500 mb-1">Property Type</label>
        <select name="type" className="form-select">
          <option value="all">All Types</option>
          <option>Apartment</option>
          <option>Villa</option>
          <option>House</option>
          <option>Penthouse</option>
        </select>
      </div>
      <div className="flex-1 min-w-[130px]">
        <label className="block text-xs font-semibold text-gray-500 mb-1">Status</label>
        <select name="status" className="form-select">
          <option value="all">Buy or Rent</option>
          <option>For Rent</option>
          <option>For Sale</option>
        </select>
      </div>
      <button type="submit" className="btn-primary h-[46px] px-6">
        <Search size={16} />
        Search
      </button>
    </form>
  );
}
