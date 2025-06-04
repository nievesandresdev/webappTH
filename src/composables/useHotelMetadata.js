import { useHead } from '@unhead/vue'
import { ref } from 'vue'
import axios from 'axios'

export default function useHotelMetadata() {
    const loading = ref(false)
    const error = ref(null)

    const setHotelMetadata = async (subdomain) => {
    loading.value = true
    error.value = null
    
    try {
        const response = await axios.get(`https://api.test.thehoster.io/api/metadata/${subdomain}`)
    
        if (response.data.success) {
            const metaData = response.data.data
        
            useHead({
            title: metaData.title,
            meta: [
                { name: 'description', content: metaData.description },
            
                // Open Graph / Facebook
                { property: 'og:type', content: 'website' },
                { property: 'og:url', content: metaData.url },
                { property: 'og:title', content: metaData.title },
                { property: 'og:description', content: metaData.description },
                { property: 'og:image', content: metaData.image },
            
                // Twitter
                { property: 'twitter:card', content: 'summary_large_image' },
                { property: 'twitter:url', content: metaData.url },
                { property: 'twitter:title', content: metaData.title },
                { property: 'twitter:description', content: metaData.description },
                { property: 'twitter:image', content: metaData.image }
            ]
            })
        }
        } catch (err) {
            error.value = err.response?.data?.message || err.message
            console.error('Error fetching hotel metadata:', err)
        } finally {
            loading.value = false
        }
    }

    return { loading, error, setHotelMetadata }
}