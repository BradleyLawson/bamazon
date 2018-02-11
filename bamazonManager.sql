-- 1. Create a MySQL Database called bamazon
DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

-- 2. Create a Table called products
CREATE TABLE products(
	id INTEGER(11) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(30) NOT NULL,
	department_name VARCHAR(30),
	price DECIMAL(10, 2) NOT NULL,
	stock_quantity INTEGER(10) NOT NULL,
	PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("bicycle ", "sporting goods", 250.48, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("skate board", "sporting goods", 150.75, 275);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("helmet", "sporting goods", 55.67, 75);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("gloves", "sporting goods", 19.75, 203);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("bicycle tires", "sporting goods", 10.50, 38);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("skateboard wheels", "sporting goods", 12.89, 403);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("trucks", "sporting goods", 35.27, 17);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("chain", "sporting goods", 17.56, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("elbow pads", "sporting goods", 27.50, 104);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("knee pads", "sporting goods", 33.89, 93);
	-- Columns
		-- item_id (unique id for each product)
		-- product_name (Name of product)
		-- department_name
		-- price (cost to customer)
		-- stock_quantity (how much of the product is available in stores)
-- 3.  Rows	