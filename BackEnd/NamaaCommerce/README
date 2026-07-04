# 🚀 NamaaCommerce.API

<p align="center">

![.NET](https://img.shields.io/badge/.NET-9.0-purple)
![ASP.NET Core](https://img.shields.io/badge/ASP.NET%20Core-Web%20API-blue)
![SQL Server](https://img.shields.io/badge/Database-SQL%20Server-red)
![JWT](https://img.shields.io/badge/Authentication-JWT-success)
![SignalR](https://img.shields.io/badge/Realtime-SignalR-orange)
![Swagger](https://img.shields.io/badge/API-Swagger-green)

</p>

---

# 📖 Overview

NamaaCommerce.API is a RESTful Web API built with **ASP.NET Core** following **Clean Architecture** principles.

The API provides secure authentication, product management, order processing, notifications, and real-time communication using SignalR.

---

# 🏗️ Architecture

The project follows **Clean Architecture** to separate responsibilities and improve maintainability.

```
Presentation
│
Application (Services)
│
Domain
│
Infrastructure (Persistence)
```

Each layer has a single responsibility, making the application scalable and easy to maintain.

---

# 📁 Solution Structure

```
NamaaCommerce
│
├── Domain
├── Services
├── Services.Abstraction
├── Persistence
├── Presentation
├── Shared
└── NamaaCommerce.API
```

---

# 🛠️ Technologies

- ASP.NET Core Web API
- Entity Framework Core
- SQL Server
- AutoMapper
- FluentValidation
- JWT Authentication
- SignalR
- Swagger
- Repository Pattern
- Unit Of Work
- Clean Architecture

---

# ✨ Features

## Authentication

- Register
- Login
- JWT Authentication
- Role-Based Authorization

---

## Product Management

- Create Product
- Update Product
- Delete Product
- Get Products
- Product Details

---

## Orders

- Create Order
- Get User Orders
- Order Details
- Update Order Status

---

## Notifications

- Real-Time Notifications
- Read / Unread Notifications

---

## Dashboard

Admin Dashboard APIs for:

- Products
- Orders
- Notifications

---

# 🔐 Roles

## Admin

- Manage Products
- Manage Orders
- View Notifications

## Customer

- Register
- Login
- Browse Products
- Create Orders
- View Orders
- Receive Notifications

---

# 📡 SignalR

SignalR is used to deliver real-time notifications between the server and connected clients.

---

# 🔄 Background Service

The project includes a Background Service responsible for processing scheduled order-related tasks automatically.

---

# 📂 API Endpoints

## Authentication

```
POST /api/auth/register

POST /api/auth/login
```

---

## Products

```
GET /api/product

GET /api/product/{id}

POST /api/product

PUT /api/product/{id}

DELETE /api/product/{id}
```

---

## Orders

```
GET /api/order

GET /api/order/{id}

POST /api/order

PATCH /api/order/status
```

---

## Notifications

```
GET /api/notification

PATCH /api/notification/read
```

---

# 📊 Validation

The project uses **FluentValidation** to validate incoming requests before reaching business logic.

---

# ⚠️ Exception Handling

A centralized **Global Exception Handling Middleware** is implemented to return consistent API responses.

Example:

```json
{
    "statusCode":400,
    "message":"Validation Failed"
}
```

---

# 📝 Logging

Application logging is enabled to simplify debugging and monitoring during development.

---

# 🗄️ Database

- SQL Server
- Entity Framework Core
- Code First
- Migrations
- Seed Data

---

# 🚀 Running the Project

## Clone

```bash
git clone https://github.com/yourusername/NamaaCommerce.git
```

---

## Restore Packages

```bash
dotnet restore
```

---

## Update Database

```bash
dotnet ef database update
```

---

## Run

Using Visual Studio:

- Open `NamaaCommerce.sln`
- Press **F5**

Or using the terminal:

```bash
dotnet run
```

---

# 📖 Swagger

After running the application, Swagger is available at:

```
https://localhost:<port>/swagger
```

or

```
http://localhost:<port>/swagger
```

---

# 🔒 Security

- JWT Authentication
- Role-Based Authorization
- Request Validation
- Global Exception Handling

---

# 📌 Future Improvements

- Refresh Tokens
- Email Confirmation
- Forgot Password
- Docker Support
- CI/CD Pipeline
- Unit Testing
- Integration Testing

---

# 👨‍💻 Author

**Fady**

Technical Assessment Project

---

⭐ If you like this project, don't forget to give it a star.
