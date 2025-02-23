module.exports = {
    getAllHeroes: "SELECT * FROM superhero;",
    getHeroById: "SELECT * FROM superhero WHERE heroID = ?;",
    insertHero: "INSERT INTO superhero (name, yearOfBirth, superproperty, gear) VALUES (?, ?, ?, ?);",
    updateHero: "UPDATE superhero SET name = ?, yearOfBirth = ?, superproperty = ?, gear = ? WHERE heroID = ?;",
    deleteHero: "DELETE FROM superhero WHERE heroID = ?;"
};