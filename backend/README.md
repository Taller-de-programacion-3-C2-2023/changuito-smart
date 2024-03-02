docker build -f ./Dockerfile -t "changuito-smart:latest" .
docker run --network host changuito-smart:latest

docker volume create mongodbdata
docker pull mongo:latest
docker run -v mongodbdata:/data/db --network host --name=mongo-test -e MONGO_INITDB_ROOT_USERNAME=changuito -e MONGO_INITDB_ROOT_PASSWORD=smart mongo

pm2 start ecosystem.config.js & pm2 log

pm2 start dist/server.js --name "changuito-app" --watch
docker run -p 27017:27017 --name=mongo-test mongo:latest
docker run -it --network host -v mongodbdata:/data/db --rm mongo mongosh --host mongo-test changuito

Seteo pass del container y contra entro desde del compass conn string mongodb://changuito:smart@localhost:27017/
docker run -v mongodbdata:/data/db --network host --name=mongo-test -e MONGO_INITDB_ROOT_USERNAME=changuito -e MONGO_INITDB_ROOT_PASSWORD=smart mongo
mongoConfig mongodb://changuito:smart@mongo:27017/

back
pm2 start ecosystem.config.js & pm2 log

front
npm start
