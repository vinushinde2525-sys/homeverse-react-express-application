// src/components/property/PropertyCardSkeleton.jsx
export default function PropertyCardSkeleton() {
  return (
    <div className="bg-white dark:bg-dark-800 rounded-xl border border-gray-100 dark:border-dark-700 overflow-hidden">
      <div className="skeleton aspect-[4/3] w-full" />
      <div className="p-5 border-b border-gray-100 dark:border-dark-700 space-y-3">
        <div className="skeleton h-5 w-1/3 rounded" />
        <div className="skeleton h-4 w-2/3 rounded" />
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-4/5 rounded" />
        <div className="flex gap-4 pt-1">
          <div className="skeleton h-4 w-16 rounded" />
          <div className="skeleton h-4 w-16 rounded" />
          <div className="skeleton h-4 w-20 rounded" />
        </div>
      </div>
      <div className="px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="skeleton w-7 h-7 rounded-full" />
          <div className="space-y-1">
            <div className="skeleton h-3 w-24 rounded" />
            <div className="skeleton h-2.5 w-16 rounded" />
          </div>
        </div>
        <div className="flex gap-1.5">
          <div className="skeleton w-8 h-8 rounded-lg" />
          <div className="skeleton w-8 h-8 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
