FROM node:8-alpine

WORKDIR /home/node/ffc/server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8081

CMD ["npm", "run", "live"]
