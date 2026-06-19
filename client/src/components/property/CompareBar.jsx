// src/components/property/CompareBar.jsx
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Scale, ArrowRight } from 'lucide-react';
import useStore from '../../store/useStore';

export default function CompareBar() {
  const { compareList, toggleCompare, clearCompare } = useStore();

  return (
    <AnimatePresence>
      {compareList.length > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-2xl"
        >
          <div className="bg-dark-800/95 backdrop-blur-md border border-dark-600 rounded-2xl shadow-2xl px-5 py-4">
            <div className="flex items-center gap-4">
              {/* Icon */}
              <div className="w-10 h-10 bg-primary-500/20 rounded-xl flex items-center justify-center shrink-0">
                <Scale size={18} className="text-primary-400" />
              </div>

              {/* Compare items */}
              <div className="flex-1 flex items-center gap-3 overflow-x-auto">
                {compareList.map(p => (
                  <div key={p.id} className="flex items-center gap-2 bg-dark-700 rounded-lg px-3 py-1.5 shrink-0">
                    <img src={p.thumbnail} alt={p.title} className="w-8 h-8 rounded-md object-cover" />
                    <span className="text-white text-xs font-medium max-w-[100px] truncate">{p.title}</span>
                    <button onClick={() => toggleCompare(p)} className="text-gray-400 hover:text-red-400 transition-colors">
                      <X size={13} />
                    </button>
                  </div>
                ))}
                {/* Empty slots */}
                {Array.from({ length: 3 - compareList.length }).map((_, i) => (
                  <div key={i} className="w-24 h-11 border-2 border-dashed border-dark-600 rounded-lg flex items-center justify-center shrink-0">
                    <span className="text-gray-600 text-xs">+ Add</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={clearCompare} className="text-gray-400 hover:text-white text-xs transition-colors">
                  Clear
                </button>
                <Link
                  to="/properties"
                  className="flex items-center gap-1.5 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  Compare <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
