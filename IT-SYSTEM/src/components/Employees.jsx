import React, { useState } from 'react';

const mockIssuedItems = [
  {
    transNo: 2214,
    trans: 'Issue',
    transDate: '',
    itemName: 'HP V193',
    itemType: 'LCD',
    employeeName: 'Mr. Sahibzada Nazeer Ahmad',
    designation: 'Deputy Director (Research)',
    department: 'PAC',
    notes: '',
    groupNo: 1172,
    printSlip: 2,
  },
  {
    transNo: 2361,
    trans: 'Issue',
    transDate: '',
    itemName: 'HP ProDesk 400 G2 Ci7',
    itemType: 'CPU',
    employeeName: 'Mr. Sahibzada Nazeer Ahmad',
    designation: 'Deputy Director (Research)',
    department: 'PAC',
    notes: '',
    groupNo: 1125,
    printSlip: 1,
  },
  {
    transNo: 3323,
    trans: 'Issue',
    transDate: '3/19/2019',
    itemName: 'HP 1300 LaserJet',
    itemType: 'Printer',
    employeeName: 'Mr. Sahibzada Nazeer Ahmad',
    designation: 'Deputy Director (Research)',
    department: 'PAC',
    notes: '',
    groupNo: 2306,
    printSlip: 3,
  },
];

const Employees = () => {
  const [form, setForm] = useState({
    employeeId: '491',
    name: 'Mr. Sahibzada Nazeer Ahmad',
    designation: 'Deputy Director (Research)',
    department: 'PAC',
    intercom: '',
    phone: '',
    mobile: '',
    roomNumber: '',
    floor: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700">Employee ID</label>
              <input name="employeeId" value={form.employeeId} onChange={handleChange} placeholder="Enter employee ID" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 bg-blue-50" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Name</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="Enter full name" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 bg-blue-50" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Designation</label>
              <select name="designation" value={form.designation} onChange={handleChange} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 bg-blue-50">
                <option>Deputy Director (Research)</option>
                <option>Manager</option>
                <option>Staff</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Department</label>
              <select name="department" value={form.department} onChange={handleChange} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 bg-blue-50">
                <option>PAC</option>
                <option>HR</option>
                <option>IT</option>
              </select>
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
              <input name="roomNumber" value={form.roomNumber} onChange={handleChange} placeholder="Enter room number" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 bg-blue-50" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Floor</label>
              <input name="floor" value={form.floor} onChange={handleChange} placeholder="Enter floor" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 bg-blue-50" />
            </div>
            <div className="md:col-span-2 flex justify-end mt-2">
              <button type="button" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-2 rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-semibold text-base">Issue</button>
            </div>
          </form>
        </div>
        {/* Issued Items Table Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Issued Items</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Trans#</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Trans</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Trans Date</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Item Name</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Item Type</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Employee Name</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Designation</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Group No</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Print Slip</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockIssuedItems.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{item.transNo}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-blue-600 cursor-pointer hover:underline">{item.trans}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{item.transDate}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{item.itemName}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{item.itemType}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{item.employeeName}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{item.designation}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{item.department}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{item.notes}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{item.groupNo}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{item.printSlip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employees; 