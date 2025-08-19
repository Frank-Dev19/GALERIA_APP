import { API_CONFIG } from "@/config/apiConfig";
import { apiRequest } from "@/lib/api";

export const authService = {
    login(email: string, password: string) {
        return apiRequest(API_CONFIG.auth.login, {
            method: "POST",
            body: JSON.stringify({ email, password }),
        });
    },

    register(email: string, password: string) {
        return apiRequest(API_CONFIG.auth.register, {
            method: "POST",
            body: JSON.stringify({ email, password }),
        });
    }
};
