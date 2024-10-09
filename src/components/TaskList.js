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
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Task Dashboard</h1>

            {/* Loading and error states */}
            {status === 'loading' && <p className="text-center text-blue-500">Loading tasks...</p>}
            {error && <p className="text-center text-red-500">Error fetching tasks: {error}</p>}

            {/* Task Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Title</th>
                            <th className="py-3 px-6 text-left">Description</th>
                            <th className="py-3 px-6 text-left">Status</th>
                            <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {tasks.length > 0 ? (
                            tasks.map((task) => (
                                <tr key={task.id} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left whitespace-nowrap">
                                        <div className="font-semibold">{task.title}</div>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        <p>{task.description}</p>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        <span
                                            className={`inline-block px-3 py-1 text-sm font-medium rounded ${task.status === 'To Do' ? 'bg-yellow-200 text-yellow-700' : 'bg-green-200 text-green-700'}`}
                                        >
                                            {task.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        <Link
                                            to={`/dashboard/updatetask/${task.id}`}
                                            className="text-blue-500 hover:underline mr-4"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(task.id)}
                                            className="text-red-500 hover:text-red-700 focus:outline-none"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="py-3 px-6 text-center text-gray-600">
                                    No tasks available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TaskList;
