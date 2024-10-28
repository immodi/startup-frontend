# Stage 1: Build
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies separately to leverage Docker cache
COPY package*.json ./
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the project
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine

# Copy the build files from the first stage to the Nginx web directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy a custom Nginx configuration (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port Nginx is running on
EXPOSE 3000

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
