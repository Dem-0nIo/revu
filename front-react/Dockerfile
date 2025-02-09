FROM node:19-alpine AS build

WORKDIR /front-react
COPY . .
RUN npm install
COPY . .

RUN npm run build

FROM nginx:alpine3.19

ADD nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /front-react/build /usr/share/nginx/html
EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
