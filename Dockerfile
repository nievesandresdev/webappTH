# Etapa de construcción
FROM node:18 AS build-stage

WORKDIR /app

# Copiar los archivos de definición de paquetes y limpiar si es necesario
COPY package*.json ./

# Instalar dependencias y construir el proyecto
RUN npm install
COPY . .
RUN npm run build

# Etapa de producción
FROM nginx:stable-alpine as production-stage

# Copiar el build del stage anterior
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Configurar nginx para servir la aplicación
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
