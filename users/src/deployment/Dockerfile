FROM node:14.4.0

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install rimraf -g

RUN npm install typescript -g

RUN npm install nodemon -g

COPY . .

EXPOSE 9000

CMD ["nodemon", "/dist/index.js"]
