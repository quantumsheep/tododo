FROM node:12

# Client
WORKDIR /usr/src/app/client

COPY client .
RUN npm i
RUN npm run build

# Server
WORKDIR /usr/src/app/server

COPY server .
RUN npm i

EXPOSE 3000
CMD [ "npm", "start" ]
