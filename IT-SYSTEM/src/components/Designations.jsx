import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5000/api/designations';

const Designations = () => {
  const [designation, setDesignation] = useState('');
  const [designations, setDesignations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDesignations();
  }, []);

  const fetchDesignations = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      if (data.status === 'success') {
        setDesignations(data.designations);
      } else {
        setError('Failed to fetch designations');
      }
    } catch (err) {
      setError('Error fetching designations');
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!designation.trim()) {
      setError('Please enter a designation.');
      return;
    }
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ designation }),
      });
      const data = await res.json();
      if (data.status === 'success') {
        setDesignation('');
        fetchDesignations();
      } else {
        setError(data.message || 'Failed to add designation');
      }
    } catch (err) {
      setError('Error adding designation');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col items-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="text-pink-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="inline h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a4 4 0 018 0v2M9 7a4 4 0 018 0v2M5 17v-2a4 4 0 018 0v2M5 7a4 4 0 018 0v2" /></svg>
          </span>
          Designations
        </h2>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <form className="flex gap-4 mb-6" onSubmit={handleSubmit}>
          <input
            type="text"
            value={designation}
            onChange={e => setDesignation(e.target.value)}
            placeholder="Enter new designation"
            className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm px-4 py-2 bg-pink-50"
          />
          <button type="submit" className="bg-gradient-to-r from-pink-600 to-pink-400 text-white px-6 py-2 rounded-lg shadow-lg hover:from-pink-700 hover:to-pink-500 transition-all font-semibold text-base">Add</button>
        </form>
        <div className="overflow-x-auto">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">Desig_ID</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">Designation</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {designations.map((row) => (
                  <tr key={row.id}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700 font-mono">{row.id}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800 font-semibold">{row.designation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Designations; 