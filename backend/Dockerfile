FROM node:14.7-alpine

ENV PORT=3000

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .
RUN npm run build

CMD ["npm", "run", "start:prod"]
EXPOSE 3000