import { API_CONFIG } from "@/config/apiConfig";
import { apiRequest } from "@/lib/api";

export const albumsService = {
    getAll() {
        return apiRequest(API_CONFIG.albums.root, {}, true);
    },

    getById(id: number) {
        return apiRequest(API_CONFIG.albums.byId(id), {}, true);
    },

    create(data: { title: string; description?: string }) {
        return apiRequest(API_CONFIG.albums.root, {
            method: "POST",
            body: JSON.stringify(data),
        }, true);
    },

    delete(id: number) {
        return apiRequest(API_CONFIG.albums.byId(id), {
            method: "DELETE",
        }, true);
    }
};
