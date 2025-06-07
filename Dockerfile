# Use an official Node.js image as the base image
FROM node:18 AS build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy env first
COPY .env .env

# Copy the rest of the app's source code
COPY . .

# Build the React app
RUN npm run build

# Use Nginx to serve the build files
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]