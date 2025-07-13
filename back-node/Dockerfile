FROM node:19

# Set the working directory
WORKDIR /back-node

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install && npm list

# Copy the pre-installed node_modules
# COPY ./node_modules ./node_modules
# Copy the rest of the application code
COPY . .
# Expose the port
EXPOSE 8081

# Start the application
CMD ["npm", "start"]