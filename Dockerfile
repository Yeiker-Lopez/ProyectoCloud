# Etapa 1: Build de la app dentro del contenedor
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Servidor de producción con nginx
FROM nginx:alpine

# Eliminar la configuración predeterminada de Nginx para reemplazarla
RUN rm /etc/nginx/conf.d/default.conf

# Copiar la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos construidos de tu aplicación
COPY --from=build /app/dist /usr/share/nginx/html

# Cloud Run espera que tu aplicación escuche en el puerto 8080
EXPOSE 8080

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]