# APP NOTAS DE TEXTO

- Se trata de una aplicación dónde los usuarios pueden crear notas de texto privadas y ponerlas en categorías personalizadas.
- Cada nota tiene título, descripción, lugar y 1 foto.
- Cada nota se puede añadir en una carpeta personalizada de categoría única.

## BASE DE DATOS

- **Users**: id, email*, password*, username*, avatar, createdAt.
- **Notes**: id, title*, description*, idUser*, createdAt.
- **Entry photos**: id, name, idEntry, createdAt.

## ENDPOINTS DEL USUARIO ✅

- **POST** - [/users] - Crea un usuario. ✅
- **POST** - [/users/login] - Logea a un usuario retornando un token. ✅

## ENDPOINTS DE LAS NOTAS ✅

- **POST** - [/notes] - Crea una nota. Con token.✅
- **GET** - [/notes] - Retorna el listado de notas.✅
- **GET** - [/notes/:idNote] - Retorna una nota en concreto.✅
- **PUT** - [/notes/:idNote] - Edita una nota.
- **PUT** - [/notes/:idNote/category] - Categoriza una nota.
- **DELETE** - [/notes/:idNote] - Elimina una nota.

