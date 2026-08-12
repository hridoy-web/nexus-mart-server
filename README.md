# 🛒 Nexus Mart — E-Commerce Backend API

A clean, scalable, and high-performance e-commerce backend engine built with Node.js, Express, TypeScript, PostgreSQL, and Prisma ORM.

[![Backend Live](https://img.shields.io/badge/Backend_Live-0284C7?style=for-the-badge&logo=vercel&logoColor=white)](https://nexus-mart-server.vercel.app)
[![Frontend Live](https://img.shields.io/badge/Frontend_Live-10B981?style=for-the-badge&logo=vercel&logoColor=white)](https://nexus-mart-frontend.vercel.app)
[![Client Repo](https://img.shields.io/badge/Client_Repo-6D28D9?style=for-the-badge&logo=github&logoColor=white)](https://github.com/hridoy-web/nexus-mart-frontend)
[![Server Repo](https://img.shields.io/badge/Server_Repo-1F2937?style=for-the-badge&logo=github&logoColor=white)](https://github.com/hridoy-web/nexus-mart-backend)

---

## 🛠️ Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Language:** TypeScript
* **Database:** PostgreSQL
* **ORM:** Prisma ORM
* **Authentication:** JWT (JSON Web Tokens)

---

## ⚡ Quick Start

Run these commands in your terminal to set up the server locally:

```bash
git clone https://github.com/hridoy-web/nexus-mart-backend.git
cd nexus-mart-backend
npm install
npx prisma migrate dev
npx prisma generate
npm run dev

```

---

## 📡 API Reference

Base Endpoint: `http://localhost:8000/api`

### 🔑 Authentication

#### Register User

`POST /auth/register` — Create a new user account

```json
{
  "name": "Hridoy Chowdhury",
  "email": "hridoy@example.com",
  "password": "securepassword123"
}

```

#### Login User

`POST /auth/login` — Authenticate and receive access token

```json
{
  "email": "hridoy@example.com",
  "password": "securepassword123"
}

```

---

### 🏷️ Categories

#### Create Category

`POST /categories` — Add a new product category

```json
{
  "name": "Electronics"
}

```

#### Get All Categories

`GET /categories` — Fetch all categories

#### Get Single Category

`GET /categories/:id` — Fetch category details

#### Update Category

`PATCH /categories/:id` — Modify an existing category

```json
{
  "name": "Gadgets & Electronics"
}

```

#### Delete Category

`DELETE /categories/:id` — Remove a category

---

### 📦 Products

#### Create Product

`POST /products` — Add a new item to inventory

```json
{
  "title": "Wireless Mouse",
  "description": "Ergonomic RGB Gaming Mouse",
  "price": 25.99,
  "stock": 50,
  "categoryId": "category-uuid",
  "userId": "user-uuid"
}

```

#### Get All Products

`GET /products?search=mouse` — Search and filter products

#### Get Single Product

`GET /products/:id` — Fetch product details with reviews

#### Update Product

`PATCH /products/:id` — Update product specs or inventory

```json
{
  "title": "Wireless Gaming Mouse",
  "price": 29.99,
  "stock": 45
}

```

#### Delete Product

`DELETE /products/:id` — Remove a product from inventory

---

### ⭐ Reviews

#### Add Review

`POST /reviews` — Submit feedback and rating

```json
{
  "rating": 5,
  "comment": "Exceeded my expectations, great product!",
  "productId": "product-uuid",
  "userId": "user-uuid"
}

```

#### Get Product Reviews

`GET /reviews/product/:productId` — Fetch reviews for a specific item

---

### 🛒 Cart

#### Add to Cart

`POST /cart` — Add item or increment quantity

```json
{
  "userId": "user-uuid",
  "productId": "product-uuid",
  "quantity": 2
}

```

#### Get User Cart

`GET /cart/user/:userId` — Fetch user's cart items

#### Remove Cart Item

`DELETE /cart/:id` — Delete item from cart

---

### 🛍️ Orders

#### Place Order

`POST /orders` — Checkout cart items via atomic transaction

```json
{
  "userId": "user-uuid",
  "totalAmount": 51.98
}

```

#### Get User Orders

`GET /orders/user/:userId` — Fetch user's order history
