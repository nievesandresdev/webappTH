export const useShare = () => {

    async function shareContent (data) {
        let { title, text, url, image } = data;
        if (navigator.share) {
          try {
            const shareData = {
              title,
              text,
              url,
            };

            // Si hay una imagen, la convertimos a File y la agregamos
            if (image) {
              try {
                const response = await fetch(image);
                const blob = await response.blob();
                const file = new File([blob], 'image.jpg', { type: blob.type });
                shareData.files = [file];
              } catch (error) {
                console.error('Error al cargar la imagen:', error);
              }
            }

            await navigator.share(shareData);
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