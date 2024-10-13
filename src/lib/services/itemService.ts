import api from "@/config/api";
import { IItem } from "@/interfaces/IItem";

export const fetchItens = async (): Promise<IItem[] | undefined> => {
    try {
        const response = await api.get('/api/item');
        return response.data; 
    } catch (error) {
        console.error("Erro ao buscar itens:", error);
        throw new Error('Erro ao buscar itens');
    }
}

export const getItemById = async (_id: string): Promise<IItem> => {
    try {
        const response = await api.get('/api/item/' + _id);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar item:", error);
        throw new Error('Erro ao buscar item por ID');
    }
}

export const deleteItem = async (itemId: string) => {
    try {
        const response = await api.delete('/api/item/' + itemId); 
        return response.data;
    } catch (error) {
        console.error("Erro ao remover item da lista:", error);
        throw new Error('Erro ao remover item da lista');
    }
}


export const addItemByList = async (data: {listId: string, itemId: string}) => {
    try {
        const response = await api.put('/api/list/add', data);
        return response.data
    } catch (error) {
        throw new Error('Erro ao adicionar o item na lista')
    }
}

export const deleteItemByList = async (data: { listId: string, itemId: string }): Promise<any> => {
    try {
        const response = await api.put('/api/list/remove', data); 
        return response.data;
    } catch (error) {
        console.error("Erro ao remover item da lista:", error);
        throw new Error('Erro ao remover item da lista');
    }
}

export const itemIsBought = async ({ itemId, listId }: { itemId: string, listId: string }): Promise<any> => {
    try {
        const response = await api.put(`/api/list/bought/${itemId}`, { listId });
        return response.data;
    } catch (error) {
        console.error("Erro ao marcar item como comprado:", error);
        throw new Error('Erro ao marcar item como comprado');
    }
}

export const addItem = async (data: any) => {
    try{
        const response = await api.post(`api/item`, data);

        return response.data
    } catch(error) {
        throw new Error('Erro ao criar um item')
    }
}

