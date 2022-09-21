require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');



// Ponemos a nodemon a la escucha.
const { PORT } = process.env

const app = express();
app.use(cors());

// Middleware que hace uso del logger "morgan".
app.use(morgan('dev'));

// Middleware que deserializa un body con formato "raw" y lo pone disponible en "req.body".
app.use(express.json());

/**
 *
 * #################
 * ## Middlewares ##
 * #################
 */

const authUser = require('./middlewares/authUser');
const authUserOptional = require('./middlewares/authUserOptional')


   
/**
 * ########################
 * ## Endpoints Usuarios ##
 * ########################
 */


// Creamos el registro de un usuario.
const newUser = require('./controllers/users/newUser');

// Creamos el loguin de un usuario.
const loginUser = require('./controllers/users/loginUser');

const getOwnUser = require('./controllers/users/getOwnUser');


// Registro de un nuevo usuario.
app.post('/users', newUser);

// Login de un usuario.
app.post('/users/login', loginUser);

//info ussuario logeado
app.get('/users', authUser, getOwnUser)

app.get('/users')


/**
 * #####################
 * ## Endpoints Notes ##
 * #####################
 */
// Creamos una nueva nota.
const newNote = require('./controllers/notes/newNote');

// Hacemos un listado de notas de un usuario.
const listNotes = require('./controllers/notes/listNotes');

// Seleccionamos una nota concreta.
const getNote = require('./controllers/notes/getNote');

// Editamos cualquier campo de una nota.
const editNote = require('./controllers/notes/editNote');

// Eliminamos una nota.
const deleteNote = require('./controllers/notes/deleteNote');


// Crear una nueva nota.
app.post('/notes', authUser, newNote);

// Listar las notas de un usuario.
app.get('/notes', authUser, listNotes);

// Información de una nota en concreto.
app.get('/notes/:idNote', authUserOptional, getNote);

// Editar una nota.
app.put('/notes/:idNote', authUser, editNote);

// Eliminar una nota.
app.delete('/notes/:idNote', authUser, deleteNote);

/**
 * ######################
 * ## Middleware Error ##
 * ######################
 */

app.use((err, req, res, next) => {
    console.error(err);

      res.status(err.statusCode || 500).send({
          status: 'error',
          message: err.message,
        });
    });

/**
 * ##########################
 * ## Middleware Not Found ##
 * ##########################
 */

app.use((req, res) => {
     res.status(404).send({
         status: 'error',
         message: 'Not found',
       });
    }); 

app.listen(PORT, () => {
    console.log('Server listening at http://localhost:4000');
});
