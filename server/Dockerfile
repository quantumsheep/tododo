FROM node:12

WORKDIR /usr/src/app/server

COPY "package.json" .

RUN npm i

EXPOSE 3000
CMD [ "npm", "start" ]
