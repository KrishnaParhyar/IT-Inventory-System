import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

// Role-based menu definitions
const SIDEBAR_MENUS = {
  admin: [
    { label: 'Dashboard', icon: '🏠' },
    { label: 'Departments', icon: '🏢' },
    { label: 'Inventory Items', icon: '💻' },
    { label: 'Issue Items', icon: '📤' },
    { label: 'Receive Items', icon: '📥' },
    { label: 'Transfer Log', icon: '🔄' },
    { label: 'Maintenance Requests', icon: '🛠️' },
    { label: 'Users & Roles', icon: '👤' },
    { label: 'Reports', icon: '📊' },
    { label: 'Settings', icon: '⚙️' },
    { label: 'Logout', icon: '🚪' },
  ],
  operator: [
    { label: 'Inventory Items', icon: '💻' },
    { label: 'Issue Items', icon: '📤' },
    { label: 'Receive Items', icon: '📥' },
    { label: 'Transfer Log', icon: '🔄' },
  ],
  management: [
    { label: 'Dashboard', icon: '🏠' },
    { label: 'Reports', icon: '📊' },
  ],
};

// KPI Cards for IT Inventory
const KPI_CARDS = {
  admin: [
    { label: 'Total Inventory Items', value: 320, icon: '💻', color: 'text-blue-600' },
    { label: 'Items Issued This Month', value: 58, icon: '📤', color: 'text-indigo-600' },
    { label: 'Items Received This Month', value: 44, icon: '📥', color: 'text-green-600' },
    { label: 'Items In Stock', value: 90, icon: '📦', color: 'text-yellow-600' },
  ],
  operator: [
    { label: 'Total Inventory Items', value: 320, icon: '💻', color: 'text-blue-600' },
    { label: 'Items Issued This Month', value: 58, icon: '📤', color: 'text-indigo-600' },
    { label: 'Items Received This Month', value: 44, icon: '📥', color: 'text-green-600' },
    { label: 'Items In Stock', value: 90, icon: '📦', color: 'text-yellow-600' },
  ],
  management: [
    { label: 'Total Inventory Items', value: 320, icon: '💻', color: 'text-blue-600' },
    { label: 'Items Issued This Month', value: 58, icon: '📤', color: 'text-indigo-600' },
    { label: 'Items Received This Month', value: 44, icon: '📥', color: 'text-green-600' },
    { label: 'Items In Stock', value: 90, icon: '📦', color: 'text-yellow-600' },
  ],
};

// Bar chart data: Monthly Issued vs Received
const barData = [
  { month: 'Feb', Issued: 20, Received: 15 },
  { month: 'Mar', Issued: 30, Received: 18 },
  { month: 'Apr', Issued: 25, Received: 22 },
  { month: 'May', Issued: 35, Received: 27 },
  { month: 'Jun', Issued: 28, Received: 30 },
  { month: 'Jul', Issued: 32, Received: 29 },
];

// Pie chart data: Inventory category breakdown
const pieData = [
  { name: 'Laptops', value: 40, color: '#36A2EB' },
  { name: 'Printers', value: 20, color: '#FF6384' },
  { name: 'Network Equipment', value: 15, color: '#FFCE56' },
  { name: 'Monitors', value: 10, color: '#4BC0C0' },
  { name: 'Others', value: 15, color: '#9966FF' },
];

// Recent Item Issuance/Receipts
const recentTransactions = [
  { id: 'TXN001', requester: 'IT Dept', date: '2024-07-01', item: 'Dell Laptop', status: 'Approved' },
  { id: 'TXN002', requester: 'Finance', date: '2024-06-28', item: 'HP Printer', status: 'Delivered' },
  { id: 'TXN003', requester: 'Protocol', date: '2024-06-25', item: 'LAN Switch', status: 'Pending' },
  { id: 'TXN004', requester: 'IT Dept', date: '2024-06-20', item: 'Monitor', status: 'Approved' },
  { id: 'TXN005', requester: 'Finance', date: '2024-06-18', item: 'Keyboard', status: 'Delivered' },
];

// Stock History
const stockHistory = [
  { label: 'Total Issued Items', value: 210, color: 'text-indigo-600' },
  { label: 'Total Returned Items', value: 18, color: 'text-green-600' },
  { label: 'Total Available Stock', value: 90, color: 'text-blue-600' },
  { label: 'Total Maintenance Items', value: 12, color: 'text-yellow-600' },
];

// Stock Alerts
const stockAlerts = [
  { product: 'HP EliteBook', quantity: 3, level: 'Low' },
  { product: 'Dell Monitor', quantity: 5, level: 'Low' },
  { product: 'LAN Switch', quantity: 1, level: 'Critical' },
];

