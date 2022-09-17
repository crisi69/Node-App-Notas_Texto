# APP NOTAS DE TEXTO

- Se trata de una aplicación dónde los usuarios pueden crear notas de texto y categorizarlas.
- Cada nota tiene título, descripción y una categoría.

## BASE DE DATOS

- **Users**: id, email, password, username, createdAt.
- **Notes**: id, title, description, category, idUser, createdAt.

## ENDPOINTS DEL USUARIO 

- **POST** - [/users] - Crea un usuario. 
- **POST** - [/users/login] - Logea a un usuario retornando un token. 

## ENDPOINTS DE LAS NOTAS 

- **POST** - [/notes] - Crea una nota. Con token.
- **GET** - [/notes] - Retorna el listado de notas de un usuario. Con token.
- **GET** - [/notes/:idNote] - Retorna una nota en concreto. 
- **PUT** - [/notes/:idNote] - Edita una nota. Con token.
- **DELETE** - [/notes/:idNote] - Elimina una nota. Con token.# app-notas-de-texto
