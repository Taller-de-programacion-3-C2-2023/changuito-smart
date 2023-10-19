docker build -f ./Dockerfile -t "changuito-smart:latest" .
docker run --network host changuito-smart:latest

docker pull mongo:latest
docker run -p 27017:27017 --name=mongo-test mongo:latest
docker run -it --network host --rm mongo mongosh --host mongo-test changuito
docker run --network host --name=mongo-test -e MONGO_INITDB_ROOT_USERNAME=changuito -e MONGO_INITDB_ROOT_PASSWORD=smart mongo

pm2 start dist/server.js --name "changuito-app" --watch
pm2 start ecosystem.config.js
