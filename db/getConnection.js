const mysql = require('mysql2/promise');

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = process.env;

// Creamos una variable que almacenará un listado de conexiones (pool).
let pool;

// Crear una función que devuelve una conexión libre.
const getConnection = async () => {
    try {
        // Si no hay un pool de conexiones, lo creamos.
        if (!pool) {
            pool = mysql.createPool({
                connectionLimit: 10,
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASS,
                database: MYSQL_DB,
                timezone: 'Z',
            });
        }

        // Retornar una conexión libre.
        return await pool.getConnection();

    } catch (err) {
        console.error(err);
        throw new Error ('Error al conectar con MySql');
        
    }
};

module.exports = getConnection;