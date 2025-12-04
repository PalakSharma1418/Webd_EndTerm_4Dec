import { useAdmin } from './AdminContext';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { useState } from 'react';

export default function Users() {
  const { darkMode, sidebarOpen, setSidebarOpen } = useAdmin();
  const [users] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', joinDate: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', joinDate: '2024-02-20' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Moderator', status: 'Inactive', joinDate: '2024-03-10' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active', joinDate: '2024-04-05' },
  ]);

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className={`flex h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <Sidebar isOpen={sidebarOpen} darkMode={darkMode} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopBar darkMode={darkMode} setSidebarOpen={setSidebarOpen} />
          <main className={`flex-1 overflow-auto ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Users Management
                </h1>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  + Add User
                </button>
              </div>

              <div className={`${darkMode ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-lg overflow-hidden`}>
                <table className="w-full">
                  <thead className={darkMode ? 'bg-gray-600' : 'bg-gray-100'}>
                    <tr>
                      <th className={`px-6 py-3 text-left ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Name</th>
                      <th className={`px-6 py-3 text-left ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Email</th>
                      <th className={`px-6 py-3 text-left ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Role</th>
                      <th className={`px-6 py-3 text-left ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Join Date</th>
                      <th className={`px-6 py-3 text-left ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Status</th>
                      <th className={`px-6 py-3 text-left ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className={`border-t ${darkMode ? 'border-gray-600 hover:bg-gray-600' : 'border-gray-200 hover:bg-gray-50'}`}>
                        <td className={`px-6 py-4 font-medium ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{user.name}</td>
                        <td className={`px-6 py-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{user.email}</td>
                        <td className={`px-6 py-4`}>
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            user.role === 'Admin'
                              ? 'bg-red-600 text-white'
                              : user.role === 'Moderator'
                              ? 'bg-yellow-600 text-white'
                              : 'bg-blue-600 text-white'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className={`px-6 py-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{user.joinDate}</td>
                        <td className={`px-6 py-4`}>
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            user.status === 'Active'
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-600 text-white'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className={`px-6 py-4`}>
                          <button className={`text-blue-500 hover:text-blue-700 mr-4`}>Edit</button>
                          <button className={`text-red-500 hover:text-red-700`}>Delete</button>
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
