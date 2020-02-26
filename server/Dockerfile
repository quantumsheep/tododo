FROM node:12

WORKDIR /usr/src/app/server

COPY "package.json" .

RUN npm i
RUN npm rebuild

EXPOSE 3000
CMD [ "npm", "start" ]
