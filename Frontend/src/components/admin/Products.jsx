import { useAdmin } from './AdminContext';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { useState } from 'react';

export default function Products() {
  const { darkMode, sidebarOpen, setSidebarOpen } = useAdmin();
  const [products] = useState([
    { id: 1, name: 'Laptop Pro', category: 'Electronics', price: '$1,299', stock: 45, status: 'Active' },
    { id: 2, name: 'Wireless Mouse', category: 'Accessories', price: '$29', stock: 120, status: 'Active' },
    { id: 3, name: 'USB-C Hub', category: 'Accessories', price: '$49', stock: 0, status: 'Out of Stock' },
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
                  Products Management
                </h1>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  + Add Product
                </button>
              </div>

              <div className={`${darkMode ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-lg overflow-hidden`}>
                <table className="w-full">
                  <thead className={darkMode ? 'bg-gray-600' : 'bg-gray-100'}>
                    <tr>
                      <th className={`px-6 py-3 text-left ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Product</th>
                      <th className={`px-6 py-3 text-left ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Category</th>
                      <th className={`px-6 py-3 text-left ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Price</th>
                      <th className={`px-6 py-3 text-left ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Stock</th>
                      <th className={`px-6 py-3 text-left ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Status</th>
                      <th className={`px-6 py-3 text-left ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className={`border-t ${darkMode ? 'border-gray-600 hover:bg-gray-600' : 'border-gray-200 hover:bg-gray-50'}`}>
                        <td className={`px-6 py-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{product.name}</td>
                        <td className={`px-6 py-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{product.category}</td>
                        <td className={`px-6 py-4 font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{product.price}</td>
                        <td className={`px-6 py-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{product.stock}</td>
                        <td className={`px-6 py-4`}>
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            product.status === 'Active'
                              ? 'bg-green-600 text-white'
                              : 'bg-red-600 text-white'
                          }`}>
                            {product.status}
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