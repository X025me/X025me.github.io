# Use nginx as the base image
FROM nginx:alpine

# Remove the default nginx configuration
RUN rm /usr/share/nginx/html/*

# Copy the static files to the nginx folder
COPY . /usr/share/nginx/html

# Expose port 80 to serve the application
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
