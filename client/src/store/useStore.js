// src/store/useStore.js
// Global state using Zustand — theme, favorites, comparisons, recently viewed

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set, get) => ({
      // ── Dark Mode ──────────────────────────────────────
      isDark: false,
      toggleTheme: () => {
        const next = !get().isDark;
        set({ isDark: next });
        document.documentElement.classList.toggle('dark', next);
      },
      initTheme: () => {
        const saved = get().isDark;
        document.documentElement.classList.toggle('dark', saved);
      },

      // ── Favorites / Wishlist ───────────────────────────
      favorites: [],
      toggleFavorite: (property) => {
        const { favorites } = get();
        const exists = favorites.find(f => f.id === property.id);
        set({
          favorites: exists
            ? favorites.filter(f => f.id !== property.id)
            : [...favorites, property],
        });
      },
      isFavorite: (id) => get().favorites.some(f => f.id === id),

      // ── Property Comparison ────────────────────────────
      compareList: [],
      toggleCompare: (property) => {
        const { compareList } = get();
        const exists = compareList.find(c => c.id === property.id);
        if (exists) {
          set({ compareList: compareList.filter(c => c.id !== property.id) });
        } else if (compareList.length < 3) {
          set({ compareList: [...compareList, property] });
        }
      },
      isInCompare: (id) => get().compareList.some(c => c.id === id),
      clearCompare: () => set({ compareList: [] }),

      // ── Recently Viewed ────────────────────────────────
      recentlyViewed: [],
      addRecentlyViewed: (property) => {
        const { recentlyViewed } = get();
        const filtered = recentlyViewed.filter(p => p.id !== property.id);
        set({ recentlyViewed: [property, ...filtered].slice(0, 6) });
      },
    }),
    {
      name: 'homeverse-store',
      partialize: (state) => ({
        isDark: state.isDark,
        favorites: state.favorites,
        recentlyViewed: state.recentlyViewed,
      }),
    }
  )
);

export default useStore;
