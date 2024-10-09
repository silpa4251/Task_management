import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchTasks, updateTask } from '../features/Task/taskSlice';

const UpdateTask = () => {
    const taskId = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = useSelector((state) => state.auth.user.id);
    const { tasks, status } = useSelector((state) => state.tasks);

    // Find the task that needs to be updated. Only do this if tasks is an array.
    const taskToEdit = Array.isArray(tasks) ? tasks.find(task => task.id === taskId.id) : null;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        console.log('TaskId:', taskId);
    console.log('Tasks:', tasks);
        if (!taskToEdit && status === 'idle') {
            // Fetch tasks if they are not loaded or taskToEdit is not found
            dispatch(fetchTasks(userId));
        } else if (taskToEdit) {
            // Prefill form fields if taskToEdit is available
            setTitle(taskToEdit.title);
            setDescription(taskToEdit.description);
        }
    }, [dispatch, taskId, taskToEdit, status,tasks, userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedTask = {
            id: taskId.id,
            title,
            description,
            status: taskToEdit?.status || 'To Do',  // Ensure status exists
        };
        const resultAction = await dispatch(updateTask({ userId, updatedTask }));
        if (updateTask.fulfilled.match(resultAction)) {
            navigate('/dashboard/tasklist');
        } else {
            console.error('Failed to update task');
        }
    };

    // Show loading message if taskToEdit is not found yet
    if (!taskToEdit && status === 'loading') {
        return <p>Loading task...</p>;
    }

    // Show error message if task is not found
    if (!taskToEdit) {
        return <p>Task not found</p>;
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">Update Task</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Task Title"
                    className="border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    required
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Task Description"
                    className="border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
                >
                    Update Task
                </button>
            </form>
        </div>
    );
};

export default UpdateTask;
