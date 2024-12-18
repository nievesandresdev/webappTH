export const useShare = () => {

    async function shareContent (data) {
        let { title, text, url } = data;
        alert(`${title} ${text} ${url}`);
        if (navigator.share) {
          try {
            await navigator.share({
              title,
              text,
              url,
            });
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