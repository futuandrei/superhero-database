const mariadb = require("mariadb");
const queries = require("./databaseQueries");

const pool = mariadb.createPool({
    host: "localhost",
    user: "antony",
    password: "HEr65S8d",
    database: "superherodb",
    connectionLimit: 5
});

async function queryDatabase(query, params = []) {
    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query(query, params);
        return result;
    } catch (err) {
        console.error("Database Error: ", err);
        throw err;
    } finally {
        if (conn) conn.end();
    }
}

async function deleteAllHeroes() {
    await queryDatabase(queries.deleteAllHeroes);
    await queryDatabase(queries.resetAutoIncrement);
}

// Export CRUD functions
module.exports = {
    getAllHeroes: () => queryDatabase(queries.getAllHeroes),
    getHeroById: (id) => queryDatabase(queries.getHeroById, [id]),
    insertHero: (name, yearOfBirth, superproperty, gear) =>
        queryDatabase(queries.insertHero, [name, yearOfBirth, superproperty, gear]),
    updateHero: (id, name, yearOfBirth, superproperty, gear) =>
        queryDatabase(queries.updateHero, [name, yearOfBirth, superproperty, gear, id]),
    deleteHero: (id) => queryDatabase(queries.deleteHero, [id]),
    deleteAllHeroes: () => deleteAllHeroes(), // Ensure this function is exported

};