FROM node:19

WORKDIR /back-node
COPY package.json ./
RUN npm install

EXPOSE 8081

COPY . .
CMD npm start