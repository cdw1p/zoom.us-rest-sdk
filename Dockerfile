FROM node:12

RUN mkdir -p /home/node/zoomservices/node_modules && chown -R node:node /home/node/zoomservices

WORKDIR /home/node/zoomservices

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 8080

CMD [ "npm", "run-script", "start" ]