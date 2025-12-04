import { useAdmin } from './AdminContext';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { useState } from 'react';

export default function Orders() {
  const { darkMode, sidebarOpen, setSidebarOpen } = useAdmin();
  const [orders] = useState([
    { id: 'ORD-001', customer: 'John Doe', amount: '$1,299', status: 'Delivered', date: '2024-12-03' },
    { id: 'ORD-002', customer: 'Jane Smith', amount: '$456', status: 'Processing', date: '2024-12-04' },
    { id: 'ORD-003', customer: 'Bob Johnson', amount: '$789', status: 'Pending', date: '2024-12-04' },
  ]);

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className={`flex h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <Sidebar isOpen={sidebarOpen} darkMode={darkMode} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopBar darkMode={darkMode} setSidebarOpen={setSidebarOpen} />
          <main className={`flex-1 overflow-auto ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <div className="p-8">
              <h1 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Orders Management
              </h1>

              <div className={`${darkMode ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-lg overflow-hidden`}>
                <table className="w-full">
                  <thead className={darkMode ? 'bg-gray-600' : 'bg-gray-100'}>
                    <tr>
                      <th className={`px-6 py-3 text-left ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Order ID</th>
                      <th className={`px-6 py-3 text-left ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Customer</th>
                      <th className={`px-6 py-3 text-left ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Amount</th>
                      <th className={`px-6 py-3 text-left ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Date</th>
                      <th className={`px-6 py-3 text-left ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Status</th>
                      <th className={`px-6 py-3 text-left ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className={`border-t ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                        <td className={`px-6 py-4 font-mono ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{order.id}</td>
                        <td className={`px-6 py-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{order.customer}</td>
                        <td className={`px-6 py-4 font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{order.amount}</td>
                        <td className={`px-6 py-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{order.date}</td>
                        <td className={`px-6 py-4`}>
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            order.status === 'Delivered'
                              ? 'bg-green-600 text-white'
                              : order.status === 'Processing'
                              ? 'bg-blue-600 text-white'
                              : 'bg-yellow-600 text-white'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className={`px-6 py-4`}>
                          <button className={`text-blue-500 hover:text-blue-700`}>View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}