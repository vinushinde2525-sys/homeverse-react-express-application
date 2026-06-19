// src/components/home/AmenitiesSection.jsx
import { motion } from 'framer-motion';
import { Car, Waves, ShieldCheck, HeartPulse, BookOpen, BedDouble, Home, Users } from 'lucide-react';
import SectionHeader from '../shared/SectionHeader';

const AMENITIES = [
  { icon: Car,         label: 'Parking Space' },
  { icon: Waves,       label: 'Swimming Pool' },
  { icon: ShieldCheck, label: 'Private Security' },
  { icon: HeartPulse,  label: 'Medical Center' },
  { icon: BookOpen,    label: 'Library Area' },
  { icon: BedDouble,   label: 'King Size Beds' },
  { icon: Home,        label: 'Smart Homes' },
  { icon: Users,       label: "Kid's Playland" },
];

export default function AmenitiesSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-dark-800">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          badge="Our Amenities"
          title="Building Amenities"
          subtitle="Premium amenities designed to elevate your living experience."
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mt-12">
          {AMENITIES.map(({ icon: Icon, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              whileHover={{ y: -4 }}
              className="relative bg-white dark:bg-dark-700 rounded-2xl p-6 shadow-card group cursor-pointer flex flex-col items-center gap-3 text-center"
            >
              <div className="w-16 h-16 bg-red-50 dark:bg-primary-900/20 rounded-full flex items-center justify-center group-hover:bg-primary-500 transition-all duration-300">
                <Icon size={28} className="text-primary-500 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-heading font-semibold text-sm text-dark-900 dark:text-white group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
                {label}
              </h3>

              {/* Arrow indicator */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white dark:bg-dark-700 rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-primary-500 text-xs">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
