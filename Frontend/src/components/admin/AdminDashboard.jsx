import { useAdmin } from './AdminContext';
import StatCard from './StatCard';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const chartData = [
  { name: 'Jan', sales: 4000, users: 2400 },
  { name: 'Feb', sales: 3000, users: 1398 },
  { name: 'Mar', sales: 2000, users: 9800 },
  { name: 'Apr', sales: 2780, users: 3908 },
  { name: 'May', sales: 1890, users: 4800 },
  { name: 'Jun', sales: 2390, users: 3800 },
];

const pieData = [
  { name: 'Completed', value: 60 },
  { name: 'Pending', value: 25 },
  { name: 'Cancelled', value: 15 },
];

const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

export default function AdminDashboard() {
  const { darkMode, sidebarOpen, setSidebarOpen, stats } = useAdmin();

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className={`flex h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <Sidebar isOpen={sidebarOpen} darkMode={darkMode} />

        <div className="flex-1 flex flex-col overflow-hidden">
          <TopBar darkMode={darkMode} setSidebarOpen={setSidebarOpen} />

          <main className={`flex-1 overflow-auto ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <div className="p-8">
              <div className="mb-8">
                <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Dashboard
                </h1>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Welcome back! Here's what's happening today.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Users" value={stats.totalUsers} icon="👥" change="+12%" darkMode={darkMode} />
                <StatCard title="Total Orders" value={stats.totalOrders} icon="📦" change="+8%" darkMode={darkMode} />
                <StatCard title="Total Products" value={stats.totalProducts} icon="🛍️" change="+5%" darkMode={darkMode} />
                <StatCard title="Total Revenue" value={stats.totalRevenue} icon="💰" change="+15%" darkMode={darkMode} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className={`lg:col-span-2 p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
                  <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Sales Trend
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#444' : '#e5e7eb'} />
                      <XAxis stroke={darkMode ? '#999' : '#666'} />
                      <YAxis stroke={darkMode ? '#999' : '#666'} />
                      <Tooltip contentStyle={{ backgroundColor: darkMode ? '#374151' : '#fff', border: `1px solid ${darkMode ? '#555' : '#ddd'}`, color: darkMode ? '#fff' : '#000' }} />
                      <Legend />
                      <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} />
                      <Line type="monotone" dataKey="users" stroke="#10b981" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
                  <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Order Status
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: darkMode ? '#374151' : '#fff', border: `1px solid ${darkMode ? '#555' : '#ddd'}`, color: darkMode ? '#fff' : '#000' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
                <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Monthly Analytics
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#444' : '#e5e7eb'} />
                    <XAxis stroke={darkMode ? '#999' : '#666'} />
                    <YAxis stroke={darkMode ? '#999' : '#666'} />
                    <Tooltip contentStyle={{ backgroundColor: darkMode ? '#374151' : '#fff', border: `1px solid ${darkMode ? '#555' : '#ddd'}`, color: darkMode ? '#fff' : '#000' }} />
                    <Legend />
                    <Bar dataKey="sales" fill="#3b82f6" />
                    <Bar dataKey="users" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}