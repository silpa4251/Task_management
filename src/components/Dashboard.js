import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FiHome, FiList, FiCheckCircle, FiSettings } from 'react-icons/fi';

const Dashboard = () => {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="bg-gray-800 text-gray-100 w-64 p-6">
                <h1 className="text-3xl font-bold text-center mb-6">Task Manager</h1>
                <nav className="space-y-4">
                    <NavLink 
                        to="/dashboard"
                        className={({ isActive }) => `flex items-center p-3 hover:bg-gray-700 rounded-md ${isActive ? 'bg-gray-700' : ''}`}
                    >
                        <FiHome className="mr-3" size={20} />
                        Dashboard
                    </NavLink>
                    <NavLink 
                        to="/dashboard/tasklist"
                        className={({ isActive }) => `flex items-center p-3 hover:bg-gray-700 rounded-md ${isActive ? 'bg-gray-700' : ''}`}
                    >
                        <FiList className="mr-3" size={20} />
                        Tasks
                    </NavLink>
                    <NavLink 
                        to="/dashboard/completedtasks"
                        className={({ isActive }) => `flex items-center p-3 hover:bg-gray-700 rounded-md ${isActive ? 'bg-gray-700' : ''}`}
                    >
                        <FiCheckCircle className="mr-3" size={20} />
                        Completed Tasks
                    </NavLink>
                    <NavLink 
                        to="/dashboard/settings"
                        className={({ isActive }) => `flex items-center p-3 hover:bg-gray-700 rounded-md ${isActive ? 'bg-gray-700' : ''}`}
                    >
                        <FiSettings className="mr-3" size={20} />
                        Settings
                    </NavLink>
                </nav>
            </div>

            {/* Main content */}
            <main className="flex-1 p-6 bg-gray-200 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default Dashboard;
