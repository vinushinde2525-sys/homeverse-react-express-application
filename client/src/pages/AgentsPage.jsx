// src/pages/AgentsPage.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Phone, Mail, Twitter, Linkedin, Instagram, Building2, Users, Trophy } from 'lucide-react';
import { useAgents } from '../hooks/useProperties';
import SectionHeader from '../components/shared/SectionHeader';

export default function AgentsPage() {
  const { data: agents, isLoading, isError } = useAgents();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      {/* Header */}
      <div className="bg-dark-800 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <span className="section-badge">Team</span>
          <h1 className="font-heading font-extrabold text-4xl md:text-5xl text-white mt-2">Our Expert Agents</h1>
          <p className="text-gray-400 mt-3 text-sm max-w-xl">
            Meet the dedicated professionals who make your real estate dreams a reality.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {isError && <p className="text-center text-gray-500 py-10">Could not load agents. Make sure the server is running.</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => <AgentSkeleton key={i} />)
            : agents?.map((agent, i) => <AgentCard key={agent.id} agent={agent} index={i} />)
          }
        </div>
      </div>
    </div>
  );
}

function AgentCard({ agent, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="bg-white dark:bg-dark-800 rounded-2xl overflow-hidden shadow-card hover:shadow-card2 transition-all duration-300 group border border-gray-100 dark:border-dark-700"
    >
      {/* Top color band */}
      <div className="h-2 bg-gradient-to-r from-primary-500 to-primary-600" />

      <div className="p-6 text-center">
        <div className="relative w-20 h-20 mx-auto mb-4">
          <img src={agent.avatar} alt={agent.name} className="w-full h-full rounded-full object-cover border-4 border-white dark:border-dark-700 shadow-card" />
          <span className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white dark:border-dark-700 ${agent.isAvailable ? 'bg-green-400' : 'bg-gray-400'}`} />
        </div>

        <h3 className="font-heading font-bold text-dark-900 dark:text-white mb-0.5">{agent.name}</h3>
        <p className="text-xs text-gray-400 mb-2">{agent.title}</p>

        <div className="flex items-center justify-center gap-1 mb-4">
          <Star size={13} className="text-yellow-400 fill-yellow-400" />
          <span className="text-xs font-bold text-dark-900 dark:text-white">{agent.rating}</span>
          <span className="text-xs text-gray-400">({agent.reviewCount})</span>
        </div>

        {/* Specs row */}
        <div className="grid grid-cols-3 gap-2 py-4 border-y border-gray-100 dark:border-dark-700 mb-4">
          {[
            { icon: Building2, value: agent.stats.propertiesSold, label: 'Sold' },
            { icon: Users,     value: agent.stats.happyClients,   label: 'Clients' },
            { icon: Trophy,    value: agent.stats.awardsWon,       label: 'Awards' },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="text-center">
              <p className="font-heading font-bold text-sm text-dark-900 dark:text-white">{value}</p>
              <p className="text-[10px] text-gray-400">{label}</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <a href={`tel:${agent.phone}`} className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-gray-100 dark:bg-dark-700 rounded-lg text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-primary-50 hover:text-primary-600 dark:hover:bg-primary-900/20 transition-colors">
            <Phone size={13} /> Call
          </a>
          <a href={`mailto:${agent.email}`} className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-gray-100 dark:bg-dark-700 rounded-lg text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-primary-50 hover:text-primary-600 dark:hover:bg-primary-900/20 transition-colors">
            <Mail size={13} /> Email
          </a>
        </div>

        <div className="flex items-center justify-center gap-3 mt-4">
          {[Twitter, Linkedin, Instagram].map((Icon, i) => (
            <a key={i} href="#" className="text-gray-300 dark:text-gray-500 hover:text-primary-500 transition-colors">
              <Icon size={15} />
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function AgentSkeleton() {
  return (
    <div className="bg-white dark:bg-dark-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-dark-700">
      <div className="h-2 bg-gray-200 dark:bg-dark-700" />
      <div className="p-6 text-center space-y-3">
        <div className="skeleton w-20 h-20 rounded-full mx-auto" />
        <div className="skeleton h-4 w-32 mx-auto rounded" />
        <div className="skeleton h-3 w-24 mx-auto rounded" />
        <div className="skeleton h-3 w-20 mx-auto rounded" />
        <div className="grid grid-cols-3 gap-2 py-3">
          {[1,2,3].map(i => <div key={i} className="skeleton h-8 rounded" />)}
        </div>
        <div className="flex gap-2">
          <div className="skeleton flex-1 h-9 rounded-lg" />
          <div className="skeleton flex-1 h-9 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
