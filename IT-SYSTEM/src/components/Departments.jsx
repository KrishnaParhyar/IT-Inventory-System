import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api/departments';

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', location: '' });
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', location: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      if (data.status === 'success') {
        setDepartments(data.departments);
      } else {
        setError('Failed to fetch departments');
      }
    } catch (err) {
      setError('Error fetching departments');
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.name.trim()) {
      setError('Department name is required');
      return;
    }
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.status === 'success') {
        setForm({ name: '', location: '' });
        fetchDepartments();
      } else {
        setError(data.message || 'Failed to add department');
      }
    } catch (err) {
      setError('Error adding department');
    }
  };

  const handleEditClick = (dept) => {
    setEditId(dept.id);
    setEditForm({ name: dept.name, location: dept.location });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async (id) => {
    setError('');
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });
      const data = await res.json();
      if (data.status === 'success') {
        setEditId(null);
        fetchDepartments();
      } else {
        setError(data.message || 'Failed to update department');
      }
    } catch (err) {
      setError('Error updating department');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this department?')) return;
    setError('');
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.status === 'success') {
        fetchDepartments();
      } else {
        setError(data.message || 'Failed to delete department');
      }
    } catch (err) {
      setError('Error deleting department');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-8">
      <h2 className="text-2xl font-bold mb-4">Departments</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <form className="flex gap-4 mb-6" onSubmit={handleAdd}>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Department Name"
          className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 bg-blue-50"
        />
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 bg-blue-50"
        />
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-all font-semibold text-base">Add</button>
      </form>
      <table className="min-w-full divide-y divide-gray-200 mb-4">
        <thead>
          <tr>
            <th className="px-2 py-1 text-left text-xs font-semibold text-gray-500 uppercase">ID</th>
            <th className="px-2 py-1 text-left text-xs font-semibold text-gray-500 uppercase">Name</th>
            <th className="px-2 py-1 text-left text-xs font-semibold text-gray-500 uppercase">Location</th>
            <th className="px-2 py-1 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dept) => (
            <tr key={dept.id}>
              <td className="px-2 py-1">{dept.id}</td>
              <td className="px-2 py-1">
                {editId === dept.id ? (
                  <input
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange}
                    className="rounded px-1 py-0.5"
                  />
                ) : (
                  <span
                    className="text-blue-700 underline cursor-pointer"
                    onClick={() => navigate(`/departments/${dept.id}`)}
                  >
                    {dept.name}
                  </span>
                )}
              </td>
              <td className="px-2 py-1">
                {editId === dept.id ? (
                  <input
                    name="location"
                    value={editForm.location}
                    onChange={handleEditChange}
                    className="rounded px-1 py-0.5"
                  />
                ) : (
                  dept.location
                )}
              </td>
              <td className="px-2 py-1">
                {editId === dept.id ? (
                  <>
                    <button onClick={() => handleEditSave(dept.id)} className="bg-green-600 text-white px-2 py-0.5 rounded mr-2">Save</button>
                    <button onClick={() => setEditId(null)} className="bg-gray-400 text-white px-2 py-0.5 rounded">Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(dept)} className="bg-yellow-500 text-white px-2 py-0.5 rounded mr-2">Edit</button>
                    <button onClick={() => handleDelete(dept.id)} className="bg-red-600 text-white px-2 py-0.5 rounded">Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Departments;
