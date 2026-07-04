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

---

## 📸 Screenshots

> Add screenshots here.

Example:

```
Login Page
```
<img width="800" height="590" alt="image" src="https://github.com/user-attachments/assets/1d20dafb-bdd9-4fa1-b59d-66f3d10c98d2" />
<img width="1242" height="557" alt="image" src="https://github.com/user-attachments/assets/dad87207-4f82-4ed8-8900-59c33baeb4e9" />
```
Products
```
<img width="1119" height="611" alt="image" src="https://github.com/user-attachments/assets/d68b99e4-17cb-41c9-9eff-52d2370c2035" />
<img width="1342" height="609" alt="image" src="https://github.com/user-attachments/assets/a7ed6232-5cf6-4d33-8bf3-a9423696bd7b" />

```
Orders
```
<img width="1282" height="589" alt="image" src="https://github.com/user-attachments/assets/eaf87ecb-70e2-4c56-9f04-19360939a622" />
<img width="1206" height="602" alt="image" src="https://github.com/user-attachments/assets/d42741d4-3c23-4828-808f-b9f39b944911" />
<img width="1221" height="532" alt="image" src="https://github.com/user-attachments/assets/63fd217a-f28b-4c3d-be8a-24f41f6d1332" />
<img width="1234" height="525" alt="image" src="https://github.com/user-attachments/assets/ec53bafd-429c-4485-a851-ad4427244786" />
<img width="1226" height="505" alt="image" src="https://github.com/user-attachments/assets/aa1b74ad-ffe4-4c3e-942d-e7b37281ad92" />
<img width="1268" height="528" alt="image" src="https://github.com/user-attachments/assets/b2a4f74d-1555-4a01-b441-413f8cd8ff4c" />
```
Orders Details
```
<img width="985" height="606" alt="image" src="https://github.com/user-attachments/assets/ed2b3115-a256-42c1-9428-a7acc499acca" />
<img width="963" height="603" alt="image" src="https://github.com/user-attachments/assets/197226cd-91fc-479d-8d2c-7268fc4a9993" />

```
Notifications
```
<img width="1237" height="411" alt="image" src="https://github.com/user-attachments/assets/2ec31d27-5a15-47eb-bd83-121f07985809" />

---

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
