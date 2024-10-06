
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
// import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard';

function App() {
  return (
   <>
   <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/dashboard' element={<Dashboard />} />
      {/* <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} /> */}
   </Routes>
   </>
  );
}

export default App
