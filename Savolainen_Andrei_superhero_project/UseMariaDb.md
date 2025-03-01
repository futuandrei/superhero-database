# Use MariaDb

Login to mariaDb: `mysql -u root -p` or `mysql -u antony -p`
Exit mariaDb: `exit`

Start: `brew services start mariadb`

Show available databases: `SHOW DATABASES;`
Show users: `SELECT User, Host FROM mysql.user;`
Login as antony: `mysql -u antony -p`
Check... `SELECT User, Host, authentication_string FROM mysql.user WHERE User = 'antony';`
Reset passwrod for antony: `ALTER USER 'antony'@'localhost' IDENTIFIED WITH mysql_native_password BY 'HEr65S8d';`
`FLUSH PRIVILEGES;`

Creating table:

```sql
CREATE TABLE superhero (
    heroID INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(15) NOT NULL,
    yearOfBirth INT NOT NULL,
    superproperty VARCHAR(23) NOT NULL,
    gear VARCHAR(15) NOT NULL
);
```

showing table: `SHOW TABLES;` ->

```zsh
+-----------------------+
| Tables_in_superherodb |
+-----------------------+
| superhero             |
+-----------------------+
1 row in set (0.001 sec)
```

View the structure of table: `DESCRIBE superhero;`

```zsh
+---------------+-------------+------+-----+---------+----------------+
| Field         | Type        | Null | Key | Default | Extra          |
+---------------+-------------+------+-----+---------+----------------+
| heroID        | int(11)     | NO   | PRI | NULL    | auto_increment |
| name          | varchar(15) | NO   |     | NULL    |                |
| yearOfBirth   | int(11)     | NO   |     | NULL    |                |
| superproperty | varchar(23) | NO   |     | NULL    |                |
| gear          | varchar(15) | NO   |     | NULL    |                |
+---------------+-------------+------+-----+---------+----------------+
5 rows in set (0.018 sec)
```

Show all superheroes: `SELECT * FROM superhero;`
