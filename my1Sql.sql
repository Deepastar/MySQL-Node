CREATE DATABASE animals_db;

USE animals_db;

CREATE TABLE pets (
owner VARCHAR(30) NOT NULL,
has_pet BOOLEAN NOT NULL,
pet_name VARCHAR(30),
pet_age INTEGER(10));		

INSERT INTO pets (owner, has_pet,pet_name,pet_age)

VALUES	 ("Carolina", TRUE, "Brody", 99);

INSERT INTO pets (owner, has_pet)

VALUES ("Tereza", FALSE);


UPDATE pets
SET has_pet=TRUE
WHERE owner="Tereza";

SELECT * FROM animals_db;