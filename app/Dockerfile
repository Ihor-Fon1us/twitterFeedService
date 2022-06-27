FROM node:16.14.0
WORKDIR /usr/src/app/
COPY package*.json ./
RUN npm ci
EXPOSE 8080
CMD [ "npm", "run", "start" ]