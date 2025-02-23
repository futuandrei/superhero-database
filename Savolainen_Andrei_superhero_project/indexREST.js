const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4000;

// Get all superheroes
app.get("/api/superheroes", async (req, res) => {
    try {
        const heroes = await db.getAllHeroes();
        res.json(heroes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get one superhero by ID
app.get("/api/superheroes/:id", async (req, res) => {
    try {
        const hero = await db.getHeroById(req.params.id);
        res.json(hero);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new superhero
app.post("/api/superheroes", async (req, res) => {
    const { name, yearOfBirth, superproperty, gear } = req.body;
    try {
        await db.insertHero(name, yearOfBirth, superproperty, gear);
        res.json({ message: "Hero added successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a superhero
app.put("/api/superheroes/:id", async (req, res) => {
    const heroID = req.params.id;
    const { name, yearOfBirth, superproperty, gear } = req.body;
    try {
        await db.updateHero(heroID, name, yearOfBirth, superproperty, gear);
        res.json({ message: "Hero updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a superhero
app.delete("/api/superheroes/:id", async (req, res) => {
    try {
        await db.deleteHero(req.params.id);
        res.json({ message: "Hero deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/", (req, res) => {
    res.send("Welcome to the Superhero REST API. Use /api/superheroes to get data.");
});

// Start the REST server
app.listen(PORT, () => {
    console.log(`REST API running on http://localhost:${PORT}`);
});