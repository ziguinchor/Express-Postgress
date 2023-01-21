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