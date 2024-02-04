# express-docker-playground

### Descripción
El proyecto express-docker-playground tiene como objetivo crear y gestionar dos instancias de una aplicación Node.js con Express utilizando Docker. La dinámica principal del proyecto consiste en el intercambio de solicitudes entre ambas instancias a intervalos regulares. Cuando una instancia recibe tres solicitudes, activará un manejo de errores que detendrá esa instancia. Posteriormente, se procederá a recrear la instancia detenida para mantener el flujo constante de la aplicación.

### Ejecución del proyecto
1. Construir y ejecutar los contenedores:
```bash
docker-compose up --build
```
1. Acceder a las instancias de la aplicación desde un navegador o herramienta como curl.

1. Podrás visualizar los logs en los directorios _./app1_ _./app2_ que se han creado.

1. Para finalizar la ejecución de los contenedores:
```bash
docker-compose down
```

### Guía de tests
Los tests se han implementado utilizando Jest, un framework de testing en JavaScript. También se utiliza supertest para realizar peticiones HTTP a la API. Ejecuta los tests con el siguiente comando:
````bash
npm test            #Ejecuta una vez todos los tests
npm test:watch      #Ejecuta en modo detección de cambios
npm test:watchAll   #Ejecuta en modo detección de cambios sin revisar git
````

### Ejecutar la aplicación en local
También es posible ejecutar la aplicación en local, para ello es necesario tener NodeJS instalado en su máquina. Será la misma aplicación la que se ataque a sí misma. Para ejecutar en local, ejecuta el siguiente comando
````bash
npm run start
````

### Funcionalidades
- Dockerización de la Aplicación: El proyecto se estructurará con Docker para facilitar la gestión y despliegue de las instancias de la aplicación.

- Comunicación entre Instancias: Se establecerá una comunicación periódica entre las dos instancias de la aplicación Node.js y Express. Cada vez que una instancia recibe una solicitud, se contará y, al llegar a tres, se desencadenará un manejo de errores para detener dicha instancia.

- Manejo de Errores y Reinicio Automático: Cuando una instancia alcanza el límite de solicitudes y se detiene, se implementará un mecanismo de reinicio automático para crear una nueva instancia y mantener la continuidad del servicio.

- Registro de Logs en Archivo: Se guardará el log de la consola de la aplicación en un archivo de logs. Esto proporcionará una experiencia práctica para aprender sobre el uso de volúmenes en Docker.

### Comunicación entre Contenedores Docker
El archivo _docker-compose.yml_ configura dos servicios (app1 y app2) que se comunican entre sí en una red personalizada llamada _battleNetwork_. Ambas instancias de la aplicación pueden alcanzarse utilizando el nombre del servicio. Asegúrate de que ambas instancias estén en la misma red y de que estén escuchando en los puertos correctos.

### Uso de Variables de Entorno
Cada instancia de la aplicación utiliza variables de entorno para configuración personalizada. Puedes ajustar estas variables en el archivo _.env_ en la raíz del proyecto.

Ejemplo de .env para app1:
````
NAME=app1
TARGETURL=app2
TARGETPORT=3002
````
Ejemplo de .env para app1:
````
NAME=app2
TARGETURL=app1
TARGETPORT=3001
````

### Guía de estilos
La guía de estilos configurada es [airbnb](https://github.com/airbnb/javascript) configurado mediante el inicializador de eslint. Para modificarlo puedes realizar lo siguiente:

1. Borra el archivo .eslintrc.json
2. Inicializa el asistente de eslint y modifica.
```bash
npx eslint --init
```

### Tests
Los tests se han realizado mediante Jest, un framework de testing en JavaScript con funciones para crear fácilmente pruebas unitarias, así como supertest para realizar las peticiones a la API