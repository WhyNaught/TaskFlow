FROM node:22.9.0-alpine3.20
WORKDIR /docker-compose/server
COPY package.json .
RUN npm install 
COPY . .
EXPOSE 3000 
CMD ["npm", "run", "dev"]