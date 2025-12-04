import { useAdmin } from './AdminContext';

export default function TopBar({ darkMode, setSidebarOpen }) {
  const { userRole, setUserRole, setDarkMode } = useAdmin();

  return (
    <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="flex items-center justify-between px-8 py-4">
        <button
          onClick={() => setSidebarOpen(prev => !prev)}
          className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
        >
          ☰
        </button>

        <div className="flex items-center gap-6">
          <button
            onClick={() => setDarkMode(prev => !prev)}
            className={`p-2 rounded-lg transition-all ${
              darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-600'
            }`}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>

          <select
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
            className={`px-3 py-2 rounded-lg ${
              darkMode
                ? 'bg-gray-700 text-white border-gray-600'
                : 'bg-gray-100 text-gray-900 border-gray-300'
            } border`}
          >
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
            <option value="user">User</option>
          </select>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
            <div className="hidden sm:block">
              <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Admin</p>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{userRole}</p>
            </div>
          </div>

          <button className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-red-500 hover:bg-red-600 text-white'}`}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}