export const useShare = () => {

    async function shareContent (data) {
        let { title, text, url, image } = data;
        
        // Guardar los meta tags originales
        const originalTitle = document.title;
        const originalMetaDescription = document.querySelector('meta[name="description"]')?.content;
        const originalMetaImage = document.querySelector('meta[property="og:image"]')?.content;
        const originalMetaUrl = document.querySelector('meta[property="og:url"]')?.content;

        // Actualizar los meta tags
        document.title = title;
        const metaDescription = document.querySelector('meta[name="description"]');
        const metaImage = document.querySelector('meta[property="og:image"]');
        const metaUrl = document.querySelector('meta[property="og:url"]');

        if (metaDescription) metaDescription.content = text;
        if (metaImage) metaImage.content = image;
        if (metaUrl) metaUrl.content = url;

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
          } finally {
            // Restaurar los meta tags originales
            document.title = originalTitle;
            if (metaDescription) metaDescription.content = originalMetaDescription;
            if (metaImage) metaImage.content = originalMetaImage;
            if (metaUrl) metaUrl.content = originalMetaUrl;
          }
        } else {
          alert('La función de compartir no está disponible en este navegador.');
        }
      }

      return {
        shareContent,
      }

}