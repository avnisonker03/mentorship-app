import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const ConnectionsManagement = () => {
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    const response = await fetch('/api/connections', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    const data = await response.json();
    setConnections(data);
  };

  const updateConnectionStatus = async (connectionId, status) => {
    try {
      await fetch(`/api/connections/${connectionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status })
      });
      fetchConnections();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Connections</h2>
      <div className="space-y-4">
        {connections.map(connection => (
          <div key={connection._id} className="border rounded-lg p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">
                {connection.mentor.email} ↔ {connection.mentee.email}
              </p>
              <p className="text-sm text-gray-600">Status: {connection.status}</p>
            </div>
            {connection.status === 'pending' && (
              <div className="space-x-2">
                <button
                  onClick={() => updateConnectionStatus(connection._id, 'accepted')}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                  Accept
                </button>
                <button
                  onClick={() => updateConnectionStatus(connection._id, 'declined')}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                  Decline
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};