
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
// import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import UpdateTask from './components/UpdateTask';

function App() {
  return (
   <>
   <Navbar />
   <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/dashboard' element={<Dashboard />} /> 
      
        <Route path='listtask' element={<TaskList />} />
        <Route path="addtask" element={<TaskForm />} />
      
      <Route path="/updatetask/:id" element={<UpdateTask />} />
      {/* <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} /> */}
   </Routes>
   </>
  );
}

export default App
