# Use the official Node.js 14 LTS image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Copy the rest of the application code to the working directory
COPY . .

# Install dependencies
RUN npm install

# Expose the port that the application will run on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:dev"]