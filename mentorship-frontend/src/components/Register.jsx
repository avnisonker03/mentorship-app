import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      role: ''
    });
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      // try {
      //   const response = await fetch('/api/auth/register', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify(formData)
      //   });
      //   const data = await response.json();
        localStorage.setItem('token', "12345");
        navigate('/dashboard');
      // } catch (err) {
      //   console.error(err);
      // }
    };
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-blue-400">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 w-full px-3 py-2 border rounded-md"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                className="mt-1 w-full px-3 py-2 border rounded-md"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <select
                className="mt-1 w-full px-3 py-2 border rounded-md"
                onChange={(e) => setFormData({...formData, role: e.target.value})}
              >
                <option value="">Select Role</option>
                <option value="mentor">Mentor</option>
                <option value="mentee">Mentee</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    );
  };