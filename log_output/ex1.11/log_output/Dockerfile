FROM node:16-bullseye

WORKDIR /app

COPY . .

RUN npm ci

ENTRYPOINT ["node", "index.js"]
