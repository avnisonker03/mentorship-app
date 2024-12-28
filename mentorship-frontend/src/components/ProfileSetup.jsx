
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export const ProfileSetup = () => {
  const [profile, setProfile] = useState({
    role: '',
    skills: [],
    bio: ''
  });
  const [availableSkills, setAvailableSkills] = useState([]);

  useEffect(() => {
    fetchSkills();
  }, []);

 const fetchSkills = async () => {
    const response = await fetch('/api/skills', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    const skills = await response.json();
    setAvailableSkills(skills);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(profile)
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Profile Setup</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <select
            className="mt-1 w-full px-3 py-2 border rounded-md"
            onChange={(e) => setProfile({...profile, role: e.target.value})}
          >
            <option value="">Select Role</option>
            <option value="mentor">Mentor</option>
            <option value="mentee">Mentee</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Skills</label>
          <select
            multiple
            className="mt-1 w-full px-3 py-2 border rounded-md"
            onChange={(e) => setProfile({
              ...profile,
              skills: Array.from(e.target.selectedOptions, option => option.value)
            })}
          >
            {availableSkills.map(skill => (
              <option key={skill} value={skill}>{skill}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Bio</label>
          <textarea
            className="mt-1 w-full px-3 py-2 border rounded-md"
            rows="4"
            onChange={(e) => setProfile({...profile, bio: e.target.value})}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};