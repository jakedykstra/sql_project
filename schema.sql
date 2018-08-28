DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_name VARCHAR(30) NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NOT NULL,
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("laptop", "electronics", 1200.40, 4), ("cellphone", "electronics", 800.00, 96), ("car", "auto", 11999.99, 20), ("pillow", "home", 10.80, 16), ("laptop", "electronics", 1200.40, 4) ,("laptop", "electronics", 1200.40, 4) ,("laptop", "electronics", 1200.40, 4) ,("laptop", "electronics", 1200.40, 4), ("laptop", "electronics", 1200.40, 4);


SELECT * FROM products;
