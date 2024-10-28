# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine

# Set up environment injection script
COPY --from=builder /app/dist /usr/share/nginx/html
COPY public/env-config.js /usr/share/nginx/html/env-config.js

# Inject environment variables script
COPY ./inject-env.sh /docker-entrypoint.d/10-inject-env.sh
RUN chmod +x /docker-entrypoint.d/10-inject-env.sh

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
