## ITE-Commerce

This project is an e-commerce platform with features such as listing products from a database and managing them dynamically from various endpoints, enabling full CRUD operations.

### Main view

![products list](client/public/page1.png)

### Cart list

![cart list](client/public/page2.png)

### Filter

![filter](client/public/page3.png)

### Products details

![filter](client/public/page5.png)

### Bill view

![bill](client/public/page4.png)

### Invoice example

![404](client/public/page6.png)

### Error 404

![404](client/public/page0.png)


# Base de Datos de E-commerce

This is the script to create the table products:

```sql
CREATE DATABASE e_comerce;

CREATE TABLE Products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    image_url VARCHAR(2048),
    public_id VARCHAR(255),
    category VARCHAR(255),
    stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Environment Variables Configuration

Create a `.env` file in the root of the project and complete the following fields:

```env
# Server

PORT=3000

# PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=
DB_DATABASE=

# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=