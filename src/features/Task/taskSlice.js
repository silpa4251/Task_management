import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../auth/authSlice';

const initialState = {
    tasks: [],
    status: 'idle', 
    error: null,
};


export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (userId, thunkAPI) => {
    try{
        const response = await axios.get(`${API_URL}/${userId}`);
        return response.data.tasks || [];
    }  catch (error) {
        return thunkAPI.rejectWithValue('Failed to fetch tasks');
    }
    
});
export const addTask = createAsyncThunk(
    'tasks/addTask',
    async ({ userId, newTask }, thunkAPI) => {
        try {
            const { tasks } = thunkAPI.getState().tasks;
            const updatedTasks = [...tasks, newTask];

            const response = await axios.patch(`${API_URL}/${userId}`, { tasks: updatedTasks });

            return response.data.tasks;  // Return the updated list of tasks
        } catch (error) {
            return thunkAPI.rejectWithValue('Failed to add task');
        }
    }
);


export const updateTask = createAsyncThunk(
    'tasks/updateTask',
    async ({ userId, updatedTask }, thunkAPI) => {
        try {
            const state = thunkAPI.getState().tasks;
            const updatedTasks = state.tasks.map(task =>
                task.id === updatedTask.id ? updatedTask : task
            );
            const response = await axios.patch(`${API_URL}/${userId}`, {tasks : updatedTasks}); 
            return response.data.tasks;
        } catch (error) {
            return thunkAPI.rejectWithValue('Failed to update task');
        }
    }
);

export const deleteTask = createAsyncThunk(
    'tasks/deleteTask',
    async ({ userId, taskId }, thunkAPI) => {
        try {
            const updatedTasks = thunkAPI.getState().tasks.tasks.filter(task => task.id !== taskId);

            const response = await axios.patch(`${API_URL}/${userId}`, { tasks: updatedTasks });
            return response.data.tasks;
        } catch (error) {
            return thunkAPI.rejectWithValue('Failed to delete task');
        }
    }
);



const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
           
            .addCase(addTask.fulfilled, (state, action) => {
                state.tasks = action.payload; 
            })
            .addCase(addTask.rejected, (state, action) => {
                state.error = action.payload;
            })
           
            .addCase(updateTask.fulfilled, (state, action) => {
                state.tasks = action.payload; 
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.error = action.payload;
            })
            
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = action.payload; 
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});


export default taskSlice.reducer;
