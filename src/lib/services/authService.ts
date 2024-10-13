import api from "@/config/api";

interface IAuthService{
    email: string,
    password: string,
}

export const login = async (authData: IAuthService) => {
    try {
        const response = await api.post('/api/users/login', authData);
        
        return response.data;
    } catch (error) {
        console.log("Erro ao fazer login:", error);
    }
}