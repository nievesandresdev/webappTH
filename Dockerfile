# Etapa de construcción
FROM node:18-alpine as build-stage

# Establece el directorio de trabajo
WORKDIR /app

# Copia archivos de dependencias antes del código
COPY package*.json ./

# Instala todas las dependencias, incluidas las de desarrollo (para vue-cli-service)
RUN npm install

# Copia el código fuente después de instalar las dependencias
COPY . .

# Construcción del proyecto Vue
RUN npm run build

# Etapa de producción (Nginx)
FROM nginx:alpine as production-stage

# Copiar la build generada en la etapa anterior
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copiar la configuración de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