const Dashboard = () => {
  // Simulate user role (dropdown for demo)
  const [userRole, setUserRole] = useState('admin');

  // Role-based menu and cards
  const sidebarMenus = SIDEBAR_MENUS[userRole];
  const kpiCards = KPI_CARDS[userRole];

  // Role-based content visibility
  const canViewDashboard = userRole === 'admin' || userRole === 'management';
  const canViewReports = userRole === 'admin' || userRole === 'management';
  const canEdit = userRole === 'admin';

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#181C2A] text-white flex flex-col py-8 px-4">
        <div className="flex items-center mb-10">
          <span className="text-2xl font-bold tracking-wide">IT Inventory</span>
        </div>
        {/* Role Switcher for Demo */}
        <div className="mb-6">
          <label className="block text-xs mb-1 text-gray-300">Switch Role</label>
          <select
            className="w-full p-2 rounded bg-[#23263A] text-white"
            value={userRole}
            onChange={e => setUserRole(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="operator">Operator</option>
            <option value="management">Management</option>
          </select>
        </div>
        <nav className="flex-1">
          <ul className="space-y-2">
            {sidebarMenus.map((item, idx) => (
              <li
                key={idx}
                className={`p-2 flex items-center gap-2 hover:bg-[#23263A] rounded-lg cursor-pointer`}
                onClick={() => alert(`${item.label} clicked!`)}
              >
                <span>{item.icon}</span> {item.label}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">IT Inventory Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-500">🌐</span>
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="w-10 h-10 rounded-full border-2 border-white shadow cursor-pointer" onClick={() => alert('Profile clicked!')} />
          </div>
        </div>
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {kpiCards.map((kpi, i) => (
            <div key={i} className="bg-white rounded-xl shadow p-6 flex flex-col">
              <span className={`${kpi.color} text-2xl mb-2`}>{kpi.icon}</span>
              <span className="text-lg font-semibold">{kpi.label}</span>
              <span className="text-2xl font-bold">{kpi.value}</span>
            </div>
          ))}
        </div>
        {/* Bar and Pie Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Bar Chart: Monthly Issued vs Received */}
          <div className="bg-white rounded-xl shadow p-6 col-span-2">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-gray-700">Monthly Issued vs Received Items</span>
              <select className="border rounded px-2 py-1 text-sm">
                <option>6 Months</option>
                <option>12 Months</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Issued" fill="#36A2EB" radius={[8, 8, 0, 0]} />
                <Bar dataKey="Received" fill="#FF6384" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Pie Chart: Inventory Category Breakdown */}
          <div className="bg-white rounded-xl shadow p-6">
            <span className="font-semibold text-gray-700">Inventory Category Breakdown</span>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-2 mt-2">
              {pieData.map((d, i) => (
                <span key={i} className="flex items-center text-xs gap-1"><span className="w-3 h-3 rounded-full inline-block" style={{background: d.color}}></span>{d.name}</span>
              ))}
            </div>
          </div>
        </div>
        {/* Recent Transactions & Stock History */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Recent Transactions Table */}
          <div className="bg-white rounded-xl shadow p-6 col-span-2 overflow-x-auto">
            <span className="font-semibold text-gray-700 mb-2 block">Recent Item Issuance/Receipts</span>
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="py-2">ID</th>
                  <th>Requester</th>
                  <th>Date</th>
                  <th>Item</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((row, i) => (
                  <tr key={i} className="border-t cursor-pointer hover:bg-gray-100" onClick={() => alert(`${row.item} for ${row.requester}`)}>
                    <td className="py-2">{row.id}</td>
                    <td>{row.requester}</td>
                    <td>{row.date}</td>
                    <td>{row.item}</td>
                    <td>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${row.status === 'Approved' ? 'bg-green-100 text-green-700' : row.status === 'Delivered' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>{row.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Stock History */}
          <div className="bg-white rounded-xl shadow p-6">
            <span className="font-semibold text-gray-700">Stock History</span>
            <div className="mt-4 space-y-2">
              {stockHistory.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span>{item.label}</span>
                  <span className={`font-bold ${item.color}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Stock Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Stock Alerts Table */}
          <div className="bg-white rounded-xl shadow p-6">
            <span className="font-semibold text-gray-700">Stock Alerts</span>
            <table className="min-w-full text-sm mt-4">
              <thead>
                <tr className="text-left text-gray-500">
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {stockAlerts.map((item, i) => (
                  <tr key={i} className="border-t cursor-pointer hover:bg-gray-100" onClick={() => alert(`${item.product} alert!`)}>
                    <td className="py-2">{item.product}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${item.level === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{item.level}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
