# Steps

## Step 1: Set Up the Project Folder

### 1. Create project folder

```shell
mkdir Savolainen_Andrei_superhero_project
cd Savolainen_Andrei_superhero_project
```

### 2. Initialize a new Node.js project:

`npm init -y`

This creates a package.json file.

### 3. Install dependencies:

`npm install express cors mariadb node-fetch`

    •	express: For creating REST API.
    •	cors: To allow cross-origin requests.
    •	mariadb: To interact with MariaDB.
    •	node-fetch: To make HTTP requests (useful in SPA).

## Step 2: Create Database Statements

### 1. Inside your project folder, create a new file:

`Savolainen_Andrei_superhero_createStatements.sql`

### 2. Add SQL statements for database creation, table creation, user creation, and test inserts:

```sql
-- Create the database
CREATE DATABASE superherodb;

-- Use the database
USE superherodb;

-- Create the superhero table
CREATE TABLE superhero (
    heroID INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(15) NOT NULL,
    yearOfBirth INT NOT NULL,
    superproperty VARCHAR(23) NOT NULL,
    gear VARCHAR(15) NOT NULL
);

-- Insert test data
INSERT INTO superhero (name, yearOfBirth, superproperty, gear) VALUES
('Superman', 1938, 'Flight', 'Cape'),
('Batman', 1939, 'Genius', 'Utility Belt');

-- Create a user for database access
CREATE USER 'antony'@'localhost' IDENTIFIED BY 'HEr65S8d';
GRANT ALL PRIVILEGES ON superherodb.* TO 'antony'@'localhost';
FLUSH PRIVILEGES;
```

## Step 3: Create the Database

### 1. Open MariaDB CLI or a database GUI (like TablePlus or DBeaver).

### 2. Run the SQL script:

`mariadb -u root -p < Savolainen_Andrei_superhero_createStatements.sql`

## Step 4: Create SQL Queries

Inside your project folder, create a new file:
📄 databaseQueries.js

```js
module.exports = {
  getAllHeroes: "SELECT * FROM superhero;",
  getHeroById: "SELECT * FROM superhero WHERE heroID = ?;",
  insertHero:
    "INSERT INTO superhero (name, yearOfBirth, superproperty, gear) VALUES (?, ?, ?, ?);",
  updateHero:
    "UPDATE superhero SET name = ?, yearOfBirth = ?, superproperty = ?, gear = ? WHERE heroID = ?;",
  deleteHero: "DELETE FROM superhero WHERE heroID = ?;",
};
```

## Step 5: Create Data Access Layer

Inside your project folder, create a new file:
📄 database.js

```js
const mariadb = require("mariadb");
const queries = require("./databaseQueries");

const pool = mariadb.createPool({
  host: "localhost",
  user: "antony",
  password: "HEr65S8d",
  database: "superherodb",
  connectionLimit: 5,
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

// Export CRUD functions
module.exports = {
  getAllHeroes: () => queryDatabase(queries.getAllHeroes),
  getHeroById: (id) => queryDatabase(queries.getHeroById, [id]),
  insertHero: (name, yearOfBirth, superproperty, gear) =>
    queryDatabase(queries.insertHero, [name, yearOfBirth, superproperty, gear]),
  updateHero: (id, name, yearOfBirth, superproperty, gear) =>
    queryDatabase(queries.updateHero, [
      name,
      yearOfBirth,
      superproperty,
      gear,
      id,
    ]),
  deleteHero: (id) => queryDatabase(queries.deleteHero, [id]),
};
```

## Step 5: Create Data Access Layer

Inside your project folder, create a new file:
📄 database.js

```js
const mariadb = require("mariadb");
const queries = require("./databaseQueries");

const pool = mariadb.createPool({
  host: "localhost",
  user: "antony",
  password: "HEr65S8d",
  database: "superherodb",
  connectionLimit: 5,
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

// Export CRUD functions
module.exports = {
  getAllHeroes: () => queryDatabase(queries.getAllHeroes),
  getHeroById: (id) => queryDatabase(queries.getHeroById, [id]),
  insertHero: (name, yearOfBirth, superproperty, gear) =>
    queryDatabase(queries.insertHero, [name, yearOfBirth, superproperty, gear]),
  updateHero: (id, name, yearOfBirth, superproperty, gear) =>
    queryDatabase(queries.updateHero, [
      name,
      yearOfBirth,
      superproperty,
      gear,
      id,
    ]),
  deleteHero: (id) => queryDatabase(queries.deleteHero, [id]),
};
```

## Step 6: Create the REST API Server

Create 📄 indexREST.js

```js
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
app.put("/api/superheroes", async (req, res) => {
  const { heroID, name, yearOfBirth, superproperty, gear } = req.body;
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

// Start the REST server
app.listen(PORT, () => {
  console.log(`REST API running on http://localhost:${PORT}`);
});
```

## Step 7: Create the SPA

📂 Create a folder public
Inside, create 📄 index.html, script.js, and styles.css.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Superhero Database</title>
    <script defer src="script.js"></script>
  </head>
  <body>
    <h1>Superhero Database</h1>
    <button onclick="fetchHeroes()">Load Superheroes</button>
    <div id="hero-list"></div>
  </body>
</html>
```

```js
async function fetchHeroes() {
  const response = await fetch("http://localhost:4000/api/superheroes");
  const data = await response.json();
  document.getElementById("hero-list").innerHTML = JSON.stringify(
    data,
    null,
    2
  );
}
```

## Step 8: Create the SPA Server

Create 📄 indexSPA.js:

```js
const express = require("express");
const app = express();

app.use(express.static("public"));

app.listen(3000, () => {
  console.log("SPA Server running on http://localhost:3000");
});
```

## Step 9: Running the Project

1. Start the REST API:

`node indexREST.js`

2. Start the SPA server:

`node indexSPA.js`

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

## Starting REST API 🟠

- Problem with access of MariaDB. Enterered with password "Andreidb" from previous databases project.

## Starting indexSPA ✅

## Maria DB

### Execute SQL file ... use

1. Open MariaDB CLI: `mariadb -u root -p`
2. Select the database: `USE superherodb;`
3. Check if data exists: `SELECT * FROM superhero;`
4. Drop if exists `drop database if exists superherodb;`
5. Create: `create database superherodb;`
6. Use database: `use superherodb;`

### Execute SQL file ... create table and insert data

### Create user with DB access

`CREATE USER 'antony'@'localhost' IDENTIFIED BY 'HEr65S8d';`
