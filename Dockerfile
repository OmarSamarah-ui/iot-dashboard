# Use an official Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Copy the entire project (backend, frontend, and other necessary files)
COPY . .

# Install root dependencies
RUN npm install

# Install backend dependencies
WORKDIR /app/backend
RUN npm install

# Install frontend dependencies
WORKDIR /app/frontend
RUN npm install

# Expose necessary ports
EXPOSE 5000 5173

# Move back to root directory
WORKDIR /app

# Default command will be handled by docker-compose
CMD ["npm", "run", "dev"]
