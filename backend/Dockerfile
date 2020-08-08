FROM node:14.7-alpine

ENV PORT=3000
ENV PATH /app/node_modules/.bin:$PATH

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

CMD ["npm", "run", "start"]
EXPOSE 3000