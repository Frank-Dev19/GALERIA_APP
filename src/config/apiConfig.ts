// src/config/apiConfig.ts
export const API_CONFIG = {
    baseUrl: "http://localhost:4000", // Cambia por la URL de tu backend NestJS en producción

    auth: {
        login: "/auth/login",
        register: "/auth/register", // si luego decides permitir más usuarios
    },

    albums: {
        root: "/albums",
        byId: (id: string | number) => `/albums/${id}`,
    },

    photos: {
        root: "/photos",
        byId: (id: string | number) => `/photos/${id}`,
        byAlbum: (albumId: string | number) => `/albums/${albumId}`,
        upload: "/photos/upload",
    },
};
