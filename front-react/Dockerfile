FROM node:19-alpine AS build

WORKDIR /front-react

# Copy only package files and the locally downloaded node_modules folder
COPY package*.json ./
RUN npm install --legacy-peer-deps
# COPY node_modules/ ./node_modules/

# Copy the rest of the application code

COPY . .
RUN npm run build

FROM nginx:latest

# Copiar la configuración de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Add the nginx configuration
# COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /front-react/build /usr/share/nginx/html

# EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
