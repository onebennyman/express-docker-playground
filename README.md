# express-docker-playground

### Descripción
El proyecto express-docker-playground tiene como objetivo crear y gestionar dos instancias de una aplicación Node.js con Express utilizando Docker. La dinámica principal del proyecto consiste en el intercambio de solicitudes entre ambas instancias a intervalos regulares. Cuando una instancia recibe tres solicitudes, activará un manejo de errores que detendrá esa instancia. Posteriormente, se procederá a recrear la instancia detenida para mantener el flujo constante de la aplicación.

### Funcionalidades
- Dockerización de la Aplicación: El proyecto se estructurará con Docker para facilitar la gestión y despliegue de las instancias de la aplicación.

- Comunicación entre Instancias: Se establecerá una comunicación periódica entre las dos instancias de la aplicación Node.js y Express. Cada vez que una instancia recibe una solicitud, se contará y, al llegar a tres, se desencadenará un manejo de errores para detener dicha instancia.

- Manejo de Errores y Reinicio Automático: Cuando una instancia alcanza el límite de solicitudes y se detiene, se implementará un mecanismo de reinicio automático para crear una nueva instancia y mantener la continuidad del servicio.

- Registro de Logs en Archivo: Se guardará el log de la consola de la aplicación en un archivo de logs. Esto proporcionará una experiencia práctica para aprender sobre el uso de volúmenes en Docker.

### Guía de estilos
La guía de estilos configurada es [airbnb](https://github.com/airbnb/javascript) configurado mediante el inicializador de eslint. Para modificarlo puedes realizar lo siguiente:

1. Borra el archivo .eslintrc.json
2. Inicializa el asistente de eslint y modifica.
```bash
npx eslint --init
```

### Tests
Los tests se han realizado mediante Jest, un framework de testing en JavaScript con funciones para crear fácilmente pruebas unitarias, así como supertest para realizar las peticiones a la API