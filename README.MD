Lista de Tareas Flask - Contenerizada con Docker

Este proyecto es una aplicación Flask para la gestión de tareas. La aplicación ha sido contenerizada con Docker y está disponible en Docker Hub.

Antes de comenzar, asegúrate de tener instalados los siguientes programas:
 - Docker
 - Docker Compose

Uso con Docker Hub:

La imagen de la aplicación está disponible en Docker Hub. Para ejecutar el contenedor directamente, usa el siguiente comando:
  docker run -d -p 5000:5000 aaronhenao/listatareas-flask

La aplicación estará disponible en: http://127.0.0.1:5000

Uso con Docker Compose:

Si deseas utilizar Docker Compose, sigue estos pasos:
  1. Clona este repositorio: git clone https://github.com/tu_usuario/listatareas-flask-app.git
    cd listatareas-flask-app
  2. Asegúrate de que el archivo docker-compose.yml está en la raíz del proyecto.
  3. Ejecuta el siguiente comando para levantar los servicios:
      docker-compose up -d
  4. La aplicación estará disponible en: http://127.0.0.1:5000




