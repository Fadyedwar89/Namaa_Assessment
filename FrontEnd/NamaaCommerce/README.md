
# 💻 NamaaCommerce Frontend

<p align="center">

![React](https://img.shields.io/badge/React-19-61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF)
![Bootstrap](https://img.shields.io/badge/UI-Bootstrap-7952B3)
![Axios](https://img.shields.io/badge/API-Axios-5A29E4)
![SignalR](https://img.shields.io/badge/Realtime-SignalR-orange)

</p>

---

# 📖 Overview

NamaaCommerce Frontend is a modern and responsive React application built using **React + Vite**.

The application provides a clean user interface for customers and administrators, communicating with the ASP.NET Core Web API through REST APIs and SignalR for real-time features.

The frontend follows a structured and maintainable architecture with reusable components, custom hooks, and separated service layers.

---

# 🚀 Technologies

* React 19
* Vite
* React Router DOM
* Axios
* Bootstrap
* React Bootstrap
* Font Awesome
* SignalR Client
* Custom React Hooks

---

# ✨ Features

## Customer

* User Registration
* User Login
* Browse Products
* Product Details
* Shopping Cart
* Place Orders
* View Orders
* Order Details
* Real-Time Notifications

---

## Admin Dashboard

* Products CRUD
* Orders Management
* Order Status Updates
* Order Statistics Dashboard
* Customer Orders Monitoring
* Real-Time Notifications

---

## Orders Management

* View Orders
* Search Orders
* Filter Orders By Status
* Pagination
* Update Order Status
* Cancel Orders
* Order Details
* Order Statistics

---

## UI Features

* Responsive Design
* Search
* Filtering
* Pagination
* Toast Notifications
* Loading Indicators
* Reusable UI Components

---

# 📁 Project Structure

```
src
│
├── api
│
├── components
│   ├── Layout
│   ├── Orders
│   ├── Notifications
│   └── Common
│
├── pages
│
├── hooks
│
├── services
│
├── routes
│
├── utils
│
└── assets
```

---

# 🏗️ Architecture & Code Organization

The frontend follows a clean and maintainable structure:

* Component-based architecture
* Reusable UI components
* Custom hooks for business logic separation
* Service layer for API communication
* Protected routes based on user roles
* Organized feature-based folders
* Separation between UI and application logic

---

# 🔐 Authentication

The application authenticates users using **JWT Authentication**.

Supported Roles:

* Admin
* Customer

Protected routes ensure users can only access pages permitted by their roles.

---

# 🔔 Real-Time Communication

SignalR Client is integrated for real-time communication with the backend.

Implemented features:

* Instant notifications
* Real-time order events
* Updates without page refresh
* Live communication between backend and frontend

---

# 🌐 API Communication

Axios is used for communication with the ASP.NET Core Web API.

Implemented API features:

* Authentication
* Products Management
* Orders Management
* Notifications
* Order Statistics

---

# 🎨 UI

The application uses:

* Bootstrap
* React Bootstrap
* Font Awesome

to provide a responsive and modern user experience.

---

# 🚀 Getting Started

## Install Dependencies

```bash
npm install
```

---

## Start Development Server

```bash
npm run dev
```

---

The application will be available at:

```
http://localhost:5173
```

---

# 🔗 Backend

Before running the frontend, make sure the ASP.NET Core backend API is running.

Example:

```
https://localhost:7043
```

Update the API base URL if necessary.

---

# 📸 Screenshots

## Login Page

<img width="800" height="590" alt="image" src="https://github.com/user-attachments/assets/1d20dafb-bdd9-4fa1-b59d-66f3d10c98d2" />

<img width="1242" height="557" alt="image" src="https://github.com/user-attachments/assets/dad87207-4f82-4ed8-8900-59c33baeb4e9" />

---

## Products

<img width="1119" height="611" alt="image" src="https://github.com/user-attachments/assets/d68b99e4-17cb-41c9-9eff-52d2370c2035" />

<img width="1342" height="609" alt="image" src="https://github.com/user-attachments/assets/a7ed6232-5cf6-4d33-8bf3-a9423696bd7b" />

---

## Admin Dashboard

<img width="1138" height="484" alt="image" src="https://github.com/user-attachments/assets/afca5b23-9b7b-469f-aa0c-cc534a62367e" />

<img width="587" height="424" alt="image" src="https://github.com/user-attachments/assets/8a2615b4-d6e8-4e44-9f84-d7e295d2ea57" />

---

## Orders

<img width="1155" height="426" alt="image" src="https://github.com/user-attachments/assets/ad52be2b-69bd-454d-9f20-b378ca974a31" />

<img width="1206" height="602" alt="image" src="https://github.com/user-attachments/assets/d42741d4-3c23-4828-808f-b9f39b944911" />

---

## Order Details

<img width="985" height="606" alt="image" src="https://github.com/user-attachments/assets/ed2b3115-a256-42c1-9428-a7acc499acca" />

---

## Notifications

<img width="1237" height="411" alt="image" src="https://github.com/user-attachments/assets/2ec31d27-5a15-47eb-bd83-121f07985809" />

---

# 📈 Future Improvements

* Wishlist
* Product Reviews
* User Profile
* Dark Mode
* Multi-language Support
* Payment Gateway Integration
* Performance Optimization

---

# 👨‍💻 Author

**Fady**

Technical Assessment Project

---

⭐ If you like this project, consider giving it a star on GitHub.
