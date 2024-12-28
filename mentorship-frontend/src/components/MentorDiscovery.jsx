import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const MentorDiscovery = () => {
  const [mentors, setMentors] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [availableSkills, setAvailableSkills] = useState([]);

  useEffect(() => {
    fetchMentors();
    fetchSkills();
  }, [selectedSkills]);

  const fetchMentors = async () => {
    const response = await fetch(`/api/mentors?skills=${selectedSkills.join(',')}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    const data = await response.json();
    setMentors(data);
  };

  const fetchSkills = async () => {
    const response = await fetch('/api/skills', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    const skills = await response.json();
    setAvailableSkills(skills);
  };

  const sendConnectionRequest = async (mentorId) => {
    try {
      await fetch('/api/connections/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ mentorId })
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Find Mentors</h2>
        <select
          multiple
          className="w-full px-3 py-2 border rounded-md"
          onChange={(e) => setSelectedSkills(
            Array.from(e.target.selectedOptions, option => option.value)
          )}
        >
          {availableSkills.map(skill => (
            <option key={skill} value={skill}>{skill}</option>
          ))}
        </select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentors.map(mentor => (
          <div key={mentor._id} className="border rounded-lg p-4 shadow-sm">
            <h3 className="font-bold text-lg">{mentor.email}</h3>
            <p className="text-gray-600 mt-2">{mentor.bio}</p>
            <div className="mt-3">
              <h4 className="font-medium">Skills:</h4>
              <div className="flex flex-wrap gap-2 mt-1">
                {mentor.skills.map(skill => (
                  <span key={skill} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={() => sendConnectionRequest(mentor._id)}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Request Connection
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};