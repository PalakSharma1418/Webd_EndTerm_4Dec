export default function StatCard({ title, value, icon, change, darkMode }) {
  return (
    <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-lg transition-all hover:shadow-xl`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{title}</p>
          <p className={`text-3xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{value}</p>
        </div>
        <span className="text-4xl">{icon}</span>
      </div>
      <div className="mt-4">
        <span className="text-green-500 text-sm font-semibold">{change}</span>
        <span className={`text-xs ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>from last month</span>
      </div>
    </div>
  );
}