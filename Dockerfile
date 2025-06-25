# Dockerfile for ForumAPI
FROM node:20-alpine3.19

# Set working directory
WORKDIR /usr/src/app

# Install dependencies (leverage Docker cache by copying only package files first)
COPY package*.json ./
RUN npm ci --only=production

# Copy the rest of the source code
COPY . .

# Expose port 
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
