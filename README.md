# Changuito-smart

## Ejecución

Levantar los servicios utilizando `docker-compose up`. En el presente documento se asume que el proyecto está en una carpeta con el nombre `changuito-smart`.

## Configuración

Se utiliza un archivo `.env` con las siguientes variables de configuración:

* `MONGO_USERNAME`: Usuario de la BD Mongo
* `MONGO_PASSWORD`: Password de la BD Mongo

## Scrapper

Para ejecutar el scrapper de sucursales ejecutar `node index.js` desde la carpeta `scrapper`

## Inspector de base de datos

Recomendamos usar mongo-express agregando la siguiente entrada a los servicios de docker-compose

```
  mongo-express:
    image: mongo-express
    restart: always
    ports:
      - 8081:8081
    environment:
      ME_CONFIG_MONGODB_ADMINUSERNAME: ${MONGO_USERNAME}
      ME_CONFIG_MONGODB_ADMINPASSWORD: ${MONGO_PASSWORD}
      ME_CONFIG_MONGODB_URL: mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@mongo:27017/
```

El usuario (changuito) y contraseña (smart) deben ser los mismos que los que se usan en la base de datos.

## Certificados de nginx

Instalar certbot

```
snap install certbot --classic
```

Ejecutar 
```
certbot certonly -a manual --config-dir=/tmp --work-dir=/tmp --logs-dir=/tmp
```

Se inicia el challenge donde debemos crear un archivo en el servidor

En el servidor *changuito-server* ejecutar

``` 
docker exec -it changuito-smart_frontend_1 bash
```

Ejecutar, reemplaando el texto y nombre de archivo:

```
mkdir -p /usr/share/nginx/html/.well-known/acme-challenge/
echo <texto del challenge> > /usr/share/nginx/html/.well-known/acme-challenge/<nombre archivo>
```

Copiar los archivos generados al servidor host

```
scp -r /tmp/live/changuito.mlafroce.ar changuito@changuito.mlafroce.ar:~/changuito-smart/ssl
```

## MongoDB remoto

ssh changuito@changuito-server -L 27017:172.19.0.2:27017
