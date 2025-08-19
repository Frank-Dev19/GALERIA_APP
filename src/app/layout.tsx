import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { AuthProvider } from "../context/AuthContext"

export const metadata: Metadata = {
  title: "Reino de Pamela",
  description: "Una galería personal elegante y moderna para preservar mis momentos más especiales",
  icons: {
    icon: "/favicon.png", // o "/favicon.ico" si usas ese formato
    // También puedes agregar otros tamaños/formatos:
    // apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
