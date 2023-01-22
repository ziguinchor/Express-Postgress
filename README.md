# My Store

<<<<<<< HEAD

# Port number for db and server.

Check .env file to edit server and database settings such as PORT, DB name etc.

# Environment variables.git

Default PORT is 6000

# Package installation instructions.
run
`npm i` to install the dependencies

# Setup db and server instructions.

After editing the .env file with your database login info, run `npm run db-up` to initiate the migration.

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

# Endpoints

API Documentation : https://documenter.getpostman.com/view/25165348/2s8ZDYWgw2

=======

# Port number for db and server.

Check .env file to edit server and database settings such as PORT, DB name etc.

# Environment variables.

Default PORT is 6000

# Package installation instructions.

run
`npm i` to install the dependencies

# Setup db and server instructions.

After editing the .env file with your database login info, run `npm run db-up` to initiate the migration.

# Database schema with column name and type.

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
    foreign  key(id_user) references users(id)
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

> > > > > > > 068b52f (add markdown file)
