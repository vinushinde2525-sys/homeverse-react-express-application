// src/components/shared/SectionHeader.jsx
import { motion } from 'framer-motion';

export default function SectionHeader({ badge, title, subtitle, center = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={center ? 'text-center' : ''}
    >
      {badge && <span className="section-badge">{badge}</span>}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className={`section-subtitle ${center ? 'max-w-xl mx-auto' : 'max-w-xl'}`}>{subtitle}</p>}
    </motion.div>
  );
}
