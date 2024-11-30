FROM node:22.9.0-alpine3.20
WORKDIR /docker-compose/client
COPY package.json .
RUN npm install 
COPY . .
EXPOSE 5173 
CMD [ "npm", "run", "dev" ]