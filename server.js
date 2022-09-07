require('dotenv').config();

const express = require('express');
const morgan = require('morgan');

// Ponemos a nodemon a la escucha.
const { PORT } = process.env

const app = express();

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




// Registro de un nuevo usuario.
app.post('/users', newUser);

// Login de un usuario.
app.post('/users/login', loginUser);

/**
 * #####################
 * ## Endpoints Notes ##
 * #####################
 */

const newNote = require('./controllers/notes/newNote');
const listNotes = require('./controllers/notes/listNotes');
const getNote = require('./controllers/notes/getNote');
const editNote = require('./controllers/notes/editNote');
const categoryNote = require('./controllers/notes/categoryNote');
const deleteNote = require('./controllers/notes/deleteNote');

// Crear una nueva nota.
app.post('/notes', authUser, newNote);

// Listamos notas.
app.get('/notes', authUserOptional, listNotes);

// Información de una nota en concreto.
app.get('/notes/:idNote', authUserOptional, getNote);

// Categorizamos una nota.
app.post('/notes/:idNote/category', authUser, categoryNote);

// Editamos una nota.
app.put('/notes/:idNote', authUser, editNote);

// Eliminamos una nota.
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
