// src/components/home/TestimonialsSection.jsx
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import SectionHeader from '../shared/SectionHeader';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'James Hartford',
    role: 'Home Buyer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    text: 'Homeverse made finding our dream home incredibly easy. William was professional, knowledgeable, and always available. We closed in 30 days!',
    rating: 5,
    property: 'Luxury Villa, Chicago',
  },
  {
    id: 2,
    name: 'Priya Nair',
    role: 'Property Investor',
    avatar: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=100&q=80',
    text: "Sarah's market expertise is unmatched. She found me three off-market properties in Manhattan. My portfolio grew 40% in one year thanks to her insights.",
    rating: 5,
    property: 'Multiple NYC Units',
  },
  {
    id: 3,
    name: 'David Chen',
    role: 'First-time Renter',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    text: "I was nervous as a first-time renter, but the team walked me through every step. Found a beautiful apartment in Lincoln Park within my budget.",
    rating: 5,
    property: 'Lincoln Park Apartment',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-dark-800">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          badge="Testimonials"
          title="What Our Clients Say"
          subtitle="Real stories from real people who found their perfect home with us."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="bg-dark-700 rounded-2xl p-6 relative border border-dark-600"
            >
              <Quote size={32} className="text-primary-500/20 absolute top-4 right-4" />

              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, si) => (
                  <Star key={si} size={14} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>

              <div className="flex items-center gap-3 pt-4 border-t border-dark-600">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-white text-sm">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role} · {t.property}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
