import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, deleteTask } from '../features/Task/taskSlice';
import { Link } from 'react-router-dom';

const TaskList = () => {
    const dispatch = useDispatch();
    const { tasks, status, error } = useSelector((state) => state.tasks);
    const userId = useSelector((state) => state.auth.user.id);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchTasks(userId));
        }
    }, [status, dispatch, userId]);

    const handleDelete = (taskId) => {
        dispatch(deleteTask({ userId, taskId }));
    };

    return (
        <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Task Dashboard</h1>
      {status === 'loading' && <p>Loading tasks...</p>}
      {error && <p>Error fetching tasks: {error}</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <div key={task.id} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{task.title}</h2>
            <p>{task.description}</p>
            <Link to={`/updatetask/${task.id}`} className="text-blue-500">Edit</Link>
            <button onClick={() => handleDelete(task.id)} className="text-red-500 ml-4">Delete</button>
          </div>
        ))}
      </div>
    </div>
    );
};

export default TaskList
