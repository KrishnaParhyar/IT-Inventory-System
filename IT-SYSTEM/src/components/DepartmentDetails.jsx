import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api/departments';

const DepartmentDetails = () => {
  const { id: departmentId } = useParams();
  const [form, setForm] = useState({ name: '', location: '' });
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);

  // Fetch department details and employees
  useEffect(() => {
    fetchDepartment();
    fetchEmployees();
    // eslint-disable-next-line
  }, [departmentId]);

  const fetchDepartment = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/${departmentId}`);
      const data = await res.json();
      if (data.status === 'success') {
        setForm({ name: data.department.name, location: data.department.location });
      } else {
        setError('Department not found');
      }
    } catch {
      setError('Error fetching department');
    }
    setLoading(false);
  };

  const fetchEmployees = async () => {
    try {
      const res = await fetch(`${API_URL}/${departmentId}/employees`);
      const data = await res.json();
      if (data.status === 'success') {
        setEmployees(data.employees);
      }
    } catch {}
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setError('');
    try {
      const res = await fetch(`${API_URL}/${departmentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.status === 'success') {
        setEditMode(false);
      } else {
        setError('Failed to update');
      }
    } catch {
      setError('Error updating department');
    }
  };

  // Add employee (inline)
  const [empForm, setEmpForm] = useState({ employee_id: '', name: '', designation: '' });
  const handleEmpChange = (e) => {
    const { name, value } = e.target;
    setEmpForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleAddEmployee = async () => {
    if (!empForm.employee_id || !empForm.name || !empForm.designation) return;
    try {
      const res = await fetch(`${API_URL}/${departmentId}/employees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(empForm),
      });
      const data = await res.json();
      if (data.status === 'success') {
        setEmpForm({ employee_id: '', name: '', designation: '' });
        fetchEmployees();
      }
    } catch {}
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-8">
      <h2 className="text-2xl font-bold mb-4">Department Details</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <div className="mb-4">
        <label className="block font-semibold">Department ID:</label>
        <input value={departmentId} disabled className="w-full bg-gray-100 rounded px-2 py-1" />
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Department Name:</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          disabled={!editMode}
          className="w-full rounded px-2 py-1"
        />
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Location:</label>
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          disabled={!editMode}
          className="w-full rounded px-2 py-1"
        />
      </div>
      <div className="mb-4 flex gap-2">
        {editMode ? (
          <>
            <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-1 rounded">Save</button>
            <button onClick={() => setEditMode(false)} className="bg-gray-400 text-white px-4 py-1 rounded">Cancel</button>
          </>
        ) : (
          <button onClick={() => setEditMode(true)} className="bg-blue-600 text-white px-4 py-1 rounded">Edit</button>
        )}
      </div>
      <h3 className="text-xl font-semibold mt-8 mb-2">Employees:</h3>
      <table className="min-w-full divide-y divide-gray-200 mb-4">
        <thead>
          <tr>
            <th className="px-2 py-1 text-left text-xs font-semibold text-gray-500 uppercase">Employee ID</th>
            <th className="px-2 py-1 text-left text-xs font-semibold text-gray-500 uppercase">Employee Name</th>
            <th className="px-2 py-1 text-left text-xs font-semibold text-gray-500 uppercase">Designation</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td className="px-2 py-1">{emp.employee_id}</td>
              <td className="px-2 py-1">{emp.name}</td>
              <td className="px-2 py-1">{emp.designation}</td>
            </tr>
          ))}
          <tr>
            <td>
              <input
                name="employee_id"
                value={empForm.employee_id}
                onChange={handleEmpChange}
                className="rounded px-1 py-0.5"
                placeholder="New"
              />
            </td>
            <td>
              <input
                name="name"
                value={empForm.name}
                onChange={handleEmpChange}
                className="rounded px-1 py-0.5"
                placeholder="Name"
              />
            </td>
            <td>
              <input
                name="designation"
                value={empForm.designation}
                onChange={handleEmpChange}
                className="rounded px-1 py-0.5"
                placeholder="Designation"
              />
            </td>
            <td>
              <button onClick={handleAddEmployee} className="bg-green-600 text-white px-2 py-0.5 rounded">Add</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentDetails;
