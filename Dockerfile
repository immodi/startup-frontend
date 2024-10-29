# Build stage
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration (created below)
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY public/env-config.js /usr/share/nginx/html/env-config.js
COPY ./inject-env.sh /docker-entrypoint.d/10-inject-env.sh
RUN chmod +x /docker-entrypoint.d/10-inject-env.sh

# Expose port 5173
EXPOSE 5173

# Start nginx
CMD ["nginx", "-g", "daemon off;"]


