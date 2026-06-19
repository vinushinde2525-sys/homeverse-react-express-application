// src/components/home/AboutSection.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, Leaf, Wine, ShieldCheck, ArrowRight } from 'lucide-react';
import SectionHeader from '../shared/SectionHeader';

const ABOUT_ITEMS = [
  { icon: Home,        label: 'Smart Home Design' },
  { icon: Leaf,        label: 'Beautiful Surroundings' },
  { icon: Wine,        label: 'Exceptional Lifestyle' },
  { icon: ShieldCheck, label: 'Complete 24/7 Security' },
];

export default function AboutSection() {
  return (
    <section className="py-20 bg-white dark:bg-dark-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Images ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-card2 aspect-[4/3]">
              <img
                src="/assets/images/about-banner-1.png"
                alt="Luxury interior"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating secondary image */}
            <div className="absolute -bottom-8 -right-6 w-48 h-36 rounded-xl overflow-hidden shadow-card2 border-4 border-white dark:border-dark-800">
              <img
                src="/assets/images/about-banner-2.jpg"
                alt="Interior detail"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Experience badge */}
            <div className="absolute top-6 -left-6 bg-primary-500 text-white rounded-xl p-4 shadow-glow text-center">
              <p className="text-3xl font-heading font-extrabold leading-none">15+</p>
              <p className="text-xs mt-1 opacity-90">Years<br />Experience</p>
            </div>
          </motion.div>

          {/* ── Content ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="pb-8 lg:pb-0"
          >
            <SectionHeader
              badge="About Us"
              title="The Leading Real Estate Rental Marketplace"
              center={false}
            />

            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8">
              Over 39,000 people work for us in more than 70 countries all over the world. This breadth of global coverage, combined with our specialist services, gives us an unparalleled reach in real estate.
            </p>

            <ul className="grid grid-cols-2 gap-4 mb-8">
              {ABOUT_ITEMS.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-primary-500" />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">{label}</span>
                </li>
              ))}
            </ul>

            <blockquote className="bg-primary-50 dark:bg-primary-900/10 border-l-4 border-primary-500 px-5 py-4 rounded-r-xl text-gray-600 dark:text-gray-300 text-sm italic leading-relaxed mb-8">
              "Enimad minim veniam quis nostrud exercitation llamco laboris. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            </blockquote>

            <Link to="/about" className="btn-primary uppercase tracking-wide text-sm">
              Our Services <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
