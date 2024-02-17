FROM node:18

# Instalar el paquete 'serve' para servir la aplicación
RUN npm install -g serve

# Establecer el directorio de trabajo en /app
WORKDIR /app

# Copiar el directorio 'dist' ya construido en el directorio de trabajo
# Asegúrate de que el directorio 'dist' se haya construido y esté presente en el contexto de construcción
COPY dist /app

# Exponer el puerto 8080
EXPOSE 8080

# Comando para servir la aplicación
CMD ["serve", "-s", ".", "-l", "8080"]
