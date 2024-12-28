import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './components/Login';
import { Register } from './components/Register';
import { ProfileSetup } from './components/ProfileSetup';
import { MentorDiscovery } from './components/MentorDiscovery';
import { ConnectionsManagement } from './components/ConnectionsManagement';
import Dashboard from './components/Dashboard';

// Landing Page Component
const LandingPage = () => {
  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-blue-600">MentorMatch</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-600 hover:text-blue-600">
                Login
              </Link>
              <Link 
                to="/register" 
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="justify-center items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mt-24">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              Find Your Perfect
              <span className="text-blue-600"> Mentor Match</span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg md:mt-5 md:text-xl">
              Connect with experienced mentors or passionate mentees in your field.
              Build meaningful relationships and grow together.
            </p>
            <div className="mt-8 flex space-x-4">
              <Link
                to="/register"
                className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-blue-700"
              >
                Join as Mentor
              </Link>
              <Link
                to="/register"
                className="bg-white text-blue-600 px-8 py-3 rounded-md text-lg font-semibold border-2 border-blue-600 hover:bg-blue-50"
              >
                Find a Mentor
              </Link>
            </div>
          </div>
          <div className="mt-12 lg:mt-0">
            <div className="bg-white p-8 rounded-xl shadow-xl">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Expert Mentors</h3>
                    <p className="text-gray-500">Connect with industry professionals</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Skill Matching</h3>
                    <p className="text-gray-500">Find mentors based on your interests</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Flexible Schedule</h3>
                    <p className="text-gray-500">Learn at your own pace</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Protected Route Component
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

// Navigation for authenticated users
const DashboardNav = () => (
  <nav className="bg-white shadow-lg">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-between h-16">
        <div className="flex items-center">
          <span className="text-xl font-bold text-blue-600">MentorMatch</span>
        </div>
        <div className="flex items-center space-x-6">
          <Link to="/dashboard" className="text-gray-600 hover:text-blue-600">
            Dashboard
          </Link>
          <Link to="/profile" className="text-gray-600 hover:text-blue-600">
            Profile
          </Link>
          <Link to="/discover" className="text-gray-600 hover:text-blue-600">
            Find Mentors
          </Link>
          <Link to="/connections" className="text-gray-600 hover:text-blue-600">
            Connections
          </Link>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/';
            }}
            className="text-gray-600 hover:text-blue-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <div className="min-h-screen bg-gray-50">
                <DashboardNav />
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<ProfileSetup />} />
                    <Route path="/discover" element={<MentorDiscovery />} />
                    <Route path="/connections" element={<ConnectionsManagement />} />
                    <Route path="*" element={<Navigate to="/dashboard" />} />
                  </Routes>
                </div>
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;