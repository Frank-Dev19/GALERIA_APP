"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Heart, Download, Share2, X } from "lucide-react"

// Mock data for photos
const albumPhotos = {
    personales: [
        { id: 1, src: "/images/lentes.jpg?height=400&width=300", alt: "Retrato natural" },
        { id: 2, src: "/placeholder.svg?height=400&width=300", alt: "Momento de lectura" },
        { id: 3, src: "/placeholder.svg?height=400&width=300", alt: "Con flores de primavera" },
        { id: 4, src: "/placeholder.svg?height=400&width=300", alt: "Atardecer dorado" },
        { id: 5, src: "/placeholder.svg?height=400&width=300", alt: "Café matutino" },
        { id: 6, src: "/placeholder.svg?height=400&width=300", alt: "Reflejo artístico" },
    ],
    pareja: [
        { id: 7, src: "/placeholder.svg?height=400&width=300", alt: "Atardecer en la playa" },
        { id: 8, src: "/placeholder.svg?height=400&width=300", alt: "Risas compartidas" },
        { id: 9, src: "/placeholder.svg?height=400&width=300", alt: "Cocinando juntos" },
    ],
    mascotas: [
        { id: 10, src: "/placeholder.svg?height=400&width=300", alt: "Jugando en el parque" },
        { id: 11, src: "/placeholder.svg?height=400&width=300", alt: "Siesta al sol" },
        { id: 12, src: "/placeholder.svg?height=400&width=300", alt: "Momento adorable" },
    ],
}

const albumTitles = {
    personales: "Momentos Personales",
    pareja: "Con Mi Amor",
    mascotas: "Mis Pequeños",
    viajes: "Aventuras",
    felices: "Momentos de Alegría",
    creativos: "Arte & Creatividad",
}

export default function AlbumPage({ params }: { params: { id: string } }) {
    const [selectedPhoto, setSelectedPhoto] = useState<any>(null)
    const [hoveredPhoto, setHoveredPhoto] = useState<number | null>(null)

    const photos = albumPhotos[params.id as keyof typeof albumPhotos] || albumPhotos.personales
    const albumTitle = albumTitles[params.id as keyof typeof albumTitles] || "Álbum"

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-pink-50">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-sm border-b border-rose-100 sticky top-0 z-40">
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/"
                                className="flex items-center space-x-2 text-gray-600 hover:text-rose-500 transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                <span>Volver</span>
                            </Link>
                            <div className="h-6 w-px bg-gray-300"></div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
                                {albumTitle}
                            </h1>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500">{photos.length} fotos</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Photo Grid */}
            <main className="max-w-6xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {photos.map((photo) => (
                        <div
                            key={photo.id}
                            className="group relative aspect-square cursor-pointer"
                            onMouseEnter={() => setHoveredPhoto(photo.id)}
                            onMouseLeave={() => setHoveredPhoto(null)}
                            onClick={() => setSelectedPhoto(photo)}
                        >
                            <div
                                className={`
                relative w-full h-full rounded-2xl overflow-hidden shadow-lg
                transform transition-all duration-500 ease-out
                ${hoveredPhoto === photo.id ? "scale-105 shadow-2xl -translate-y-1" : ""}
              `}
                            >
                                <img
                                    src={photo.src || "/placeholder.svg"}
                                    alt={photo.alt}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                                {/* Overlay */}
                                <div
                                    className={`
                  absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300
                  flex items-end justify-between p-4
                `}
                                >
                                    <div className="flex space-x-2">
                                        <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                                            <Heart className="w-4 h-4 text-white" />
                                        </button>
                                        <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                                            <Share2 className="w-4 h-4 text-white" />
                                        </button>
                                    </div>
                                    <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                                        <Download className="w-4 h-4 text-white" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Lightbox */}
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
                            <p className="text-white text-lg font-medium">{selectedPhoto.alt}</p>
                            <div className="flex items-center space-x-4 mt-3">
                                <button className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors">
                                    <Heart className="w-5 h-5" />
                                    <span>Me gusta</span>
                                </button>
                                <button className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors">
                                    <Share2 className="w-5 h-5" />
                                    <span>Compartir</span>
                                </button>
                                <button className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors">
                                    <Download className="w-5 h-5" />
                                    <span>Descargar</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
