FROM node:16.14.0
WORKDIR /usr/src/app/bot
COPY package*.json ./
RUN npm ci
EXPOSE 8082
CMD [ "npm", "run", "dev" ]