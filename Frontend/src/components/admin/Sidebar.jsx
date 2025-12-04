import { useAdmin } from './AdminContext';
import { Link } from 'react-router-dom';

export default function Sidebar({ isOpen, darkMode }) {
  const { hasAccess } = useAdmin();

  const menuItems = [
    { name: 'Dashboard', icon: '📊', href: '/admin/dashboard', role: 'user' },
    { name: 'Products', icon: '📦', href: '/admin/products', role: 'moderator' },
    { name: 'Orders', icon: '🛒', href: '/admin/orders', role: 'moderator' },
    { name: 'Users', icon: '👥', href: '/admin/users', role: 'admin' },
    { name: 'Analytics', icon: '📈', href: '/admin/analytics', role: 'admin' },
    { name: 'Settings', icon: '⚙️', href: '/admin/settings', role: 'admin' },
  ];

  return (
    <aside
      className={`${isOpen ? 'w-64' : 'w-20'} ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      } transition-all duration-300 shadow-xl h-screen`}
    >
      <div className="p-4">
        <div className={`flex items-center gap-3 ${!isOpen && 'justify-center'}`}>
          <div
            className={`w-10 h-10 ${
              darkMode ? 'bg-blue-600' : 'bg-blue-500'
            } rounded-lg flex items-center justify-center`}
          >
            <span className="text-white font-bold text-lg">A</span>
          </div>

          {isOpen && (
            <div>
              <h1
                className={`font-bold text-lg ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                Admin
              </h1>
              <p
                className={`text-xs ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                Panel
              </p>
            </div>
          )}
        </div>
      </div>

      <nav className="mt-8 px-4 space-y-2">
        {menuItems.map(
          (item, idx) =>
            hasAccess(item.role) && (
              <Link
                key={idx}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  idx === 0
                    ? darkMode
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-500 text-white'
                    : darkMode
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {isOpen && (
                  <span className="text-sm font-medium">{item.name}</span>
                )}
              </Link>
            )
        )}
      </nav>
    </aside>
  );
}
