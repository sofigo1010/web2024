# Nombre del Proyecto: API de Vlog

## Descripción

Este proyecto es una API REST para un sistema de vlog construido con Express y MySQL. Permite a los usuarios realizar operaciones CRUD (Crear, Leer, Actualizar, Borrar) sobre vlogs y publicaciones asociadas. Diseñada para ser simple pero escalable, esta API puede ser utilizada para alimentar aplicaciones de vlogging o como backend para aplicaciones móviles relacionadas con vlogs.

## Características

- Gestión de vlogs: Crear, leer, actualizar y borrar vlogs.
- Gestión de publicaciones: Crear, leer, actualizar y borrar publicaciones en vlogs.
- Soporte para imágenes en base64 para banners de vlogs.
- Validación de datos de entrada para garantizar la integridad de la información.

## Tecnologías Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](http://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

## Instalación

Asegúrate de tener Node.js y MySQL instalados en tu sistema antes de comenzar.

1. Clona este repositorio:
git clone https://lab6.git
cd ruta-al-proyecto
Instala las dependencias:
npm install
Inicia el servidor:
npm start
Uso de la API
Endpoints
GET /posts - Lista todos los vlogs.
POST /posts - Crea un nuevo vlog.
GET /posts/:id - Obtiene detalles de un vlog específico.
PUT /posts/:id - Actualiza un vlog existente.
DELETE /posts/:id - Elimina un vlog.

Ejemplos de Uso
Crear una publicación:

POST /posts
Content-Type: application/json

{
  "title": "Mi primer post",
  "content": "Este es el contenido de mi primer post.",
  "picture": "data:image/png;base64,..."
}
Validaciones
Se realiza una validación en las rutas POST y PUT para asegurar que los títulos, contenidos no estén vacíos y que el tamaño de las imágenes no exceda 1MB.
