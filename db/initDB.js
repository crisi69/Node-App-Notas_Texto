require('dotenv').config();

const getConnection = require('./getConnection');

const bcrypt = require('bcrypt');

async function main() {
    let connection;

    try {
        connection = await getConnection();

        await connection.query('DROP TABLE IF EXISTS notes');
        await connection.query('DROP TABLE IF EXISTS users');
    
        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                username VARCHAR(30) UNIQUE NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                role ENUM('admin', 'normal') DEFAULT 'normal',
                createdAt TIMESTAMP NOT NULL
            ) 
        `);
        await connection.query(`
            CREATE TABLE IF NOT EXISTS notes (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                idUser INT UNSIGNED NOT NULL,
                FOREIGN KEY (idUser) REFERENCES users (id),
                title VARCHAR(60) UNIQUE NOT NULL,
                description TEXT NOT NULL,
                category ENUM ('Rutas', 'Hoteles', 'Restaurantes', 'Campings') NOT NULL,
                createdAt TIMESTAMP NOT NULL
            )
        `);


        const hashedPassword = await bcrypt.hash('123456', 10);

        await connection.query(
            `
            INSERT INTO users (username, email, password, role, createdAt)
            VALUES ('admin', 'admin@admin.com', ?, 'admin', ?)
            `,
            [hashedPassword, new Date()]
        );
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) connection.release();
        process.exit();
    }
}

main();