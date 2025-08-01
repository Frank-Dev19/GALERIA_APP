"use client"

import { useState } from "react"
import Link from "next/link"
import {
    Crown,
    Camera,
    Plane,
    PawPrint,
    Users,
    LogOut,
    Plus,
    Settings,
    Upload,
    Eye,
    Edit3,
    Trash2,
    ImageIcon,
    Lock,
    Globe,
    Star,
    TrendingUp,
    Sparkles,
} from "lucide-react"

const mockStats = {
    totalPhotos: 127,
    totalAlbums: 6,
    publicAlbums: 4,
    privateAlbums: 2,
    viewsThisMonth: 1250,
    likesThisMonth: 89,
}

const mockAlbums = [
    {
        id: "personales",
        title: "Mis Momentos Mágicos",
        photoCount: 24,
        isPublic: true,
        lastUpdated: "Hace 2 días",
        color: "from-purple-200 to-pink-300",
        icon: Crown,
        views: 145,
    },
    {
        id: "pareja",
        title: "Mi Príncipe Flynn",
        photoCount: 18,
        isPublic: false,
        lastUpdated: "Hace 1 semana",
        color: "from-amber-200 to-yellow-300",
        icon: Users,
        views: 0,
    },
    {
        id: "mascotas",
        title: "Pascal y Maximus",
        photoCount: 32,
        isPublic: true,
        lastUpdated: "Ayer",
        color: "from-emerald-200 to-teal-300",
        icon: PawPrint,
        views: 298,
    },
    {
        id: "viajes",
        title: "Más Allá de la Torre",
        photoCount: 45,
        isPublic: true,
        lastUpdated: "Hace 3 días",
        color: "from-blue-200 to-cyan-300",
        icon: Plane,
        views: 567,
    },
]

