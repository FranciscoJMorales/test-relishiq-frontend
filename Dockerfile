# Build app
FROM node:22.1.0-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve app with nginx
FROM nginx:1.27.0-alpine AS prod
COPY default.conf /etc/nginx/conf.d
COPY --from=build /app/dist/test-relishiq-frontend/browser/ /usr/share/nginx/html

EXPOSE 80
