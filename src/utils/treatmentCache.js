/**
 * Gets the reset cache value from localStorage
 * @returns {string|null} The reset cache value or null if not found
 */
export const getValueResetCache = () => {
    try {
        return localStorage.getItem('reset-cache') ?? null;
    } catch (error) {
        console.error('Error accessing localStorage:', error);
        return null;
    }
}

/**
 * Adds the reset cache property to a URL query string
 * @returns {string} The modified URL with reset cache parameter
 */
export const getPropertyResetCacheInQueryUrl = () => {
    try {
        const url = window.location.href;
        // console.log('test url',url)
        const urlObj = new URL(url);
        const valueResetCache = urlObj.searchParams.get('rc') ?? null;
        
        return valueResetCache;
    } catch (error) {
        console.error('Error processing URL:', error);
        return null; // Return original URL in case of error
    }
}