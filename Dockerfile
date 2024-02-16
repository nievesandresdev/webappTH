# Usar imagen base de Nginx
FROM nginx:stable-alpine

# Establecer el directorio de trabajo en el directorio donde Nginx sirve los archivos
WORKDIR /usr/share/nginx/html

# Eliminar archivos predeterminados de Nginx
RUN rm -rf ./*

# Copiar los archivos estáticos construidos
COPY dist .

# Exponer el puerto 80
EXPOSE 80

# Iniciar Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
