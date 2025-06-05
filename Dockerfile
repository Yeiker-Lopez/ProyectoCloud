# Etapa 1: Build de la app dentro del contenedor
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

# Etapa 2: Servidor de producción con nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE
CMD ["nginx", "-g", "daemon off;"]
