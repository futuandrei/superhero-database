# Savolainen_Andrei Superhero Project

This project is a **full-stack superhero management system** built with **Node.js, Express, MariaDB, and a frontend using JavaScript & HTML**. It allows users to **create, read, update, and delete superheroes** via a REST API and a **Single Page Application (SPA)**.

## Features

- **Superhero CRUD operations** (Create, Read, Update, Delete)
- **RESTful API** using `Express.js`
- **Database** powered by `MariaDB`
- **Frontend** for interacting with superheroes
- **Fully typed with TypeScript**
- **Uses `nodemon` for live server reload**
- **Routes structured with Express Router**

## 🛠 Setup & Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/superhero-project.git
cd superhero-project
```

### 2️⃣ Install Dependencies

`npm install`

### 3️⃣ Setup MariaDB Database

`mariadb --version`

`brew install mariadb`

`mysql -u root -p`

Run the following SQL commands:

```sql
CREATE DATABASE superherodb;
CREATE USER 'antony'@'localhost' IDENTIFIED BY 'HEr65S8d';
GRANT ALL PRIVILEGES ON superherodb.* TO 'antony'@'localhost';
FLUSH PRIVILEGES;
```

Execute database schema
`mysql -u antony -p superherodb < Savolainen_Andrei_superhero_createStatements.sql`

## 🖥 Running the Project

1️⃣ Start the REST API
`node indexREST.js`

2️⃣ Start the Frontend (SPA)
`node indexSPA.js`

## 🌐 Frontend

• The frontend consists of an SPA (Single Page Application) to interact with the API.
• Features:
• Add a superhero
• Update superhero details
• Delete superheroes
• Filter superheroes by name, ID, or abilities
• Responsive and accessible UI

📌 How to Use 1. Open http://localhost:3000 2. Navigate between Add Superhero and Update Superhero tabs. 3. Perform CRUD operations on superheroes.
