FROM node:lts-alpine AS base

FROM base as deps

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

FROM base as builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN npm run build

FROM nginx:stable-alpine as production-stage

COPY --from=builder /app/dist /usr/share/nginx/html
# COPY --from=builder /app/.env ./.env

# Copiar la configuración de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Exponer el puerto 80
EXPOSE 3000

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
