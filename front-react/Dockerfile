FROM node:19-alpine AS build

WORKDIR /front-react
COPY . .
RUN npm install
COPY . .

RUN npm run build

FROM nginx:alpine3.19

RUN mkdir -p /etc/nginx/ssl

COPY certs/revuagencyapp_com_chain.crt /etc/nginx/ssl/revuagencyapp_com_chain.crt
COPY certs/revuagencyapp.key /etc/nginx/ssl/revuagencyapp.key

ADD nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /front-react/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
