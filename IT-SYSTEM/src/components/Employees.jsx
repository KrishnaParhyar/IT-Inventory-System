import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5000/api/employees';

const Employees = () => {
  const [form, setForm] = useState({
    employee_id: '',
    name: '',
    designation: '',
    department: '',
    intercom: '',
    phone: '',
    mobile: '',
    room_number: '',
    floor: '',
  });
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch employees from backend
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      if (data.status === 'success') {
        setEmployees(data.employees);
      } else {
        setError('Failed to fetch employees');
      }
    } catch (err) {
      setError('Error fetching employees');
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.status === 'success') {
        setForm({
          employee_id: '',
          name: '',
          designation: '',
          department: '',
          intercom: '',
          phone: '',
          mobile: '',
          room_number: '',
          floor: '',
        });
        fetchEmployees();
      } else {
        setError(data.message || 'Failed to add employee');
      }
    } catch (err) {
      setError('Error adding employee');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col items-center p-4">
      <div className="w-full max-w-4xl flex flex-col gap-8 mt-8">
        {/* Employee Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-10 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="inline h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </span>
            Employee Details
          </h2>
          {error && <div className="text-red-600 mb-2">{error}</div>}
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Employee ID</label>
              <input name="employee_id" value={form.employee_id} onChange={handleChange} placeholder="Enter employee ID" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 bg-blue-50" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Name</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="Enter full name" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 bg-blue-50" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Designation</label>
              <input name="designation" value={form.designation} onChange={handleChange} placeholder="Enter designation" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 bg-blue-50" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Department</label>
              <input name="department" value={form.department} onChange={handleChange} placeholder="Enter department" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 bg-blue-50" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Intercom</label>
              <input name="intercom" value={form.intercom} onChange={handleChange} placeholder="Enter intercom" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 bg-blue-50" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="Enter phone number" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 bg-blue-50" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Mobile</label>
              <input name="mobile" value={form.mobile} onChange={handleChange} placeholder="Enter mobile number" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 bg-blue-50" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Room Number</label>
              <input name="room_number" value={form.room_number} onChange={handleChange} placeholder="Enter room number" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 bg-blue-50" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Floor</label>
              <input name="floor" value={form.floor} onChange={handleChange} placeholder="Enter floor" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 bg-blue-50" />
            </div>
            <div className="md:col-span-2 flex justify-end mt-2">
              <button type="submit" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-2 rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-semibold text-base">Issue</button>
            </div>
          </form>
        </div>
        {/* Employees Table Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Employees</h3>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Employee ID</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Designation</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Intercom</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Mobile</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Room No</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Floor</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {employees.map((emp) => (
                    <tr key={emp.id}>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{emp.id}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{emp.employee_id}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{emp.name}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{emp.designation}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{emp.department}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{emp.intercom}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{emp.phone}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{emp.mobile}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{emp.room_number}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{emp.floor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Employees; 