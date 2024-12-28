import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [userData, setUserData] = useState({
    role: '',
    name: '',
    pendingConnections: [],
    activeConnections: [],
    recentActivity: []
  });

  const [stats, setStats] = useState({
    totalConnections: 0,
    pendingRequests: 0,
    completedSessions: 0
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/dashboard', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      setUserData(data.userData);
      setStats(data.stats);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {userData.name || 'User'}!
        </h1>
        <p className="mt-1 text-gray-600">
          You are logged in as a {userData.role || 'user'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="text-blue-600 text-sm font-medium">Total Connections</div>
          <div className="mt-2 text-3xl font-bold">{stats.totalConnections}</div>
        </div>
        <div className="bg-yellow-50 p-6 rounded-lg">
          <div className="text-yellow-600 text-sm font-medium">Pending Requests</div>
          <div className="mt-2 text-3xl font-bold">{stats.pendingRequests}</div>
        </div>
        <div className="bg-green-50 p-6 rounded-lg">
          <div className="text-green-600 text-sm font-medium">Completed Sessions</div>
          <div className="mt-2 text-3xl font-bold">{stats.completedSessions}</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link 
              to="/discover" 
              className="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <div className="font-medium text-blue-600">Find Mentors</div>
              <div className="text-sm text-blue-500">Browse available mentors</div>
            </Link>
            <Link 
              to="/connections" 
              className="block p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <div className="font-medium text-green-600">Manage Connections</div>
              <div className="text-sm text-green-500">View and manage your mentorship connections</div>
            </Link>
            <Link 
              to="/profile" 
              className="block p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <div className="font-medium text-purple-600">Update Profile</div>
              <div className="text-sm text-purple-500">Keep your profile up to date</div>
            </Link>
          </div>
        </div>

        {/* Pending Connections */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Pending Connections</h2>
          {userData.pendingConnections?.length > 0 ? (
            <div className="space-y-3">
              {userData.pendingConnections.map((connection) => (
                <div key={connection.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">{connection.name}</div>
                    <div className="text-sm text-gray-500">{connection.role}</div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700">
                      Accept
                    </button>
                    <button className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700">
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No pending connection requests</p>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
        {userData.recentActivity?.length > 0 ? (
          <div className="space-y-4">
            {userData.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="font-medium">{activity.description}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No recent activity</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;