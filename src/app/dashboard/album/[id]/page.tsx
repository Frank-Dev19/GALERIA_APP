"use client"

import { useParams } from "next/navigation"
import AlbumManagementPage from "./AlbumManagementPage"

export default function Page() {
    const params = useParams<{ id: string }>()
    const albumId = Number(params.id)

    return <AlbumManagementPage albumId={albumId} />
}
