import { watch } from 'vue'
import { useRoute } from 'vue-router'

export function useFavicon(iconPath) {
    const route = useRoute()
    
    const updateFavicon = (path) => {
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
        newFavicon.href = path
        document.head.appendChild(newFavicon)
    }

    // Actualizar favicon cuando se monta el componente y cuando cambia la ruta
    watch(() => route.path, () => {
        updateFavicon(iconPath)
    }, { immediate: true })
} 