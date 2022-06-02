# Next.js OpenJira App
para correr localmente se necesita la base de datos

```
docker-compose up -d
```

* el -d, significa __detached__

* MongoDB URL Local:
```
mongodb://localhost:27017
```

## configurar las variables de entorno 
Renombrar el archivo __.env.templete__ a __.env__

## llenar la base de datos con la información de pruebas

llamar a :
```
http://localhost:3000/api/seed
```