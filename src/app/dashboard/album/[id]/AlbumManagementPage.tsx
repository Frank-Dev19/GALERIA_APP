"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { albumsService } from "@/services/albums.service"

import {
    ArrowLeft,
    Upload,
    Trash2,
    Eye,
    EyeOff,
    Grid3X3,
    List,
    Search,
    Download,
    X,
    Check,
} from "lucide-react"
import { photosService } from "@/services/photos.service"

type Photo = {
    id: number
    src: string
    alt: string
    uploadDate: string
    likes: number
    isPublic: boolean
}

export default function AlbumManagementPage({ albumId }: { albumId: number }) {
    //const albumId = Number(params.id)

    const [photos, setPhotos] = useState<Photo[]>([])
    const [selectedPhotos, setSelectedPhotos] = useState<number[]>([])
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [showUploadModal, setShowUploadModal] = useState(false)
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
    const [loadingPhotoId, setLoadingPhotoId] = useState<number | null>(null) // opcional: para loading per photo
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedFiles, setSelectedFiles] = useState<File[]>([])
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Si más adelante tienes un servicio de álbumes, puedes reemplazar este título.
    const [albumTitle, setAlbumTitle] = useState<string>("Cargando álbum...")

    const loadAlbum = async () => {
        try {
            const res = await albumsService.getAlbumsById(albumId)
            const albumData = res?.data ?? res
            setAlbumTitle(albumData.title || albumData.name || `Álbum #${albumId}`)
        } catch (error) {
            console.error("Error cargando álbum:", error)
            setAlbumTitle("Álbum no encontrado")
        }
    }

    // --- Helpers de mapeo para tolerar distintos nombres de campos que pueda devolver tu API ---
    const mapApiPhoto = (p: any): Photo => ({
        id: Number(p.id),
        src:
            p.src ||
            p.url ||
            p.path ||
            p.imageUrl ||
            p.fileUrl ||
            "/placeholder.svg",
        alt: p.alt || p.title || p.name || `Foto ${p.id}`,
        uploadDate: p.uploadDate || p.createdAt || p.created_at || new Date().toISOString(),
        likes: typeof p.likes === "number" ? p.likes : 0,
        isPublic: typeof p.isPublic === "boolean" ? p.isPublic : (typeof p.public === "boolean" ? p.public : true),
    })

    const loadPhotos = async () => {
        try {
            const res = await photosService.getPhotosByAlbum(albumId)
            const data = (res?.data ?? res) as any[]
            const mapped = Array.isArray(data) ? data.map(mapApiPhoto) : []
            setPhotos(mapped)
            console.log("de aca")
            console.log(res)
            console.log("sa")
            console.log(data)
            console.log(mapped)
        } catch (e) {
            console.error("Error cargando fotos:", e)
            setPhotos([])
        }
    }

    useEffect(() => {
        loadPhotos()
        // eslint-disable-next-line react-hooks/exhaustive-deps
        loadAlbum()
    }, [albumId])

    const togglePhotoSelection = (photoId: number) => {
        setSelectedPhotos((prev) =>
            prev.includes(photoId) ? prev.filter((id) => id !== photoId) : [...prev, photoId],
        )
    }

    // Sin endpoint de update para privacidad en photosService; se hace sólo en UI.
    // const togglePhotoPrivacy = (photoId: number) => {
    //     setPhotos((curr) =>
    //         curr.map((photo) => (photo.id === photoId ? { ...photo, isPublic: !photo.isPublic } : photo)),
    //     )
    //     if (selectedPhoto?.id === photoId) {
    //         setSelectedPhoto({ ...selectedPhoto, isPublic: !selectedPhoto.isPublic })
    //     }
    // }


    const togglePhotoPrivacy = async (photoId: number, currentIsPublic: boolean) => {
        try {
            setLoadingPhotoId(photoId)

            // Llamada al backend con PATCH
            const updated = await photosService.updatePhoto(photoId, {
                isPublic: !currentIsPublic,
            })

            // Actualizar el estado con la respuesta del backend
            setPhotos((curr) =>
                curr.map((photo) => (photo.id === photoId ? { ...photo, ...updated } : photo))
            )

            if (selectedPhoto?.id === photoId) {
                setSelectedPhoto({ ...selectedPhoto, ...updated })
            }
        } catch (error) {
            console.error("Error al actualizar privacidad:", error)
        } finally {
            setLoadingPhotoId(null)
        }
    }


    const deleteSelectedPhotos = async () => {
        if (selectedPhotos.length === 0) return
        if (!confirm(`¿Estás segura de que quieres eliminar ${selectedPhotos.length} foto(s)?`)) return
        try {
            const ids = [...selectedPhotos]
            await Promise.allSettled(ids.map((id) => photosService.deletePhotos(id)))
            setPhotos((curr) => curr.filter((p) => !ids.includes(p.id)))
            setSelectedPhotos([])
        } catch (e) {
            console.error("Error eliminando fotos:", e)
        }
    }

    const deletePhoto = async (photoId: number) => {
        if (!confirm("¿Estás segura de que quieres eliminar esta foto?")) return
        try {
            await photosService.deletePhotos(photoId)
            setPhotos((curr) => curr.filter((p) => p.id !== photoId))
            if (selectedPhoto?.id === photoId) setSelectedPhoto(null)
        } catch (e) {
            console.error("Error eliminando foto:", e)
        }
    }

    const handleFilesPick = (files: FileList | null) => {
        if (!files) return
        setSelectedFiles(Array.from(files))
    }

    const handleUpload = async () => {
        if (selectedFiles.length === 0) return
        setIsUploading(true)
        try {
            await Promise.all(selectedFiles.map((f) => photosService.uploadPhotos(albumId, f)))
            await loadPhotos()
            setShowUploadModal(false)
            setSelectedFiles([])
            if (fileInputRef.current) fileInputRef.current.value = ""
        } catch (e) {
            console.error("Error subiendo fotos:", e)
        } finally {
            setIsUploading(false)
        }
    }

    const filteredPhotos = photos.filter((photo) =>
        (photo.alt || "").toLowerCase().includes(searchTerm.toLowerCase()),
    )

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-pink-50">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-sm border-b border-rose-100 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/dashboard"
                                className="flex items-center space-x-2 text-gray-600 hover:text-rose-500 transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                <span>Volver al panel</span>
                            </Link>
                            <div className="h-6 w-px bg-gray-300"></div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
                                {albumTitle}
                            </h1>
                        </div>
                        <div className="flex items-center space-x-3">
                            <span className="text-sm text-gray-500">{photos.length} fotos</span>
                            {selectedPhotos.length > 0 && (
                                <span className="text-sm bg-rose-100 text-rose-600 px-3 py-1 rounded-full">
                                    {selectedPhotos.length} seleccionadas
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 py-6">
                {/* Controls */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-rose-100 shadow-lg mb-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Buscar fotos..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent"
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-rose-100 text-rose-600" : "text-gray-400 hover:text-gray-600"
                                        }`}
                                >
                                    <Grid3X3 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? "bg-rose-100 text-rose-600" : "text-gray-400 hover:text-gray-600"
                                        }`}
                                >
                                    <List className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            {selectedPhotos.length > 0 && (
                                <button
                                    onClick={deleteSelectedPhotos}
                                    className="flex items-center space-x-2 bg-red-100 text-red-600 px-4 py-2 rounded-xl hover:bg-red-200 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    <span>Eliminar ({selectedPhotos.length})</span>
                                </button>
                            )}
                            <button
                                onClick={() => setShowUploadModal(true)}
                                className="flex items-center space-x-2 bg-gradient-to-r from-rose-400 to-pink-500 text-white px-4 py-2 rounded-xl hover:from-rose-500 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                                <Upload className="w-4 h-4" />
                                <span>Subir Fotos</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Photos Grid/List */}
                {viewMode === "grid" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {filteredPhotos.map((photo) => (
                            <div
                                key={photo.id}
                                className="group relative aspect-square bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <img src={photo.src || "/placeholder.svg"} alt={photo.alt} className="w-full h-full object-cover" />

                                {/* Selection Checkbox */}
                                <div className="absolute top-3 left-3">
                                    <button
                                        onClick={() => togglePhotoSelection(photo.id)}
                                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${selectedPhotos.includes(photo.id)
                                            ? "bg-rose-500 border-rose-500 text-white"
                                            : "bg-white/80 border-white/80 hover:bg-white"
                                            }`}
                                    >
                                        {selectedPhotos.includes(photo.id) && <Check className="w-3 h-3" />}
                                    </button>
                                </div>

                                {/* Privacy Indicator */}
                                <div className="absolute top-3 right-3">
                                    <div
                                        className={`p-1.5 rounded-full ${photo.isPublic ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                                            }`}
                                    >
                                        {photo.isPublic ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                                    </div>
                                </div>

                                {/* Overlay Controls */}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => setSelectedPhoto(photo)}
                                            className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                                        >
                                            <Eye className="w-4 h-4 text-white" />
                                        </button>
                                        <button
                                            onClick={() => togglePhotoPrivacy(photo.id, photo.isPublic)}
                                            disabled={loadingPhotoId === photo.id} // 🔹 opcional: bloquear mientras actualiza
                                            className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                                        >
                                            {photo.isPublic ? <EyeOff className="w-4 h-4 text-white" /> : <Eye className="w-4 h-4 text-white" />}
                                        </button>
                                        <button
                                            onClick={() => deletePhoto(photo.id)}
                                            className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4 text-white" />
                                        </button>
                                    </div>
                                </div>

                                {/* Photo Info */}
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                                    <div className="flex items-center justify-between text-white text-sm">
                                        <span>{photo.likes} ❤️</span>
                                        <span>{new Date(photo.uploadDate).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    // Este es el GRID
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-rose-100 shadow-lg overflow-hidden">
                        {filteredPhotos.map((photo) => (
                            <div
                                key={photo.id}
                                className="flex items-center p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50 transition-colors"
                            >
                                <div className="flex items-center space-x-4 flex-1">
                                    <button
                                        onClick={() => togglePhotoSelection(photo.id)}
                                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${selectedPhotos.includes(photo.id)
                                            ? "bg-rose-500 border-rose-500 text-white"
                                            : "border-gray-300 hover:border-rose-300"
                                            }`}
                                    >
                                        {selectedPhotos.includes(photo.id) && <Check className="w-3 h-3" />}
                                    </button>

                                    <img src={photo.src || "/placeholder.svg"} alt={photo.alt} className="w-12 h-12 object-cover rounded-lg" />

                                    <div className="flex-1">
                                        <p className="font-medium text-gray-800">{photo.alt}</p>
                                        <p className="text-sm text-gray-500">
                                            Subida el {new Date(photo.uploadDate).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                                        <span>{photo.likes} ❤️</span>
                                        <div className={`flex items-center space-x-1 ${photo.isPublic ? "text-green-600" : "text-red-600"}`}>
                                            {photo.isPublic ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                            <span>{photo.isPublic ? "Pública" : "Privada"}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => setSelectedPhoto(photo)}
                                            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => togglePhotoPrivacy(photo.id, photo.isPublic)}
                                            disabled={loadingPhotoId === photo.id} // 🔹 opcional: bloquear mientras actualiza
                                            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            {photo.isPublic ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                        <button onClick={() => deletePhoto(photo.id)} className="p-2 text-red-400 hover:text-red-600 transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Upload Modal */}
            {showUploadModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-gradient-to-r from-purple-200 to-lavender-300 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Upload className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">Subir Fotos</h3>
                            <p className="text-gray-600">Añade nuevas fotos a "{albumTitle}"</p>
                        </div>

                        <div
                            className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-rose-300 transition-colors cursor-pointer"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600 mb-2">Arrastra tus fotos aquí o</p>
                            <button type="button" className="text-rose-500 font-medium hover:text-rose-600">
                                selecciona archivos
                            </button>
                            <p className="text-sm text-gray-400 mt-2">PNG, JPG, GIF hasta 10MB cada una</p>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                multiple
                                className="hidden"
                                onChange={(e) => handleFilesPick(e.target.files)}
                            />
                            {selectedFiles.length > 0 && (
                                <div className="mt-4 text-sm text-gray-600">{selectedFiles.length} archivo(s) seleccionado(s)</div>
                            )}
                        </div>

                        <div className="flex space-x-3 mt-8">
                            <button
                                onClick={() => {
                                    setShowUploadModal(false)
                                    setSelectedFiles([])
                                    if (fileInputRef.current) fileInputRef.current.value = ""
                                }}
                                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                                disabled={isUploading}
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleUpload}
                                className="flex-1 bg-gradient-to-r from-purple-400 to-lavender-500 text-white py-3 rounded-xl font-medium hover:from-purple-500 hover:to-lavender-600 transition-all"
                                disabled={isUploading || selectedFiles.length === 0}
                            >
                                {isUploading ? "Subiendo..." : "Subir Fotos"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Photo Preview Modal */}
            {selectedPhoto && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="relative max-w-4xl max-h-full">
                        <button
                            onClick={() => setSelectedPhoto(null)}
                            className="absolute -top-12 right-0 p-2 text-white hover:text-rose-300 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <img
                            src={selectedPhoto.src || "/placeholder.svg"}
                            alt={selectedPhoto.alt}
                            className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
                        />

                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-2xl">
                            <div className="flex items-center justify-between text-white">
                                <div>
                                    <p className="text-lg font-medium">{selectedPhoto.alt}</p>
                                    <p className="text-sm text-white/80">
                                        Subida el {new Date(selectedPhoto.uploadDate).toLocaleDateString()} • {selectedPhoto.likes} me gusta
                                    </p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <button
                                        onClick={() => togglePhotoPrivacy(selectedPhoto.id, selectedPhoto.isPublic)}
                                        disabled={loadingPhotoId === selectedPhoto.id} // 🔹 opcional: bloquear mientras actualiza
                                        className={`p-2 rounded-lg transition-colors ${selectedPhoto.isPublic ? "bg-green-100/20 text-green-300" : "bg-red-100/20 text-red-300"
                                            }`}
                                    >
                                        {selectedPhoto.isPublic ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                                    </button>
                                    <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                                        <Download className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => deletePhoto(selectedPhoto.id)}
                                        className="p-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
