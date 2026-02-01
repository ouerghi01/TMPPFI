# Stage 1: build React app
FROM node:18-alpine AS build
WORKDIR /app
ARG VITE_API_URL=http://51.210.107.84:9989/api/v1
ENV VITE_API_URL=$VITE_API_URL
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Stage 2: serve with Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
