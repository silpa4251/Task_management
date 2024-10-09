import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../features/auth/authSlice';

const Navbar = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const navigate = useNavigate();
    const handleLogout = () => {
      dispatch(logout());
      navigate('/')
    };
  return (
    <div>
    <nav className="bg-blue-600 p-4 text-white">
        <div className="container mx-auto flex justify-between">
            <Link to="/dashboard" className="font-bold text-lg">Task Dashboard</Link>
            <div>
                <Link to="/dashboard/addtask" className="bg-white text-blue-600 px-4 py-2 rounded">Add Task</Link>
                {isAuthenticated ? (
                    <>
                        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded ml-2">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/" className="bg-white text-blue-600 px-4 py-2 rounded ml-2">Login</Link>
                        <Link to="/register" className="bg-white text-blue-600 px-4 py-2 rounded ml-2">Register</Link>
                    </>
                )}
            </div>
        </div>
    </nav>
</div>
  )
}

export default Navbar