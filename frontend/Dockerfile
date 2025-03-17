# Use an official Node.js image
FROM node:20 AS build

# Set working directory
WORKDIR /app

# Copy all frontend files (from the frontend folder in the root project)
COPY . ./

# Install dependencies and build
RUN npm install && npm run build

# Use an Nginx server to serve the static files
FROM nginx:alpine

# Copy built files to Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
