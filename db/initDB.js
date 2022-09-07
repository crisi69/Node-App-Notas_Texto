require('dotenv').config();

const getConnection = require('./getConnection');

const bcrypt = require('bcrypt');

async function main() {

    // Variable que almacenará una conexión libre con la db.
    let connection;

    try {
        connection = await getConnection();

        console.log('Borrando tablas...');


        await connection.query('DROP TABLE IF EXISTS categories');
        await connection.query('DROP TABLE IF EXISTS notes');
        await connection.query('DROP TABLE IF EXISTS users');
    
        console.log('Creando tablas...');
        

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
                title VARCHAR(60) UNIQUE NOT NULL,
                description TEXT NOT NULL,
                category ENUM ("Recetas") NOT NULL,
                idUser INT UNSIGNED NOT NULL,
                FOREIGN KEY (idUser) REFERENCES users (id),
                createdAt TIMESTAMP NOT NULL
            )
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS categories (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                title VARCHAR(50) NOT NULL,
                description VARCHAR(300) NOT NULL,
                createdAt TIMESTAMP NOT NULL
            )
        `);

        console.log('Tablas creadas');

        const hashedPassword = await bcrypt.hash('123456', 10);

        await connection.query(
            `
            INSERT INTO users (username, email, password, role, createdAt)
            VALUES ('admin', 'admin@admin.com', ?, 'admin', ?)
            `,
            [hashedPassword, new Date()]
        );

        console.log('Administrador creado');


        await connection.query(
            `
            INSERT INTO categories (title, description, createdAt)
            VALUES ('Recetas', 'Descripciones de platos caseros', ?)
            `,
            [new Date()] 
        )

        await connection.query(
            `
            INSERT INTO categories (title, description, createdAt)
            VALUES ('Viajes', 'Descripciones de viajes', ?)
            `,
            [new Date()] 
        )

        await connection.query(
            `
            INSERT INTO categories (title, description, createdAt)
            VALUES ('Restaurantes', 'Descripciones de establecimientos de comida', ?)
            `,
            [new Date()] 
        )

        await connection.query(
            `
            INSERT INTO categories (title, description, createdAt)
            VALUES ('Hoteles', 'Descripciones de establecimientos de hostelería', ?)
            `,
            [new Date()] 
        )

        await connection.query(
            `
            INSERT INTO categories (title, description, createdAt)
            VALUES ('Campings', 'Descripciones de recitos preparados para la acampada', ?)
            `,
            [new Date()] 
        )
    
        console.log('Categorías creadas');

    } catch (err) {
        console.error(err);
    } finally {
        if (connection) connection.release();
        process.exit();

    }
}

main();