FROM node:14.7-alpine

ENV PORT=80

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

CMD ["npm", "run", "start"]
EXPOSE 80

