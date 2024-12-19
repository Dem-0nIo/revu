FROM node:19-alpine as build

WORKDIR /front-react
COPY . .
RUN npm install
COPY . .

RUN npm run build

FROM nginx:alpine3.19

ADD nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /front-react/build /usr/share/nginx/html
EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]