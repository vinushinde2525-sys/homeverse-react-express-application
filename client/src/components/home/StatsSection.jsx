// src/components/home/StatsSection.jsx
import { motion } from 'framer-motion';
import { Building2, Users, Trophy, MapPin } from 'lucide-react';
import { useStats } from '../../hooks/useProperties';

const ICON_MAP = [Building2, Users, Trophy, MapPin];
const FALLBACK = [
  { value: '1,200+', label: 'Properties Listed' },
  { value: '5,000+', label: 'Happy Clients' },
  { value: '200+',   label: 'Expert Agents' },
  { value: '15+',    label: 'Cities Covered' },
];

export default function StatsSection() {
  const { data: stats } = useStats();

  const items = stats
    ? [
        { value: `${stats.totalProperties}+`, label: 'Properties Listed' },
        { value: `${stats.forRent}`,           label: 'For Rent' },
        { value: `${stats.forSale}`,           label: 'For Sale' },
        { value: `${stats.cities}+`,           label: 'Cities Covered' },
      ]
    : FALLBACK;

  return (
    <section className="py-12 bg-dark-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map(({ value, label }, i) => {
            const Icon = ICON_MAP[i];
            return (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex items-center gap-4 p-4"
              >
                <div className="w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center shrink-0">
                  <Icon size={22} className="text-primary-400" />
                </div>
                <div>
                  <p className="font-heading font-bold text-2xl text-white">{value}</p>
                  <p className="text-xs text-gray-400">{label}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
