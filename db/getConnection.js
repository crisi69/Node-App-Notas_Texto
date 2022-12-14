const mysql = require('mysql2/promise');

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB, UPLOADS_DIR } =
    process.env;

let pool;

const getConnection = async () => {
    try {
        if (!pool) {
            pool = mysql.createPool({
                connectionLimit: 10,
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASS,
                database: MYSQL_DB,
                uploads: UPLOADS_DIR,
                timezone: 'Z',
            });
        }

        return await pool.getConnection();
    } catch (err) {
        console.error(err);
        throw new Error('Error connecting to MySql');
    }
};

module.exports = getConnection;
