'use client'

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addCategory, deleteCategory, fetchCategories, getCategoryById } from "../services/categoryService";

interface CategoryState {
    category:ICategoryData,
    categories: Array<ICategoryData>,
    loading: boolean,
    error: string | null,
}

interface ICategoryData {
    _id: string,
    name: string
}

const initialState: CategoryState = {
    category: {
        _id: '',
        name: '',
    },
    categories: [],
    loading: false,
    error: null
};

export const fetchCategoriesThunk = createAsyncThunk('category/fetch', async () => {
    const categories = await fetchCategories();
    return categories;
})

export const getCategoryByIdThunk = createAsyncThunk('category/getCategory', async (_id: string) => {
    const category = await getCategoryById(_id);
    return category;
})

export const addCategoryThunk = createAsyncThunk('category/create', async (name: any) => {
    const category = await addCategory(name);
    return category
}) 

export const deleteCategoryThunk = createAsyncThunk('category/delete', async (_id: string) => {
    await deleteCategory(_id);

    return { id: _id }; // Ou response.data se o backend retornar o ID deletado
}) 

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategoriesThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchCategoriesThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = action.payload || [];
        });
        builder.addCase(fetchCategoriesThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Erro ao carregar a categoria';
        })
        builder.addCase(getCategoryByIdThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getCategoryByIdThunk.fulfilled, (state, action) => {
            state.loading = false;

            if(action.payload) {
                state.categories = [...state.categories, action.payload];
            }
        });
        builder.addCase(getCategoryByIdThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Erro ao carregar a categoria';
        })
        builder.addCase(addCategoryThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addCategoryThunk.fulfilled, (state, action) => {
            state.loading = false;
            console.log(action.payload)
            if(action.payload) {
                state.category = action.payload;
                state.categories = [...state.categories, action.payload];
            }
        });
        builder.addCase(addCategoryThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Erro ao criar uma categoria';
        })
        builder.addCase(deleteCategoryThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteCategoryThunk.fulfilled, (state, action) => {
            state.loading = false;

            state.categories = state.categories.filter((item) => {
                return item._id !== action.payload.id
            });
        });
        builder.addCase(deleteCategoryThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Erro ao deletar uma categoria';
        })
    }
})

export default categorySlice.reducer;