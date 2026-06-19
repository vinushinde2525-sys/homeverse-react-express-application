// src/components/home/CTASection.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="bg-gradient-to-b from-white dark:from-dark-900 to-dark-800 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-mesh-gradient rounded-3xl px-8 py-12 md:px-14 md:py-14 overflow-hidden"
        >
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 animate-float-slow" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-1/3 -translate-x-1/4 animate-float-slower" />

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-white max-w-lg text-center md:text-left">
              <h2 className="font-heading font-extrabold text-3xl md:text-4xl mb-3 leading-tight">
                Looking for a Dream Home?
              </h2>
              <p className="text-white/80 text-base leading-relaxed">
                We can help you realize your dream of a new home. Our expert agents are ready to guide you every step of the way.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <Link
                to="/properties"
                className="flex items-center gap-2 px-8 py-4 bg-white text-primary-600 font-heading font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-lg"
              >
                Explore Properties <ArrowRight size={18} />
              </Link>
              <Link
                to="/contact"
                className="flex items-center gap-2 px-8 py-4 bg-white/10 text-white border border-white/30 font-semibold rounded-xl hover:bg-white/20 transition-colors"
              >
                <Phone size={18} /> Contact Us
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
