import { API_CONFIG } from "@/config/apiConfig";
import { apiRequest } from "@/lib/api";

export const photosService = {
    getPhotosByAlbum(albumId: number) {
        return apiRequest(API_CONFIG.photos.byAlbum(albumId), {}, true);
    },

    uploadPhotos(albumId: number, file: File) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("albumId", albumId.toString());

        return apiRequest(API_CONFIG.photos.upload, {
            method: "POST",
            body: formData
        }, true);
    },

    deletePhotos(id: number) {
        return apiRequest(API_CONFIG.photos.byId(id), {
            method: "DELETE"
        }, true);
    },

    updatePhoto(photoId: number, data: Partial<{ alt: string; isPublic: boolean }>) {
        return apiRequest(API_CONFIG.photos.byId(photoId), {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        }, true);
    }
};
