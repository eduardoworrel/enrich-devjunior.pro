FROM node:19

WORKDIR /app

COPY . .

RUN npm install
 
RUN npm run compile

CMD [ "node", "dist/server.js" ]