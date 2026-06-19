// src/components/home/BlogSection.jsx
import { motion } from 'framer-motion';
import { Calendar, Tag, ArrowRight } from 'lucide-react';
import SectionHeader from '../shared/SectionHeader';

const BLOGS = [
  {
    id: 1,
    title: 'The Most Inspiring Interior Design Trends of 2024',
    category: 'Interior',
    date: 'Apr 27, 2024',
    image: '/assets/images/blog-1.png',
    excerpt: 'Explore the hottest interior design trends that are transforming luxury homes across the country.',
  },
  {
    id: 2,
    title: 'Recent Commercial Real Estate Transactions',
    category: 'Estate',
    date: 'Mar 15, 2024',
    image: '/assets/images/blog-2.jpg',
    excerpt: 'A roundup of the most significant commercial real estate deals and what they signal for the market.',
  },
  {
    id: 3,
    title: "Renovating a Living Room? Experts Share Their Secrets",
    category: 'Renovation',
    date: 'Feb 08, 2024',
    image: '/assets/images/blog-3.jpg',
    excerpt: 'Top designers reveal their proven strategies for living room renovations that add maximum value.',
  },
];

export default function BlogSection() {
  return (
    <section className="py-20 bg-white dark:bg-dark-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <SectionHeader
            badge="News & Blogs"
            title="Latest News Feeds"
            subtitle="Stay up to date with real estate market news and tips."
            center={false}
          />
          <a href="#" className="btn-outline shrink-0 self-start md:self-auto">
            View All Posts <ArrowRight size={16} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOGS.map((blog, i) => (
            <motion.article
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="bg-white dark:bg-dark-800 rounded-2xl overflow-hidden shadow-card hover:shadow-card2 transition-all duration-300 group border border-gray-100 dark:border-dark-700"
            >
              <div className="relative overflow-hidden aspect-[16/10]">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 mb-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Tag size={11} className="text-primary-400" />
                    {blog.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={11} className="text-primary-400" />
                    {blog.date}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-dark-900 dark:text-white mb-2 leading-snug group-hover:text-primary-500 transition-colors line-clamp-2">
                  <a href="#">{blog.title}</a>
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 leading-relaxed">
                  {blog.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-dark-700">
                  <span className="text-xs text-gray-400">by Admin</span>
                  <a href="#" className="text-xs font-bold text-primary-500 hover:text-primary-600 uppercase tracking-wide transition-colors">
                    Read More →
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
