SELECT products.id, products.name, product_categories.name FROM `products` INNER JOIN `product_categories` ON products.category_id = product_categories.id
