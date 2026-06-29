export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="relative w-16 h-16 mb-6">
        <div className="absolute inset-0 rounded-full border-4 border-teal-100" />
        <div className="absolute inset-0 rounded-full border-4 border-teal-600 border-t-transparent animate-spin" />
      </div>
      <p className="text-gray-500 text-sm font-medium animate-pulse">Loading...</p>
    </div>
  );
}