# My Store

# Package installation instructions.
run
`npm i` to install the dependencies

# Database Set up 
Connect to postgresql server and create a database called "mydatabase".

psql
postgres=# create database mydatabase;
postgres=# create user postgres with encrypted password 'admin';
postgres=# grant all privileges on mydatabase mydb to postgres;

then open .env file and edit the postgresql server login informations.
in the same file you can set port number and other environment variable.

after that from your terminal run to
```npm run db-migrate up```


# Database schema with column name and type.

CREATE TABLE users(
id serial primary key,
email varchar(255),
firstName varchar(255),
lastName varchar(255),
password varchar(255)
);

CREATE TABLE products(
id serial primary key,
name varchar(255),
price decimal(9),
category varchar(255)
);

CREATE TABLE orders(
id serial primary key,
quantity decimal(9),
id_product integer,
id_user integer,
status boolean default false,
foreign key(id_product) references products(id),
foreign key(id_user) references users(id)
);

CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    id_order INT NOT NULL,
    id_product INT NOT NULL,
    quantity INT NOT NULL,
    CONSTRAINT fk_orders
        FOREIGN KEY (id_order)
            REFERENCES orders(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
    CONSTRAINT fk_products
        FOREIGN KEY (id_product)
            REFERENCES products(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE
);

# Endpoints

API Documentation : https://documenter.getpostman.com/view/25165348/2s8ZDYWgw2

