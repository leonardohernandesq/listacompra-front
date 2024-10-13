import api from "@/config/api";

export const fetchCategories = async () => {
    try {
        const response = await api.get('api/category');

        return response.data;
    } catch (error) {
        console.error("Erro ao buscar categories:", error);
        throw new Error('Erro ao buscar categories');
    }
}

export const getCategoryById = async (_id: string) => {
    try{
        const response = await api.get('api/category/' + _id);

        return response.data;
    } catch (error) {
        console.error("Erro ao buscar a categoria:", error);
        throw new Error('Erro ao buscar a categoria');
    }
}

export const addCategory = async (name: string) => {
    try {
        const response = await api.post('api/category', name)

        return response.data
    } catch (error) {
        throw new Error('Erro ao buscar a categoria');        
    }
}

export const deleteCategory = async (_id: string) => {
    try {
        const response = await api.delete('api/category/'+_id)

        return response.data
    } catch (error) {
        throw new Error('Erro ao deletar a categoria');        
    }
}