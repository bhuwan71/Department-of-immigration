FROM node:18.16.0
WORKDIR /usr/src/app/frontend 
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 2002
CMD [ "npm","run","dev" ]