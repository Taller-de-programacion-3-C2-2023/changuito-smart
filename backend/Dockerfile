FROM node:alpine
RUN npm install pm2 -g
WORKDIR /changuito-smart
COPY . .
RUN npm install && npm run build
CMD [ "pm2-runtime", "npm", "--", "start" ]