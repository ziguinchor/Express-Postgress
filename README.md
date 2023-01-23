# My Store

# Package installation instructions.
run
`npm i` to install the dependencies

# Database Set up 
Connect to postgresql server and create a database called "mydatabase".
Using command line run the following SQL codes : 


DROP TABLE IF EXISTS "public"."migrations";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS migrations_id_seq;

-- Table Definition
CREATE TABLE "public"."migrations" (
    "id" int4 NOT NULL DEFAULT nextval('migrations_id_seq'::regclass),
    "name" varchar(255) NOT NULL,
    "run_on" timestamp NOT NULL,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."order_products";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS order_products_id_seq;

-- Table Definition
CREATE TABLE "public"."order_products" (
    "id" int4 NOT NULL DEFAULT nextval('order_products_id_seq'::regclass),
    "id_order" int4 NOT NULL,
    "id_product" int4 NOT NULL,
    "quantity" int4 NOT NULL,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."orders";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS orders_id_seq;

-- Table Definition
CREATE TABLE "public"."orders" (
    "id" int4 NOT NULL DEFAULT nextval('orders_id_seq'::regclass),
    "quantity" numeric(9,0),
    "id_product" int4,
    "id_user" int4,
    "status" bool DEFAULT false,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."products";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS products_id_seq;

-- Table Definition
CREATE TABLE "public"."products" (
    "id" int4 NOT NULL DEFAULT nextval('products_id_seq'::regclass),
    "name" varchar(255),
    "price" numeric(9,0),
    "category" varchar(255),
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."users";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS users_id_seq;

-- Table Definition
CREATE TABLE "public"."users" (
    "id" int4 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    "email" varchar(255),
    "firstname" varchar(255),
    "lastname" varchar(255),
    "password" varchar(255),
    PRIMARY KEY ("id")
);

ALTER TABLE "public"."order_products" ADD FOREIGN KEY ("id_product") REFERENCES "public"."products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."order_products" ADD FOREIGN KEY ("id_order") REFERENCES "public"."orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."orders" ADD FOREIGN KEY ("id_user") REFERENCES "public"."users"("id");
ALTER TABLE "public"."orders" ADD FOREIGN KEY ("id_product") REFERENCES "public"."products"("id");


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

# Endpoints

API Documentation : https://documenter.getpostman.com/view/25165348/2s8ZDYWgw2

