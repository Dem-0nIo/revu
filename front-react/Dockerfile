# Etapa 1: Construcción de la aplicación React
FROM node:19-alpine AS build

WORKDIR /front-react
COPY . .

RUN npm install
RUN npm run build

# Etapa 2: Configuración del servidor Nginx
FROM nginx:alpine3.19

WORKDIR /etc/nginx

# Definir argumento de entorno
ARG NODE_ENV=development
ENV NODE_ENV=$NODE_ENV

# Crear carpeta para certificados (solo en producción)
RUN if [ "$NODE_ENV" = "production" ]; then mkdir -p /etc/nginx/ssl; fi

# Copiar certificados SOLO si es producción
RUN if [ "$NODE_ENV" = "production" ]; then \
    cp /front-react/certs/revuagencyapp_com_chain.crt /etc/nginx/ssl/revuagencyapp_com_chain.crt && \
    cp /front-react/certs/revuagencyapp.key /etc/nginx/ssl/revuagencyapp.key; \
fi

# Copiar archivos de configuración de Nginx al contenedor
COPY nginx.dev.conf /etc/nginx/nginx.dev.conf
COPY nginx.prod.conf /etc/nginx/nginx.prod.conf

RUN echo "NODE_ENV is set to $NODE_ENV"

# Copiar la configuración de Nginx (diferente según entorno)
RUN if [ "$NODE_ENV" = "production" ]; then \
    cp /etc/nginx/nginx.prod.conf /etc/nginx/conf.d/default.conf; \
else \
    cp /etc/nginx/nginx.dev.conf /etc/nginx/conf.d/default.conf; \
fi

EXPOSE 80 443
EXPOSE 8082

# Comando de inicio
CMD ["nginx", "-g", "daemon off;"]
