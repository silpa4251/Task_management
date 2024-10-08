import axios from "axios";
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";


export const API_URL = 'http://localhost:5000/users';
const initialState ={
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAuthenticated: !!localStorage.getItem('user'),
    isLoading: false,
    error: null,
};

export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData, thunkAPI) => {
      try {
        const existingUser = await axios.get(`${API_URL}?email=${userData.email}`);
        if (existingUser.data.length > 0) {
          return thunkAPI.rejectWithValue('User with this email already exists');
        }
        const response = await axios.post(API_URL, userData);
        return response.data;
  
      } catch (error) {
        const message = error.response && error.response.data 
          ? error.response.data 
          : 'Failed to register. Please try again.';
        
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
  

export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials, thunkAPI) => {
        try {
            const response = await axios.get(API_URL);
            const user =  response.data.find((user) => user.email === credentials.email && user.password === credentials.password);
            if (!user) {
                return thunkAPI.rejectWithValue('Incorrect email or password');
            }
            return user;
            

        } catch (error) {
            return thunkAPI.rejectWithValue('Failed to login');
        }
    }
);

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers: {
        logout : (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem('user');
        },
        // setUser: (state, action) => {
        //     state.user = action.payload;
        //     localStorage.setItem('user', JSON.stringify(action.payload)); 
        // },
        resetError: (state) => {
            state.error = null;
        }
    },
    extraReducers:  (builder) => {
        builder.addCase(registerUser.pending,(state) => {
            state.isLoading = true;
        });
        builder.addCase(registerUser.fulfilled,(state,action) => {
            state.isLoading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem('user', JSON.stringify(action.payload));
        });
        builder.addCase(registerUser.rejected,(state,action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
        builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem('user', JSON.stringify(action.payload));
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    }
})

export const {logout,  resetError} = authSlice.actions;
export default authSlice.reducer;