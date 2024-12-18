export const useMediaQuery = () => {

    async function shareContent () {
        if (navigator.share) {
          try {
            await navigator.share({
              title: 'Título del contenido',
              text: 'Este es el texto del contenido que quiero compartir.',
              url: 'https://example.com'
            });
            console.log('¡Compartido con éxito!');
          } catch (error) {
            console.error('Error al compartir:', error);
          }
        } else {
          alert('La función de compartir no está disponible en este navegador.');
        }
      }

      return {
        shareContent,
      }

}