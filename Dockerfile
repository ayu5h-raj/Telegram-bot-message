# Use the official Node.js 20 image as the base image
FROM node:20-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose port 3000 for the Node.js service
EXPOSE 3000

# Start the Node.js service
CMD ["npm", "start"]
