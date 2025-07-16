import React from 'react';

const mockDesignations = [
  { id: 190, designation: '------------------------' },
  { id: 41, designation: 'A.D. (English Reporting)' },
  { id: 169, designation: 'A.D. (Urdu Reporting)' },
  { id: 69, designation: 'Accounts Officer (KC)' },
  { id: 4, designation: 'Additional Secretary' },
  { id: 233, designation: 'Advisor to Speaker on Legal and Liti' },
];

const Designations = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col items-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="text-pink-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="inline h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a4 4 0 018 0v2M9 7a4 4 0 018 0v2M5 17v-2a4 4 0 018 0v2M5 7a4 4 0 018 0v2" /></svg>
          </span>
          Designations
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">Desig_ID</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">Designation</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockDesignations.map((row, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700 font-mono">{row.id}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800 font-semibold">{row.designation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Designations; 