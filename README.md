# Nexus Mart - E-Commerce Backend API

A RESTful backend service for an e-commerce platform built with Node.js, Express.js, TypeScript, PostgreSQL, and Prisma ORM.

---

## 🛠️ Prerequisites & Local Setup

Run the following commands sequentially to clone the repository, install dependencies, configure environment variables, run migrations, and start the development server:

    git clone https://github.com/hridoy-web/nexus-mart-backend.git
    cd nexus-mart-backend
    npm install

    .env (Setup)
    PORT=8000
    DATABASE_URL="postgresql://postgres:password@localhost:5432/nexus_mart_db?schema=public"
    JWT_SECRET="your_jwt_secret_key"
    EOT

    npx prisma migrate dev
    npx prisma generate
    npm run dev

---

## 📡 Standard API Response Structure

All API endpoints return responses adhering to a unified schema:

* Success Response Schema:

    {
      "success": true,
      "message": "Action completed successfully",
      "data": {}
    }

* Error Response Schema:

    {
      "success": false,
      "message": "Detailed error description",
      "errorDetails": {}
    }

---

## 📚 API Specification

Base URL: http://localhost:8000/api

---

### 🔑 1. Authentication Module

* POST http://localhost:8000/api/auth/register — Register a new user account

    {
      "name": "Hridoy Chowdhury",
      "email": "hridoy@example.com",
      "password": "securepassword123"
    }

* POST http://localhost:8000/api/auth/login — Authenticate user credentials and return JWT access token

    {
      "email": "hridoy@example.com",
      "password": "securepassword123"
    }

---

### 🏷️ 2. Category Module

* POST http://localhost:8000/api/categories — Create a new product category

    {
      "name": "Electronics"
    }

* GET http://localhost:8000/api/categories — Retrieve all product categories

* GET http://localhost:8000/api/categories/:id — Retrieve a single category by ID

* PATCH http://localhost:8000/api/categories/:id — Update a category by ID

    {
      "name": "Updated Category Name"
    }

* DELETE http://localhost:8000/api/categories/:id — Delete a category by ID

---

### 📦 3. Product Module

* POST http://localhost:8000/api/products — Create a new product entry

    {
      "title": "Wireless Mouse",
      "description": "Ergonomic RGB Mouse",
      "price": 25.99,
      "stock": 50,
      "categoryId": "category-uuid",
      "userId": "user-uuid"
    }

* GET http://localhost:8000/api/products — Fetch all products with optional search query (?search=mouse)

* GET http://localhost:8000/api/products/:id — Fetch detailed information for a specific product

* PATCH http://localhost:8000/api/products/:id — Update product details

    {
      "title": "Updated Mouse Title",
      "price": 29.99
    }

* DELETE http://localhost:8000/api/products/:id — Remove a product entry from the database

---

### ⭐ 4. Review Module

* POST http://localhost:8000/api/reviews — Submit rating and feedback for a product

    {
      "rating": 5,
      "comment": "Good build quality",
      "productId": "product-uuid",
      "userId": "user-uuid"
    }

* GET http://localhost:8000/api/reviews/product/:productId — Fetch all reviews for a specific product

---

### 🛒 5. Cart Module

* POST http://localhost:8000/api/cart — Add item to cart or increment quantity if already exists

    {
      "userId": "user-uuid",
      "productId": "product-uuid",
      "quantity": 2
    }

* GET http://localhost:8000/api/cart/user/:userId — Retrieve all active cart items for a specific user

* DELETE http://localhost:8000/api/cart/:id — Remove a specific item from the cart

---

### 🛍️ 6. Order Module

* POST http://localhost:8000/api/orders — Convert active cart items into an order using database transactions

    {
      "userId": "user-uuid",
      "totalAmount": 51.98
    }

* GET http://localhost:8000/api/orders/user/:userId — Retrieve complete order history for a specific user
