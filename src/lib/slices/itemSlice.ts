import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchItens, getItemById, itemIsBought, deleteItemByList, addItem, deleteItem, addItemByList } from '../services/itemService';
import { IItem } from '@/interfaces/IItem';

interface ItemState {
    item: IItem;
    itens: IItem[];
    loading: boolean;
    error: string | null;
}

const initialState: ItemState = {
    item: {
        _id: '',
        name: '',
        quantity: 0,
        bought: false,
        categoryId: '',
        listId: ''
    },
    itens: [],
    loading: false,
    error: null,
};

// Reseta o erro quando necessário
const resetError = (state: ItemState) => {
    state.error = null;
};

// Thunk para buscar todos os itens
export const fetchItensThunk = createAsyncThunk('item/fetchItens', async () => {
    const itens = await fetchItens();
    return itens;
});

// Thunk para buscar item por ID
export const getItemByIdThunk = createAsyncThunk('item/getItem', async (_id: string) => {
    const item = await getItemById(_id);
    return item;
});

// Thunk para marcar item como comprado
export const isBoughtItemThunk = createAsyncThunk(
    'item/bought', 
    async ({ itemId, listId }: { itemId: string; listId: string }) => {
        const updatedList = await itemIsBought({ itemId, listId });
        return updatedList;  // Retorna a lista inteira com os itens atualizados
    }
);

export const addItemThunk = createAsyncThunk(
    'item/add',
    async (data: any) => {
        const response = await addItem(data);
        return response;
    }
)

// Thunk para deletar um item
export const deleteItemThunk = createAsyncThunk(
    'item/deleteitem', 
    async (itemId: string) => {
        const response = await deleteItem(itemId);
        return { itemId: itemId, list: response };

    }
);

// Thunk para deletar um item
export const deleteItemThunkByList = createAsyncThunk(
    'item/deleteitembylist', 
    async (data: { listId: string; itemId: string }) => {
        const response = await deleteItemByList(data);
        return { itemId: data.itemId, list: response };
    }
);

export const addItemThunkByList = createAsyncThunk(
    'item/additembylist',
    async (data: {listId: string; itemId: string}) => {
        const response = await addItemByList(data);
        return {itemId: data.itemId, list: response}
    }
)


// Slice do item com os reducers e extraReducers
const itemSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Buscando itens
        builder.addCase(fetchItensThunk.pending, (state) => {
            state.loading = true;
            resetError(state);
        });
        builder.addCase(fetchItensThunk.fulfilled, (state, action) => {
            state.itens = action.payload || [];
            state.loading = false;
        });
        builder.addCase(fetchItensThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Erro ao carregar itens';
        });

        // Buscando item por ID
        builder.addCase(getItemByIdThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getItemByIdThunk.fulfilled, (state, action) => {
            if (action.payload) {
                // Verifica se o item já existe e o atualiza, senão adiciona ao array
                const index = state.itens.findIndex(item => item._id === action.payload._id);
                if (index !== -1) {
                    state.itens[index] = action.payload;
                } else {
                    state.itens = [...state.itens, action.payload];
                }
            }
            state.loading = false;
        });
        builder.addCase(getItemByIdThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Erro ao carregar item';
        });

        // Atualizando status de compra do item
        builder.addCase(isBoughtItemThunk.pending, (state) => {
            state.loading = true;
            resetError(state);
        });
        builder.addCase(isBoughtItemThunk.fulfilled, (state, action) => {
            const updatedList = action.payload;

            // Atualiza os itens da lista que foram modificados no estado global
            updatedList.items.forEach((updatedItem: IItem) => {
                const itemIndex = state.itens.findIndex(item => item._id === updatedItem._id);
                if (itemIndex !== -1) {
                    state.itens[itemIndex] = { ...state.itens[itemIndex], ...updatedItem };
                }
            });
            state.loading = false;
        });
        builder.addCase(isBoughtItemThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Erro ao marcar item como comprado';
        });

        // Deletando item de uma lista
        builder.addCase(deleteItemThunkByList.pending, (state) => {
            state.loading = true;
            resetError(state);
        });
        builder.addCase(deleteItemThunkByList.fulfilled, (state, action) => {
            // Remove o item deletado do array
            state.itens = state.itens.filter(item => item._id !== action.payload.itemId);
            state.loading = false;
        });
        builder.addCase(deleteItemThunkByList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Erro ao deletar item';
        });
        // adicionando item em uma lista
        builder.addCase(addItemThunkByList.pending, (state) => {
            state.loading = true;
            resetError(state);
        });
        builder.addCase(addItemThunkByList.fulfilled, (state, action) => {


            state.loading = false;
        });
        builder.addCase(addItemThunkByList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Erro ao adicionar item na lista';
        });
        // Deletando item
        builder.addCase(deleteItemThunk.pending, (state) => {
            state.loading = true;
            resetError(state);
        });
        builder.addCase(deleteItemThunk.fulfilled, (state, action) => {
            // Remove o item deletado do array
            state.itens = state.itens.filter(item => item._id !== action.payload.itemId);
            console.log(action.payload)
            state.loading = false;
        });
        builder.addCase(deleteItemThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Erro ao deletar item';
        });
        // Deletando item
        builder.addCase(addItemThunk.pending, (state) => {
            state.loading = true;
            resetError(state);
        });
        builder.addCase(addItemThunk.fulfilled, (state, action) => {
            // Remove o item deletado do array
            state.item = action.payload;
            state.itens = [...state.itens, action.payload];
            state.loading = false;
        });
        builder.addCase(addItemThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Erro ao deletar item';
        });
    },
});

export default itemSlice.reducer;
