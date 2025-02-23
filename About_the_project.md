```ASCII
+----------------------------+
|       Single Page App      |
|  (HTML, CSS, JavaScript)   |
|  Runs on localhost:3000    |
+------------+---------------+
             |
             | Fetch API Calls (GET, POST, PUT, DELETE)
             v
+----------------------------+
|        REST API Server     |
|        (Express.js)        |
|  Runs on localhost:4000    |
+------------+---------------+
             |
             | Queries Database (MariaDB)
             v
+----------------------------+
|      Database Layer        |
|        (MariaDB)           |
|  Database: superherodb     |
|  Table: superhero          |
|  Columns:                  |
|    - heroID (PK)           |
|    - name                  |
|    - yearOfBirth           |
|    - superproperty         |
|    - gear                  |
+----------------------------+
```

How it works

1. The Single Page App (SPA) is served by indexSPA.js on localhost:3000.
2. The SPA makes API calls to the REST API (Express.js) running on localhost:4000.
3. The REST API retrieves data from or updates the MariaDB database (superherodb).
4. The Database Layer handles storing and retrieving superhero data.
5. Data flows back up to the REST API, which then returns JSON data to the SPA.
