    FROM node:alpine
    WORKDIR /changuito-smart
    COPY . .
    RUN npm install
    RUN npm run build
    CMD ["node", "./dist/server.js"]