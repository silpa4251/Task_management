import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../features/Task/taskSlice';

const TaskForm = () => {
    const userId = useSelector((state) => state.auth.user.id);
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTask = {
            id: Date.now().toString(),
            title,
            description,
            status: 'To Do'
        };
        dispatch(addTask({ userId, newTask }));
        setTitle('');
        setDescription('');
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">Add a New Task</h2>
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
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
                    Add Task
                </button>
            </form>
        </div>
    );
};

export default TaskForm;
