# build step
FROM node:18-alpine as build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . ./
RUN npm run build

# release step
FROM nginx
COPY --from=build /app/build /usr/share/nginx/html/
COPY nginx.api.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]