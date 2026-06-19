// src/pages/AboutPage.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, Leaf, Wine, ShieldCheck, Users, Building2, Trophy, Globe, ArrowRight } from 'lucide-react';
import SectionHeader from '../components/shared/SectionHeader';

const VALUES = [
  { icon: Home,        title: 'Smart Design',        desc: 'We match clients with properties featuring the latest smart home technology.' },
  { icon: Leaf,        title: 'Sustainable Living',  desc: 'Championing eco-friendly developments and green neighbourhoods.' },
  { icon: ShieldCheck, title: 'Trust & Security',    desc: 'Every listing is verified. Every agent is licensed and background-checked.' },
  { icon: Globe,       title: 'Global Reach',        desc: 'Operating in 70+ countries with 39,000+ dedicated professionals.' },
];

const TEAM_STATS = [
  { icon: Building2, value: '1,200+', label: 'Properties Listed' },
  { icon: Users,     value: '5,000+', label: 'Happy Clients' },
  { icon: Trophy,    value: '15+',    label: 'Industry Awards' },
  { icon: Globe,     value: '70+',    label: 'Countries' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-dark-900">
      {/* Hero */}
      <div className="bg-dark-800 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/30 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="section-badge">About Us</span>
            <h1 className="font-heading font-extrabold text-5xl md:text-6xl text-white mt-3 leading-tight">
              The Leading Real Estate<br />
              <span className="text-primary-400">Rental Marketplace</span>
            </h1>
            <p className="text-gray-400 mt-4 text-base max-w-2xl leading-relaxed">
              Over 39,000 people work for us in more than 70 countries. This breadth of global coverage, combined with specialist services, gives us unparalleled reach.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-primary-500 py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {TEAM_STATS.map(({ icon: Icon, value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-white text-center"
            >
              <Icon size={28} className="mx-auto mb-2 opacity-80" />
              <p className="font-heading font-extrabold text-3xl">{value}</p>
              <p className="text-sm opacity-80">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Story section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="relative rounded-2xl overflow-hidden shadow-card2 aspect-[4/3]">
              <img
                src="/assets/images/about-banner-1.png"
                alt="Our office"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <SectionHeader badge="Our Story" title="Built on Trust, Driven by Passion" center={false} />
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">
              Founded in 2009, Homeverse started as a small boutique agency in Brooklyn. Today, we are one of the most trusted real estate platforms in the country, serving thousands of buyers, sellers, and renters each year.
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8">
              Our mission has never changed: help people find a place they love to call home, with honesty, expertise, and care at every step.
            </p>
            <Link to="/contact" className="btn-primary">
              Get In Touch <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50 dark:bg-dark-800">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader badge="Our Values" title="What We Stand For" subtitle="The principles that guide everything we do." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {VALUES.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-dark-700 rounded-2xl p-6 shadow-card text-center"
              >
                <div className="w-14 h-14 bg-primary-50 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon size={24} className="text-primary-500" />
                </div>
                <h3 className="font-heading font-bold text-dark-900 dark:text-white mb-2">{title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
