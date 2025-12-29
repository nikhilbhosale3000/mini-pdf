# Node.js runtime as a parent image
FROM node:18-slim

# Installing Ghostscript
# We use 'apt-get' because this base image is Linux (Debian)
RUN apt-get update && \
    apt-get install -y ghostscript && \
    rm -rf /var/lib/apt/lists/*

# Setting up the working directory in the container
WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install

# 6. Copy the rest of your app's source code
COPY . .

# Build the TypeScript code
RUN npm run build

# Create the uploads folder 
RUN mkdir -p uploads

# Expose the port the app runs on
EXPOSE 4000

# Define the command to run your app
CMD ["npm", "start"]