"use client"

import { useState } from "react"
import Link from "next/link"
import { Crown, Eye, EyeOff, Sparkles, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { authService } from "@/services/auth.service"

export default function LoginPage() {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        try {
            const data = await authService.login(email, password)

            // Guardar token
            localStorage.setItem("token", data.access_token)

            router.push("/dashboard")
        } catch (err: any) {
            setError(err.message || "Error en el inicio de sesión")
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-amber-200 flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute inset-0 opacity-100">
                <img src="/images/fondo.jpg" alt="Torre de Rapunzel" className="w-full h-full object-cover" />
            </div>

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-20 w-8 h-8 bg-amber-300/40 rounded-full blur-sm animate-float"></div>
                <div className="absolute top-40 right-32 w-6 h-6 bg-yellow-300/40 rounded-full blur-sm animate-pulse"></div>
                <div
                    className="absolute bottom-32 left-32 w-10 h-10 bg-orange-300/40 rounded-full blur-sm animate-float"
                    style={{ animationDelay: "2s" }}
                ></div>
                <div
                    className="absolute bottom-20 right-20 w-7 h-7 bg-amber-400/40 rounded-full blur-sm animate-pulse"
                    style={{ animationDelay: "1s" }}
                ></div>
                <div
                    className="absolute top-1/2 left-1/4 w-5 h-5 bg-yellow-400/40 rounded-full blur-sm animate-float"
                    style={{ animationDelay: "3s" }}
                ></div>
            </div>

            <div className="relative w-full max-w-md z-10">
                <Link
                    href="/"
                    className="absolute -top-8 left-0 flex items-center space-x-2 text-white hover:text-pink-600 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm font-medium ">Volver al reino</span>
                </Link>

                <div className="bg-/95 backdrop-blur-lg rounded-3xl shadow-2xl border-2 border-purple-200 p-8 relative overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-4 right-4 w-2 h-2 bg-amber-400 rounded-full animate-pulse opacity-60"></div>
                        <div
                            className="absolute top-8 right-8 w-1 h-1 bg-yellow-400 rounded-full animate-pulse opacity-50"
                            style={{ animationDelay: "0.5s" }}
                        ></div>
                        <div
                            className="absolute bottom-6 left-6 w-2 h-2 bg-amber-300 rounded-full animate-pulse opacity-40"
                            style={{ animationDelay: "1s" }}
                        ></div>
                    </div>

                    <div className="text-center mb-8">
                        <div className="relative inline-block mb-4">
                            <div className="w-20 h-20 bg-gradient-to-r from-purple-300 to-pink-400 rounded-full flex items-center justify-center relative">
                                <Crown className="w-10 h-10 text-purple-700" />
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-300 rounded-full flex items-center justify-center">
                                    <Sparkles className="w-3 h-3 text-amber-700" />
                                </div>
                            </div>
                            <img
                                src="/images/fondo.jpg"
                                alt="Cabello de Rapunzel"
                                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-2 border-amber-300 opacity-80"
                            />
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 bg-clip-text text-transparent mb-2">
                            Torre Secreta
                        </h1>
                        <p className="text-white text-lg font-medium">Solo para la princesa Pamela 👑</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleLogin}>
                        {error && (
                            <p className="text-red-500 text-sm text-center">{error}</p>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-white block">Email Real</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 bg-purple-50/80 border-2 border-purple-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 placeholder-purple-400"
                                    placeholder="rapunzel@reino.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-white block">Contraseña Mágica</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 bg-purple-50/80 border-2 border-purple-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 placeholder-purple-400 pr-12"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-500 hover:text-purple-700 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input type="checkbox" className="rounded border-purple-300 text-purple-600 focus:ring-purple-400" />
                                <span className="text-white font-medium">Recordar en el reino</span>
                            </label>
                            <a href="#" className="text-white hover:text-pink-700 transition-colors font-medium">
                                ¿Olvidaste la magia?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 text-white py-3 rounded-2xl font-bold hover:from-purple-600 hover:via-pink-600 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] relative"
                        >
                            <span className="relative z-10">Entrar a mi Torre Mágica</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-yellow-400/20 rounded-2xl animate-pulse"></div>
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-purple-200 text-center">
                        <div className="flex justify-center mb-2">
                            <img src="/images/rapunzel-flowers.jpg" alt="Flores mágicas" className="w-8 h-8 rounded-full" />
                        </div>
                        <p className="text-xs text-white">Reino privado y mágico 🌸👑✨</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
