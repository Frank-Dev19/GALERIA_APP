"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart, Camera, Plane, PawPrint, Sparkles, Crown } from "lucide-react"

const albums = [
  {
    id: "personales",
    title: "Mis Momentos Mágicos",
    description: "Como Rapunzel en su torre, mis recuerdos más preciados",
    icon: Crown,
    color: "from-purple-200 to-pink-300",
    borderColor: "border-purple-300",
    count: 24,
    coverImage: "/images/2.jpg?height=200&width=300",
  },
  {
    id: "pareja",
    title: "Mi Príncipe Flynn",
    description: "Aventuras de amor como en los cuentos de hadas",
    icon: Heart,
    color: "from-amber-200 to-yellow-300",
    borderColor: "border-amber-300",
    count: 18,
    coverImage: "/images/1.webp?height=200&width=300",
  },
  {
    id: "mascotas",
    title: "Pascal y Maximus",
    description: "Mis fieles compañeros de aventuras",
    icon: PawPrint,
    color: "from-emerald-200 to-teal-300",
    borderColor: "border-emerald-300",
    count: 32,
    coverImage: "/images/3.webp?height=200&width=300",
  },
  {
    id: "viajes",
    title: "Más Allá de la Torre",
    description: "Explorando el mundo como siempre soñé",
    icon: Plane,
    color: "from-blue-200 to-cyan-300",
    borderColor: "border-blue-300",
    count: 45,
    coverImage: "/images/4.jpg?height=200&width=300",
  },
  {
    id: "felices",
    title: "Linternas Flotantes",
    description: "Momentos que brillan como las linternas del reino",
    icon: Sparkles,
    color: "from-orange-200 to-amber-300",
    borderColor: "border-orange-300",
    count: 28,
    coverImage: "/images/5.webp?height=200&width=300",
  },
  {
    id: "creativos",
    title: "Arte de la Torre",
    description: "Mis creaciones artísticas y sueños pintados",
    icon: Camera,
    color: "from-rose-200 to-pink-300",
    borderColor: "border-rose-300",
    count: 19,
    coverImage: "/images/6.webp?height=200&width=300",
  },
]

