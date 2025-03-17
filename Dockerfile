# Use an official Node.js image as the base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json files from root, backend, and frontend
COPY package.json package-lock.json ./
COPY backend/package.json backend/package-lock.json backend/
COPY frontend/package.json frontend/package-lock.json frontend/

# Install root dependencies
RUN npm install

# Install backend dependencies
WORKDIR /app/backend
RUN npm install

# Install frontend dependencies & build
WORKDIR /app/frontend
RUN npm install && npm run build

# Move back to root directory
WORKDIR /app

# Expose necessary ports
EXPOSE 5000 3000

# Start both backend and frontend using concurrently
CMD ["npm", "start"]
