# 🛒 NamaaCommerce

<p align="center">

![.NET](https://img.shields.io/badge/.NET-9.0-purple)
![React](https://img.shields.io/badge/React-19-blue)
![Vite](https://img.shields.io/badge/Vite-Frontend-646CFF)
![SQL Server](https://img.shields.io/badge/Database-SQL%20Server-red)
![JWT](https://img.shields.io/badge/Auth-JWT-success)
![SignalR](https://img.shields.io/badge/Realtime-SignalR-orange)
![License](https://img.shields.io/badge/License-MIT-green)

</p>

## 📖 Overview

NamaaCommerce is a Full Stack E-Commerce application developed as a Technical Assessment. The system enables customers to browse products, manage their shopping cart, and place orders, while administrators can manage products, orders, users, and notifications through a dedicated dashboard.

The project follows Clean Architecture principles and applies modern software engineering practices to ensure maintainability, scalability, and separation of concerns.

---

## ✨ Features

### 👤 Customer

* User Registration
* User Login with JWT Authentication
* Browse Products
* Product Details
* Shopping Cart
* Place Orders
* View Order Details
* Receive Real-Time Notifications

---

### 🛠️ Admin Dashboard

* Products CRUD
* Order Management
* User Management
* Notification Management
* Dashboard

---

### 🚀 General Features

* JWT Authentication
* Role-Based Authorization
* Clean Architecture
* Repository Pattern
* Unit of Work
* FluentValidation
* Global Exception Handling
* SignalR Real-Time Notifications
* Logging
* Swagger API Documentation
* SQL Server Database
* Database Seed Data
* Entity Framework Core Migrations

---

## 🏗️ Project Architecture

The project follows the **Clean Architecture** pattern to keep the codebase maintainable and scalable.

Typical layers include:

```text
Presentation
│
Application
│
Domain
│
Infrastructure
```

This architecture separates business logic from infrastructure and presentation concerns, making the application easier to test and extend.

---

## 🛠️ Technology Stack

### Backend

* ASP.NET Core Web API
* Entity Framework Core
* SQL Server
* AutoMapper
* JWT Authentication
* SignalR
* FluentValidation
* Repository Pattern
* Unit of Work
* Swagger

---

### Frontend

* React
* Vite
* React Router
* Redux
* Axios
* Bootstrap
* React Bootstrap
* Font Awesome
* SignalR Client

---

## 📂 Project Structure

```text
NamaaCommerce
│
├── NamaaCommerce.API
├── NamaaCommerce.Frontend
└── Database
```

---

## 🚀 Getting Started

### Clone Repository

```bash
git clone <repository-url>
```

---

### Backend

```bash
cd NamaaCommerce.API
```

Run the project from **Visual Studio**.

---

### Frontend

```bash
cd NamaaCommerce.Frontend

npm install

npm run dev
```

---

## 🔐 Authentication

The application uses **JWT Authentication** with role-based authorization.

Supported roles:

* Admin
* Customer

---

## 📡 API Documentation

Swagger is available when running the backend project.

---

## 🔔 Real-Time Notifications

SignalR is used to provide real-time notifications between the server and connected clients.


## 📈 Future Improvements
* Payment Gateway Integration
* Wishlist
* Product Reviews Enhancements
* Email Notifications
* Docker Support
* Cloud Deployment
* CI/CD Pipeline

---

## 👨‍💻 Developed By

**Fady**

Technical Assessment Project

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.
