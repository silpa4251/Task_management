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
        return response.data.tasks;
    }  catch (error) {
        return thunkAPI.rejectWithValue('Failed to fetch tasks');
    }
    
});

export const addTask = createAsyncThunk(
    'tasks/addTask',
    async ({userId,newTask}, thunkAPI) => {
        try {
            const response = await axios.patch(`${API_URL}/${userId}`,{ tasks: [newTask] }); 
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('Failed to add task');
        }
    }
);

export const updateTask = createAsyncThunk(
    'tasks/updateTask',
    async ({ id, updatedTask }, thunkAPI) => {
        try {
            const response = await axios.put(`${API_URL}/tasks/${id}`, updatedTask); 
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('Failed to update task');
        }
    }
);

export const deleteTask = createAsyncThunk(
    'tasks/deleteTask',
    async (id, thunkAPI) => {
        try {
            await axios.delete(`${API_URL}/tasks/${id}`); // Assuming the task ID is in the URL
            return id; // Return the deleted task ID
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
                state.tasks.push(action.payload);
            })
            .addCase(addTask.rejected, (state, action) => {
                state.error = action.payload;
            })
           
            .addCase(updateTask.fulfilled, (state, action) => {
                const index = state.tasks.findIndex(task => task.id === action.payload.id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.error = action.payload;
            })
            
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter(task => task.id !== action.payload);
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});


export default taskSlice.reducer;
