// src/lib/api.ts
import { API_CONFIG } from "@/config/apiConfig";

const API_URL = process.env.NEXT_PUBLIC_API_URL || API_CONFIG.baseUrl;

type ApiEndpoint =
    | string
    | ReturnType<typeof API_CONFIG.albums.byId>
    | ReturnType<typeof API_CONFIG.photos.byId>
    | ReturnType<typeof API_CONFIG.photos.byAlbum>
    | typeof API_CONFIG.auth.login
    | typeof API_CONFIG.auth.register
    | typeof API_CONFIG.albums.root
    | typeof API_CONFIG.photos.root;

export async function apiRequest(
    endpoint: ApiEndpoint,
    options: RequestInit = {},
    auth: boolean = false
) {
    const headers: Record<string, string> = {
        ...(options.headers as Record<string, string> || {}),
    };

    // Solo forzamos JSON si NO se está enviando FormData osea las fotos 
    if (!(options.body instanceof FormData)) {
        headers["Content-Type"] = "application/json";
    }

    // Token para rutas protegidas pe mi lord
    if (auth) {
        const token = localStorage.getItem("token");
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }
    }

    const res = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    // Manejo de errores más claro
    if (!res.ok) {
        let errorMessage = `Error en la petición: ${res.status} ${res.statusText}`;
        try {
            const errorData = await res.json();
            if (errorData?.message) {
                errorMessage = errorData.message;
            }
        } catch {
            // Ignorar si no hay JSON de error
        }
        throw new Error(errorMessage);
    }

    // Si hay respuesta vacía, no intentamos parsear JSON
    const text = await res.text();
    return text ? JSON.parse(text) : null;
}
