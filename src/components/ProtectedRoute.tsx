"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface ProtectedRouteProps {
    children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.replace("/login"); // redirige al login si no hay token
        } else {
            setIsChecking(false); // ya hay token, permite renderizar
        }
    }, [router]);

    if (isChecking) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-lg">Verificando sesión...</p>
            </div>
        );
    }

    return <>{children}</>;
}
