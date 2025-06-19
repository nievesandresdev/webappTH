export function useFavicon(iconPath) {
    const favicon = document.querySelector("link[rel~='icon']")
    if (!favicon) {
        const newFavicon = document.createElement('link')
        newFavicon.rel = 'icon'
        newFavicon.type = 'image/svg+xml'
        document.head.appendChild(newFavicon)
    }
    // Forzar actualización del favicon
    favicon?.remove()
    const newFavicon = document.createElement('link')
    newFavicon.rel = 'icon'
    newFavicon.type = 'image/svg+xml'
    newFavicon.href = iconPath
    document.head.appendChild(newFavicon)
} 