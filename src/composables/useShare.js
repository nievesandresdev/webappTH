export const useShare = () => {
    async function resizeImage(imageUrl, maxWidth = 800, maxHeight = 600) {
        return new Promise((resolve) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                // Calcular las nuevas dimensiones manteniendo la proporción
                if (width > maxWidth) {
                    height = (maxWidth * height) / width;
                    width = maxWidth;
                }
                if (height > maxHeight) {
                    width = (maxHeight * width) / height;
                    height = maxHeight;
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob((blob) => {
                    resolve(new File([blob], 'image.jpg', { type: 'image/jpeg' }));
                }, 'image/jpeg', 0.8);
            };
            img.src = imageUrl;
        });
    }

    async function shareContent (data) {
        let { title, text, url, image, combineTitle = false } = data;
        
        // Si combineTitle es true, combinar título y texto
        const finalText = combineTitle ? `${title}\n\n${text}` : text;
        
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

        if (metaDescription) metaDescription.content = finalText;
        if (metaImage) metaImage.content = image;
        if (metaUrl) metaUrl.content = url;

        if (navigator.share) {
          try {
            const shareData = {
              title: combineTitle ? finalText : title,
              text: finalText,
              url,
            };

            if (image) {
              try {
                const resizedImage = await resizeImage(image);
                shareData.files = [resizedImage];
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