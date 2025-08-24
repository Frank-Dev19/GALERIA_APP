import { API_CONFIG } from "@/config/apiConfig";
import { apiRequest } from "@/lib/api";

export const albumsService = {
    getAlbums() {
        return apiRequest(API_CONFIG.albums.root, {}, true);
    },

    getAlbumsById(id: number) {
        return apiRequest(API_CONFIG.albums.byId(id), {}, true);
    },

    createAlbum(data: { title: string; description?: string }) {
        return apiRequest(API_CONFIG.albums.root, {
            method: "POST",
            body: JSON.stringify(data),
        }, true);
    },

    deleteAlbum(id: number) {
        return apiRequest(API_CONFIG.albums.byId(id), {
            method: "DELETE",
        }, true);
    },

    updateAlbum(albumId: number, data: Partial<{ isPublic: boolean }>) {
        return apiRequest(API_CONFIG.albums.byId(albumId), {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        }, true);
    }
};
