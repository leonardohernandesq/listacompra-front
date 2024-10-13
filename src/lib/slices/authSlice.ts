'use client'

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { login } from '../services/authService';
import Cookies from 'js-cookie'

interface AuthState {
    user: {
        token: string,
        user: {
            id: string,
            name: string,
            email: string,
        }
    } | null,
    loading: boolean,
    error: string | null
}

interface IAuthData{
    email: string,
    password: string
}

const initialState:AuthState = {
    user: null,
    loading: false,
    error: null
}

export const loginUserThunk = createAsyncThunk('auth/login', async (authData: IAuthData) => {
    const user = await login(authData);

    return user
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null; 
            Cookies.remove('auth_token');
        },
    },
    extraReducers:(builder) => {
        builder.addCase(loginUserThunk.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(loginUserThunk.fulfilled, (state, action) => {
            state.user = action.payload;
            
            if (state.user?.token) {
                Cookies.set('auth_token', state.user?.token, {
                    expires: 7,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    path: '/',
                });
            }

            state.loading = false;
        })
        builder.addCase(loginUserThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Erro ao carregar o usuário';
        })
    }
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;