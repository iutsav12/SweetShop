# 🍬 Sweet Shop Management System

A full-stack Sweet Shop Management System that allows users to browse, search, and purchase sweets, while admins can manage inventory and sweet details. This project demonstrates RESTful API design, authentication, database integration, and a modern SPA frontend.

---

## 🚀 Tech Stack

### Backend
- **Node.js** + **TypeScript**
- **Next.js Route Handlers** (API layer)
- **MongoDB** (with Mongoose)
- **JWT** for authentication
- **BCrypt** for password hashing

### Frontend
- **Next.js** (React)
- **Tailwind CSS** for styling
- **Axios / fetch** for API calls

---

## 📦 Core Features

- 🔐 **User Authentication**
  - User registration and login
  - JWT-based authentication
  - Protected routes for logged-in users

- 🍭 **Sweet Management**
  - Each sweet has: `id`, `name`, `category`, `price`, `quantity`
  - List all sweets
  - Search & filter sweets (by name, category, price range)
  - Admin-only CRUD operations

- 📉 **Inventory Management**
  - Purchase sweet → decreases quantity
  - Restock sweet → increases quantity (Admin only)
  - Purchase button disabled if quantity is `0`

- 🧑‍💻 **Role-Based Access**
  - Normal users: can view & purchase sweets
  - Admin users: can add, update, delete, and restock sweets

---

## 📡 API Endpoints

### Auth (Public)

- `POST /api/auth/register`  
  Register a new user.

- `POST /api/auth/login`  
  Login user and return a JWT token.

---

### Sweets (Protected)

- `POST /api/sweets`  
  Add a new sweet. **(Admin only)**

- `GET /api/sweets`  
  Get a list of all available sweets.

- `GET /api/sweets/search?name=&category=&minPrice=&maxPrice=`  
  Search sweets by:
  - name (partial match)
  - category
  - price range (`minPrice`, `maxPrice`)

- `PUT /api/sweets/:id`  
  Update an existing sweet. **(Admin only)**

- `DELETE /api/sweets/:id`  
  Delete a sweet. **(Admin only)**

---

### Inventory (Protected)

- `POST /api/sweets/:id/purchase`  
  Purchase a sweet. Decreases its `quantity` by 1 (or specified amount).

- `POST /api/sweets/:id/restock`  
  Restock a sweet. Increases its `quantity`. **(Admin only)**

---

## 🖥️ Frontend Functionality

- ✅ User registration & login forms
- ✅ Dashboard page showing all sweets
- ✅ Search & filter sweets (by name/category/price)
- ✅ “Purchase” button:
  - Disabled when quantity = 0
  - On success, updates quantity
- ✅ Admin UI:
  - Add new sweet
  - Edit sweet details
  - Delete sweet
  - Restock inventory

---

# 🍬 Sweet Shop Management System

A full-stack Sweet Shop Management System that allows users to browse, search, and purchase sweets, while admins can manage inventory and stock. This project is built as part of a kata to practice API development, database integration, frontend SPA, testing, and AI-assisted workflows.

---

## 🚀 Tech Stack

### Backend
- Node.js + TypeScript
- Express / Next.js Route Handlers (API layer)
- MongoDB with Mongoose
- JWT for authentication & authorization
- Bcrypt for password hashing

### Frontend
- Next.js (React)
- Tailwind CSS for responsive UI
- Fetch / Axios for API calls

### Database
- MongoDB (Not in-memory, persistent storage)

---
---

## 🔑 Default Login Credentials

For testing the application, you can use the following accounts:

### 👤 Normal User
- Email: `user@gmail.com`
- Password: `user`

### 🛠️ Admin User
- Email: `utsav@gmail.com`
- Password: `utsav`

These accounts may be auto-generated using the seed script or can be added manually via database before running the project.

## 🧩 Core Requirements Mapping

### 1. Backend API (RESTful)

**Auth:**
- `POST /api/auth/register` – User registration
- `POST /api/auth/login` – User login, returns JWT

**Sweets (Protected):**
- `POST /api/sweets` – Add a new sweet (Admin only)
- `GET /api/sweets` – Get list of all sweets
- `GET /api/sweets/search` – Search sweets by name, category, or price range
- `PUT /api/sweets/:id` – Update sweet details (Admin only)
- `DELETE /api/sweets/:id` – Delete a sweet (Admin only)

**Inventory (Protected):**
- `POST /api/sweets/:id/purchase` – Purchase a sweet (decrease quantity)
- `POST /api/sweets/:id/restock` – Restock a sweet (increase quantity, Admin only)

Each sweet has:
- `id` (unique)
- `name`
- `category`
- `price`
- `quantity` (in stock)

---

### 2. Frontend Application (SPA)

- Built using **Next.js (React)**.
- Single-page experience with:
  - User registration and login forms
  - Dashboard to display all sweets
  - Search and filter sweets
  - “Purchase” button on each sweet  
    - Disabled if quantity is `0`
  - Admin UI for:
    - Adding sweets
    - Updating sweets
    - Deleting sweets
    - Restocking inventory
- Responsive, modern UI styled with Tailwind CSS.

---

## 📡 API Endpoints (Summary)

### Auth (Public)
- `POST /api/auth/register`  
  Body: `{ name, email, password }`  
  Action: Creates a new user.

- `POST /api/auth/login`  
  Body: `{ email, password }`  
  Action: Returns JWT token on success.

---

### Sweets (Protected – JWT required)

- `GET /api/sweets`  
  Returns all sweets.

- `GET /api/sweets/search?name=&category=&minPrice=&maxPrice=`  
  Search parameters:


