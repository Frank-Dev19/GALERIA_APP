import { API_CONFIG } from "@/config/apiConfig";
import { apiRequest } from "@/lib/api";

export const photosService = {
    getByAlbum(albumId: number) {
        return apiRequest(API_CONFIG.photos.byAlbum(albumId), {}, true);
    },

    upload(albumId: number, file: File) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("albumId", albumId.toString());

        return apiRequest(API_CONFIG.photos.upload, {
            method: "POST",
            body: formData
        }, true);
    },

    delete(id: number) {
        return apiRequest(API_CONFIG.photos.byId(id), {
            method: "DELETE"
        }, true);
    }
};
