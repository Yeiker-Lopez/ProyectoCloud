# Etapa 1: Build de la aplicación frontend con Node.js y Vite
# Utiliza una imagen base ligera de Node.js v18
FROM node:18-alpine AS build

# Establece el directorio de trabajo dentro del contenedor para la fase de construcción
WORKDIR /app

# Copia los archivos package.json y package-lock.json (o yarn.lock)
# Esto permite que Docker cachee la capa de instalación de dependencias si estos archivos no cambian
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto del código de la aplicación (incluyendo la carpeta src, public, etc.)
COPY . .

# Ejecuta el comando de compilación de Vite para generar los archivos estáticos
# Los archivos resultantes se guardarán en la carpeta 'dist' por defecto
RUN npm run build

# Etapa 2: Servidor de producción ligero con Nginx
# Utiliza una imagen base ligera de Nginx
FROM nginx:alpine

# (Opcional pero recomendado para Nginx) Elimina la configuración predeterminada de Nginx
# Esto se hace para evitar conflictos y asegurar que solo nuestra configuración personalizada se use
RUN rm /etc/nginx/conf.d/default.conf

# Copia la configuración personalizada de Nginx
# Asegúrate de que tu archivo 'nginx.conf' esté en la raíz de tu proyecto local,
# junto a este Dockerfile. Este archivo le dice a Nginx que escuche en el puerto 8080.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia los archivos estáticos generados por la etapa 'build' al directorio de Nginx
# La etapa 'build' generó estos archivos en '/app/dist'
# Nginx servirá estos archivos desde '/usr/share/nginx/html'
COPY --from=build /app/dist /usr/share/nginx/html

# Expone el puerto en el que Nginx va a escuchar dentro del contenedor.
# Cloud Run espera que tu aplicación escuche en el puerto 8080 por defecto.
EXPOSE 8080

# Comando para iniciar Nginx en modo 'daemon off' (en primer plano)
# Esto es necesario para que el contenedor permanezca activo y Cloud Run pueda monitorearlo.
CMD ["nginx", "-g", "daemon off;"]
