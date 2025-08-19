"use client";

import { useEffect, useState } from "react";
import { photosService } from "@/services/photos.service";

export default function TestPhotosPage() {
    const [albumId] = useState<number>(1); // 🔹 Cambia al ID de un álbum existente
    const [photos, setPhotos] = useState<any[]>([]);
    const [file, setFile] = useState<File | null>(null);

    // Cargar fotos del álbum al inicio
    useEffect(() => {
        fetchPhotos();
    }, []);

    const fetchPhotos = async () => {
        try {
            const data = await photosService.getByAlbum(albumId);
            setPhotos(data.photos || []);
        } catch (err: any) {
            alert("Error al obtener fotos: " + err.message);
        }
    };

    const handleUpload = async () => {
        if (!file) return alert("Selecciona un archivo primero");
        try {
            await photosService.upload(albumId, file);
            setFile(null);
            fetchPhotos(); // recargar lista
        } catch (err: any) {
            alert("Error al subir foto: " + err.message);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await photosService.delete(id);
            fetchPhotos(); // recargar lista
        } catch (err: any) {
            alert("Error al eliminar foto: " + err.message);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Prueba de PhotosService</h1>

            {/* Subida de foto */}
            <div className="mb-4">
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                <button
                    onClick={handleUpload}
                    className="ml-2 px-4 py-1 bg-blue-500 text-white rounded"
                >
                    Subir
                </button>
            </div>

            {/* Listado de fotos */}
            <div className="grid grid-cols-3 gap-4">
                {photos.map((photo) => (
                    <div key={photo.id} className="border p-2">
                        <img
                            src={photo.src}
                            alt="foto"
                            className="w-full h-40 object-cover"
                        />
                        <button
                            onClick={() => handleDelete(photo.id)}
                            className="mt-2 px-2 py-1 bg-red-500 text-white rounded text-sm"
                        >
                            Eliminar
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
