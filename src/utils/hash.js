/**
 * Genera un hash SHA-256 de 20 caracteres a partir de un valor
 * @param {string} value - El valor a hashear
 * @returns {Promise<string|null>} - El hash de 20 caracteres o null si hay error
 */
export const generateHash = async (value, length = 20) => {
    if (!value) return null;
    try {
      // Convertir el string a un array de bytes
      const encoder = new TextEncoder();
      const data = encoder.encode(value);
      
      // Generar el hash SHA-256
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      
      // Convertir el buffer a un array de bytes
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      
      // Convertir los bytes a hexadecimal y tomar los primeros 20 caracteres
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').slice(0, length);
      
      return hashHex;
    } catch (error) {
      console.error('Error generando hash:', error);
      return null;
    }
  };