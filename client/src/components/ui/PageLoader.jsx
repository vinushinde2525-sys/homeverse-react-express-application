// src/components/ui/PageLoader.jsx
export default function PageLoader() {
  return (
    <div className="fixed inset-0 bg-white dark:bg-dark-900 flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-4 border-gray-200 dark:border-dark-700 rounded-full" />
          <div className="absolute inset-0 border-4 border-primary-500 rounded-full border-t-transparent animate-spin" />
        </div>
        <p className="font-heading font-semibold text-dark-900 dark:text-white">
          Home<span className="text-primary-500">verse</span>
        </p>
      </div>
    </div>
  );
}
