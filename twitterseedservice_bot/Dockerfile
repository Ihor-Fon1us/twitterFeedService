FROM node:16.14.0
WORKDIR /usr/src/bot/
COPY . ./
RUN npm ci
EXPOSE 8082
CMD [ "npm", "run", "start" ]