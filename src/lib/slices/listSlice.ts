'use client'

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { fetchLists, deleteList, addList, getUniqueList } from '../services/listService';
import { IList } from '@/interfaces/IList';

interface ListState {
    list:IList | any,
    lists: IList[],
    loading: boolean,
    error: string | null
}

const initialState:ListState = {
    list:{
        _id: '',
        name: '',
        items: []
    },
    lists: [],
    loading: false,
    error: null
}

export const fetchListsThunk = createAsyncThunk('lists/fetchLists', async () => {
    const lists = await fetchLists();

    return lists
})
 
export const deleteListThunk = createAsyncThunk('lists/deleteList', async (_id: any) => {
    const deleteAList = await deleteList(_id);

    return deleteAList
})

export const addListThunk = createAsyncThunk('lists/addList', async (data: any) => {
    const addAList = await addList(data);

    return addAList
})

export const getUniqueListThunk = createAsyncThunk('lists/getList', async (_id: string) => {
    
    const getAList = await getUniqueList(_id) 

    return getAList
})

const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder.addCase(fetchListsThunk.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchListsThunk.fulfilled, (state, action) => {
            state.lists = action.payload;
            state.loading = false;
        })
        builder.addCase(fetchListsThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Erro ao carregar o usuário';
        })
        builder.addCase(deleteListThunk.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(deleteListThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.lists = state.lists.filter((item) => {
                return item._id !== action.payload.id
            });
        })
        builder.addCase(deleteListThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Erro ao deletar o usuário';
        })
        builder.addCase(addListThunk.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(addListThunk.fulfilled, (state, action) => {
            state.lists = [...state.lists, action.payload];
            state.loading = false;
        })
        builder.addCase(addListThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Erro ao criar a lista';
        })
        builder.addCase(getUniqueListThunk.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getUniqueListThunk.fulfilled, (state, action) => {
            state.list = action.payload;
            state.loading = false;
        })
        builder.addCase(getUniqueListThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Erro ao carregar a lista';
        })
    }
})

export default listSlice.reducer;