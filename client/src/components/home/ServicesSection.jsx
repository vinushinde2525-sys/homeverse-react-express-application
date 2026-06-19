// src/components/home/ServicesSection.jsx
import { motion } from 'framer-motion';
import { ArrowRight, Home, Key, TrendingUp } from 'lucide-react';
import SectionHeader from '../shared/SectionHeader';

const SERVICES = [
  {
    icon: Home,
    image: '/assets/images/service-1.png',
    title: 'Buy a Home',
    description: 'Over 1 million+ homes for sale available on the website. We can match you with a house you will want to call home.',
    link: 'Find A Home',
    color: 'bg-orange-50 dark:bg-orange-900/10 text-primary-500',
  },
  {
    icon: Key,
    image: '/assets/images/service-2.png',
    title: 'Rent a Home',
    description: 'Flexible rental options across all price ranges. From cozy studios to luxury penthouses — find your ideal rental.',
    link: 'Find Rentals',
    color: 'bg-blue-50 dark:bg-blue-900/10 text-blue-500',
  },
  {
    icon: TrendingUp,
    image: '/assets/images/service-3.png',
    title: 'Sell a Home',
    description: 'Get the best value for your property with our expert agents and data-driven pricing strategies.',
    link: 'List Property',
    color: 'bg-green-50 dark:bg-green-900/10 text-accent-green',
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-dark-800">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          badge="Our Services"
          title="Our Main Focus"
          subtitle="We provide comprehensive real estate services tailored to your unique needs."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {SERVICES.map(({ icon: Icon, image, title, description, link, color }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative bg-white dark:bg-dark-700 rounded-2xl p-8 shadow-card group hover:shadow-card2 transition-all duration-300 overflow-hidden"
            >
              {/* Bottom accent bar */}
              <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-1 bg-primary-500 transition-all duration-300 rounded-b-2xl" />

              <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 overflow-hidden">
                <img src={image} alt={title} className="w-full h-full object-contain" />
              </div>

              <h3 className="font-heading font-bold text-xl text-dark-900 dark:text-white mb-3">{title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">{description}</p>

              <a href="#" className="flex items-center gap-2 text-sm font-semibold text-accent-cadet dark:text-gray-400 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
                {link} <ArrowRight size={15} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
