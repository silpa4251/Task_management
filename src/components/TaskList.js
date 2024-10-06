import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, deleteTask } from '../features/Task/taskSlice';

const TaskList = () => {
    const dispatch = useDispatch();
    const { tasks, status, error } = useSelector((state) => state.tasks);
    const userId = useSelector((state) => state.auth.user.id);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchTasks(userId));
        }
    }, [status, dispatch, userId]);

    if (status === 'loading') {
        return <div className="text-center text-gray-500">Loading...</div>;
    }

    if (status === 'failed') {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">Your Tasks</h2>
            <ul className="space-y-4">
                {tasks && tasks.length > 0 ? (
                    tasks.map((task) => (
                        <li key={task.id} className="p-4 border border-gray-200 rounded-lg flex justify-between items-start">
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
                                <p className="text-gray-600">{task.description}</p>
                            </div>
                            <button 
                                onClick={() => dispatch(deleteTask(task.id))}
                                className="ml-4 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-200"
                            >
                                Delete
                            </button>
                        </li>
                    ))
                ) : (
                    <p className="text-gray-500 text-center">No tasks available</p>
                )}
            </ul>
        </div>
    );
};

export default TaskList;
