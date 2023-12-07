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