export default function HomePage() {
  const [hoveredAlbum, setHoveredAlbum] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-rapunzel-tower relative overflow-hidden">
      {/* Rapunzel Tower Background */}
      <div className="absolute inset-0 opacity-40">
        <img
          src="/images/lintern.jpeg?height=800&width=1200"
          alt="Torre de Rapunzel"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Floating Lanterns Animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-4 h-4 lantern-glow animate-lantern-float"></div>
        <div
          className="absolute top-40 right-20 w-3 h-3 lantern-glow animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-60 left-1/3 w-5 h-5 lantern-glow animate-lantern-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-40 right-1/4 w-4 h-4 lantern-glow animate-float"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="absolute bottom-60 left-20 w-3 h-3 lantern-glow animate-lantern-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Header */}
      <header className="rapunzel-card border-b border-purple-200 sticky top-0 z-50 relative">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-rapunzel-magic rounded-full flex items-center justify-center relative sparkle-effect">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gradient-rapunzel">Galería de Rapunzel</h1>
              <p className="text-sm text-purple-600 font-medium">✨ Donde los sueños se hacen realidad ✨</p>
            </div>
          </div>
          <Link
            href="/login"
            className="flex items-center space-x-2 bg-gradient-rapunzel-royal text-white px-6 py-3 rounded-full hover-lift shadow-lg relative sparkle-effect"
          >
            <Crown className="w-4 h-4" />
            <span className="font-medium">Torre Secreta</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            <img
              src="/images/rapunzel.jpeg"
              alt="Rapunzel"
              className="w-32 h-32 rounded-full border-4 border-purple-300 shadow-2xl mx-auto hover-glow"
            />
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-300 rounded-full flex items-center justify-center animate-sparkle">
              <Sparkles className="w-4 h-4 text-amber-700" />
            </div>
          </div>
          <h2 className="text-5xl font-bold text-purple-800 mb-4 sparkle-effect">Bienvenidos a mi Reino Mágico</h2>
          <p className="text-xl text-purple-700 max-w-3xl mx-auto leading-relaxed">
            Como las linternas que iluminan el cielo, cada foto cuenta una historia de aventura, amor y sueños
            cumplidos. Explora mis recuerdos más preciados desde mi torre encantada.
          </p>
          <div className="mt-6 flex justify-center">
            <img
              src="/images/rapunzel-flowers.jpg"
              alt="Flores mágicas"
              className="w-16 h-16 rounded-full opacity-80 animate-float"
            />
          </div>
        </div>

        {/* Albums Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {albums.map((album) => {
            const IconComponent = album.icon
            return (
              <Link
                key={album.id}
                href={`/album/${album.id}`}
                className="group block"
                onMouseEnter={() => setHoveredAlbum(album.id)}
                onMouseLeave={() => setHoveredAlbum(null)}
              >
                <div
                  className={`
                  relative overflow-hidden rounded-3xl border-magical
                  bg-gradient-to-br ${album.color} p-6 h-80
                  hover-lift
                  ${hoveredAlbum === album.id ? "animate-magical-glow" : ""}
                `}
                >
                  {/* Magical Sparkles */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-4 right-4 w-2 h-2 bg-amber-400 rounded-full animate-sparkle"></div>
                    <div
                      className="absolute top-12 right-8 w-1 h-1 bg-yellow-400 rounded-full animate-sparkle"
                      style={{ animationDelay: "0.5s" }}
                    ></div>
                    <div
                      className="absolute bottom-8 left-6 w-2 h-2 bg-amber-300 rounded-full animate-sparkle"
                      style={{ animationDelay: "1s" }}
                    ></div>
                  </div>

                  {/* Background Image */}
                  <div className="absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                    <img
                      src={album.coverImage || "/placeholder.svg"}
                      alt={album.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <div className="rapunzel-card rounded-2xl p-3">
                        <IconComponent className="w-6 h-6 text-purple-700" />
                      </div>
                      <div className="rapunzel-card rounded-full px-4 py-2">
                        <span className="text-sm font-bold text-purple-700">{album.count} recuerdos</span>
                      </div>
                    </div>

                    <div className="rapunzel-card rounded-2xl p-4">
                      <h3 className="text-xl font-bold text-purple-800 mb-2 group-hover:text-gradient-rapunzel transition-colors">
                        {album.title}
                      </h3>
                      <p className="text-purple-700 text-sm leading-relaxed">{album.description}</p>
                    </div>
                  </div>

                  {/* Decorative Crown */}
                  <div className="absolute top-4 right-4 opacity-30 group-hover:opacity-60 transition-opacity">
                    <Crown className="w-8 h-8 text-amber-500 animate-float" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Floating Lanterns Section */}
        <div className="mt-16 text-center">
          <img
            src="/images/foot.jpg?height=400&width=800"
            alt="Linternas flotantes"
            className="w-full max-w-4xl mx-auto rounded-3xl shadow-2xl opacity-90 hover-lift"
          />
          <p className="mt-6 text-purple-600 italic text-lg sparkle-effect">"Y por fin veo la luz... ✨"</p>
        </div>
      </main>

      {/* Footer */}
      <footer className="rapunzel-card border-t border-purple-200 mt-16 relative">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-rapunzel-magic rounded-full flex items-center justify-center sparkle-effect">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <span className="text-purple-700 font-bold text-lg">Reino de Rapunzel</span>
            </div>
            <div className="flex space-x-6 text-sm text-purple-600">
              <a href="#" className="hover:text-gradient-rapunzel transition-colors">
                Mi Historia
              </a>
              <a href="#" className="hover:text-gradient-rapunzel transition-colors">
                Contacto Real
              </a>
              <a href="#" className="hover:text-gradient-rapunzel transition-colors">
                Secretos de la Torre
              </a>
            </div>
          </div>
          <div className="text-center mt-6 pt-6 border-t border-purple-200">
            <p className="text-purple-500 text-sm sparkle-effect">Hecho con magia y cabello dorado 👑✨🌸</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
