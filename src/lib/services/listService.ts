import api from "@/config/api";
import { IList } from "@/interfaces/IList";

export const fetchLists = async () => {
    try {
        const response = await api.get('/api/list');
        
        return response.data;
    } catch (error) {
        console.log("Erro ao buscar listas:", error);
    }
}

export const deleteList = async (_id: IList) => {
    try{
        const response = await api.delete(`/api/list/${_id}`);

        return response.data;
    } catch (error) {
        console.log(error)
    }
} 

export const addList = async (data: string) => {
    try {
        const response = await api.post('/api/list', data)
        
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getUniqueList = async (_id: string) => {
    try{
        const response = await api.get('/api/list/' + _id)

        return response.data
    } catch (error) {
        console.log(error);
    }
}
