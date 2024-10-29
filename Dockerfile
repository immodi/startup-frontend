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

# Install Node.js to run the environment script
RUN apk add --no-cache nodejs npm

# Copy the Node script to the container
COPY public/writeEnv.js /usr/share/nginx/writeEnv.js

# Run the Node script to create the .env file
RUN node /usr/share/nginx/writeEnv.js

# Expose port 5173
EXPOSE 5173

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
