CREATE DATABASE crud_db;

CREATE TABLE staff(
    staff_id SERIAL PRIMARY KEY,
    name VARCHAR(20),
    designation VARCHAR(20)
);