export default function DashboardPage() {
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showUploadModal, setShowUploadModal] = useState(false)
    const [albums, setAlbums] = useState(mockAlbums)
    const [newAlbumTitle, setNewAlbumTitle] = useState("")
    const [selectedAlbumColor, setSelectedAlbumColor] = useState("from-purple-200 to-pink-300")

    const toggleAlbumPrivacy = (albumId: string) => {
        setAlbums(albums.map((album) => (album.id === albumId ? { ...album, isPublic: !album.isPublic } : album)))
    }

    const deleteAlbum = (albumId: string) => {
        if (confirm("¿Estás segura de que quieres eliminar este álbum mágico?")) {
            setAlbums(albums.filter((album) => album.id !== albumId))
        }
    }

    const createNewAlbum = () => {
        if (newAlbumTitle.trim()) {
            const newAlbum = {
                id: newAlbumTitle.toLowerCase().replace(/\s+/g, "-"),
                title: newAlbumTitle,
                photoCount: 0,
                isPublic: true,
                lastUpdated: "Ahora",
                color: selectedAlbumColor,
                icon: Camera,
                views: 0,
            }
            setAlbums([...albums, newAlbum])
            setNewAlbumTitle("")
            setShowCreateModal(false)
        }
    }

    const colorOptions = [
        "from-purple-200 to-pink-300",
        "from-amber-200 to-yellow-300",
        "from-emerald-200 to-teal-300",
        "from-blue-200 to-cyan-300",
        "from-rose-200 to-pink-300",
        "from-orange-200 to-amber-300",
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-amber-100 relative overflow-hidden">
            {/* Background Tower */}
            <div className="absolute inset-0 opacity-40">
                <img src="/images/lintern.jpeg" alt="Torre de Rapunzel" className="w-full h-full object-cover" />
            </div>

            {/* Floating Lanterns */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-10 w-3 h-3 bg-amber-300 rounded-full opacity-40 animate-float"></div>
                <div className="absolute top-40 right-20 w-2 h-2 bg-yellow-300 rounded-full opacity-30 animate-pulse"></div>
                <div
                    className="absolute bottom-40 left-1/4 w-4 h-4 bg-orange-300 rounded-full opacity-35 animate-float"
                    style={{ animationDelay: "2s" }}
                ></div>
            </div>

            {/* Header */}
            <header className="bg-white/90 backdrop-blur-sm border-b border-purple-200 sticky top-0 z-40 relative">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-300 to-pink-400 rounded-full flex items-center justify-center relative">
                                <Crown className="w-6 h-6 text-purple-700" />
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-300 rounded-full animate-pulse"></div>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 bg-clip-text text-transparent">
                                    Torre de Control Mágica
                                </h1>
                                <p className="text-sm text-purple-600 font-medium">Administra tu reino de recuerdos ✨</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/"
                                className="flex items-center space-x-2 text-purple-600 hover:text-pink-600 transition-colors"
                            >
                                <Eye className="w-4 h-4" />
                                <span className="font-medium">Ver reino público</span>
                            </Link>
                            <button className="flex items-center space-x-2 text-purple-600 hover:text-pink-600 transition-colors">
                                <LogOut className="w-4 h-4" />
                                <span className="font-medium">Salir de la torre</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-200 shadow-lg relative">
                        <div className="absolute top-2 right-2 w-2 h-2 bg-amber-400 rounded-full animate-pulse opacity-60"></div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-purple-600 mb-1 font-medium">Recuerdos Mágicos</p>
                                <p className="text-3xl font-bold text-purple-800">{mockStats.totalPhotos}</p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-200 to-pink-300 rounded-xl flex items-center justify-center">
                                <ImageIcon className="w-6 h-6 text-purple-700" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border-2 border-amber-200 shadow-lg relative">
                        <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse opacity-60"></div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-amber-600 mb-1 font-medium">Álbumes Reales</p>
                                <p className="text-3xl font-bold text-amber-800">{mockStats.totalAlbums}</p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-r from-amber-200 to-yellow-300 rounded-xl flex items-center justify-center">
                                <Camera className="w-6 h-6 text-amber-700" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border-2 border-blue-200 shadow-lg relative">
                        <div className="absolute top-2 right-2 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-blue-600 mb-1 font-medium">Visitas del Reino</p>
                                <p className="text-3xl font-bold text-blue-800">{mockStats.viewsThisMonth}</p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-200 to-cyan-300 rounded-xl flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-blue-700" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border-2 border-pink-200 shadow-lg relative">
                        <div className="absolute top-2 right-2 w-2 h-2 bg-pink-400 rounded-full animate-pulse opacity-60"></div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-pink-600 mb-1 font-medium">Corazones Mágicos</p>
                                <p className="text-3xl font-bold text-pink-800">{mockStats.likesThisMonth}</p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-r from-pink-200 to-rose-300 rounded-xl flex items-center justify-center">
                                <Star className="w-6 h-6 text-pink-700" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-200 shadow-lg mb-8 relative">
                    <div className="absolute top-4 right-4 opacity-30">
                        <Sparkles className="w-6 h-6 text-amber-500 animate-pulse" />
                    </div>
                    <h3 className="text-xl font-bold text-purple-800 mb-4">Poderes Mágicos Rápidos</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-200 to-pink-300 rounded-xl hover:from-purple-300 hover:to-pink-400 transition-all duration-300 group border-2 border-purple-300"
                        >
                            <div className="w-10 h-10 bg-white/90 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Plus className="w-5 h-5 text-purple-700" />
                            </div>
                            <div className="text-left">
                                <p className="font-bold text-purple-800">Crear Álbum Real</p>
                                <p className="text-sm text-purple-700">Nueva sección mágica</p>
                            </div>
                        </button>

                        <button
                            onClick={() => setShowUploadModal(true)}
                            className="flex items-center space-x-3 p-4 bg-gradient-to-r from-amber-200 to-yellow-300 rounded-xl hover:from-amber-300 hover:to-yellow-400 transition-all duration-300 group border-2 border-amber-300"
                        >
                            <div className="w-10 h-10 bg-white/90 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Upload className="w-5 h-5 text-amber-700" />
                            </div>
                            <div className="text-left">
                                <p className="font-bold text-amber-800">Subir Recuerdos</p>
                                <p className="text-sm text-amber-700">Añadir nuevas memorias</p>
                            </div>
                        </button>

                        <button className="flex items-center space-x-3 p-4 bg-gradient-to-r from-emerald-200 to-teal-300 rounded-xl hover:from-emerald-300 hover:to-teal-400 transition-all duration-300 group border-2 border-emerald-300">
                            <div className="w-10 h-10 bg-white/90 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Settings className="w-5 h-5 text-emerald-700" />
                            </div>
                            <div className="text-left">
                                <p className="font-bold text-emerald-800">Configurar Torre</p>
                                <p className="text-sm text-emerald-700">Ajustes del reino</p>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Albums Management */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-200 shadow-lg relative">
                    <div className="absolute top-4 right-4 opacity-20">
                        <Crown className="w-8 h-8 text-amber-500" />
                    </div>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-purple-800">Gestionar Álbumes Reales</h3>
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            <Plus className="w-4 h-4" />
                            <span className="font-medium">Nuevo Reino</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {albums.map((album) => {
                            const IconComponent = album.icon
                            return (
                                <div
                                    key={album.id}
                                    className={`relative bg-gradient-to-br ${album.color} rounded-2xl p-6 border-3 border-white/50 shadow-lg hover:shadow-xl transition-all duration-300`}
                                >
                                    {/* Magical sparkles */}
                                    <div className="absolute top-2 right-2 w-2 h-2 bg-amber-400 rounded-full animate-pulse opacity-60"></div>
                                    <div
                                        className="absolute bottom-2 left-2 w-1 h-1 bg-yellow-400 rounded-full animate-pulse opacity-50"
                                        style={{ animationDelay: "1s" }}
                                    ></div>

                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-white/90 rounded-xl flex items-center justify-center">
                                                <IconComponent className="w-5 h-5 text-purple-700" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-purple-800">{album.title}</h4>
                                                <p className="text-sm text-purple-700">{album.photoCount} recuerdos</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => toggleAlbumPrivacy(album.id)}
                                                className={`p-2 rounded-lg transition-colors ${album.isPublic
                                                    ? "bg-green-200 text-green-700 hover:bg-green-300"
                                                    : "bg-red-200 text-red-700 hover:bg-red-300"
                                                    }`}
                                                title={album.isPublic ? "Reino Público" : "Torre Privada"}
                                            >
                                                {album.isPublic ? <Globe className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-purple-700 font-medium">Última magia:</span>
                                            <span className="text-purple-800 font-bold">{album.lastUpdated}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-purple-700 font-medium">Visitas reales:</span>
                                            <span className="text-purple-800 font-bold">{album.views}</span>
                                        </div>
                                    </div>

                                    <div className="flex space-x-2">
                                        <Link
                                            href={`/dashboard/album/${album.id}`}
                                            className="flex-1 bg-white/90 hover:bg-white text-purple-700 px-3 py-2 rounded-lg text-sm font-bold transition-colors flex items-center justify-center space-x-1"
                                        >
                                            <Edit3 className="w-4 h-4" />
                                            <span>Editar</span>
                                        </Link>
                                        <button
                                            onClick={() => deleteAlbum(album.id)}
                                            className="bg-red-200 hover:bg-red-300 text-red-700 px-3 py-2 rounded-lg text-sm font-bold transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Create Album Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white/95 rounded-3xl p-8 max-w-md w-full shadow-2xl border-2 border-purple-200 relative">
                        <div className="absolute top-4 right-4 w-2 h-2 bg-amber-400 rounded-full animate-pulse opacity-60"></div>
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-gradient-to-r from-purple-300 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                                <Plus className="w-8 h-8 text-purple-700" />
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-300 rounded-full flex items-center justify-center">
                                    <Sparkles className="w-2 h-2 text-amber-700" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-purple-800 mb-2">Crear Nuevo Reino</h3>
                            <p className="text-purple-600">Dale un nombre mágico y elige colores encantados</p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-purple-700 mb-2">Nombre del reino mágico</label>
                                <input
                                    type="text"
                                    value={newAlbumTitle}
                                    onChange={(e) => setNewAlbumTitle(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent bg-purple-50/50"
                                    placeholder="Ej: Aventuras en el bosque encantado"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-purple-700 mb-2">Colores mágicos</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {colorOptions.map((color, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedAlbumColor(color)}
                                            className={`h-12 bg-gradient-to-r ${color} rounded-xl border-3 transition-all ${selectedAlbumColor === color ? "border-purple-500 scale-105 shadow-lg" : "border-purple-200"
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-8">
                            <button
                                onClick={() => setShowCreateModal(false)}
                                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-300 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={createNewAlbum}
                                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 rounded-xl font-bold hover:from-purple-600 hover:to-pink-700 transition-all"
                            >
                                Crear Reino
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Upload Photos Modal */}
            {showUploadModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white/95 rounded-3xl p-8 max-w-lg w-full shadow-2xl border-2 border-purple-200 relative">
                        <div className="absolute top-4 right-4 w-2 h-2 bg-amber-400 rounded-full animate-pulse opacity-60"></div>
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-gradient-to-r from-amber-300 to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                                <Upload className="w-8 h-8 text-amber-700" />
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-300 rounded-full flex items-center justify-center">
                                    <Sparkles className="w-2 h-2 text-purple-700" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-purple-800 mb-2">Subir Recuerdos Mágicos</h3>
                            <p className="text-purple-600">Añade nuevas memorias a tu reino encantado</p>
                        </div>

                        <div className="border-3 border-dashed border-purple-300 rounded-2xl p-8 text-center hover:border-pink-400 transition-colors cursor-pointer bg-purple-50/30">
                            <Upload className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                            <p className="text-purple-700 mb-2 font-medium">Arrastra tus recuerdos mágicos aquí o</p>
                            <button className="text-pink-600 font-bold hover:text-pink-700">selecciona archivos encantados</button>
                            <p className="text-sm text-purple-500 mt-2">PNG, JPG, GIF hasta 10MB cada recuerdo</p>
                        </div>

                        <div className="mt-6">
                            <label className="block text-sm font-bold text-purple-700 mb-2">Reino de destino</label>
                            <select className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 bg-purple-50/50">
                                {albums.map((album) => (
                                    <option key={album.id} value={album.id}>
                                        {album.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex space-x-3 mt-8">
                            <button
                                onClick={() => setShowUploadModal(false)}
                                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-300 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-600 text-white py-3 rounded-xl font-bold hover:from-amber-600 hover:to-yellow-700 transition-all">
                                Subir Magia
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
