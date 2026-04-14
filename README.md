# 🎟️ Book My Ticket

A simple seat booking web application where users can register, login, and book seats securely.

---

## 🚀 Features

* 🔐 User Authentication (Register & Login)
* 🎫 Seat Booking System
* 👤 Only logged-in users can book seats
* 💾 Data stored securely in PostgreSQL
* ⚡ Backend Express.js & Drizzle ORM

---

## 🛠️ Tech Stack

### Frontend

* HTML
* CSS

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL
* Drizzle ORM

---

## 🔑 Authentication Flow

1. User registers with basic details
2. User logs in using credentials
3. Server verifies user and generates session/token
4. Only authenticated users can book seats

---

## 🎯 Seat Booking Logic

* Each seat can be booked only once
* Database locking is used to prevent double booking
* If a seat is already booked → user gets an error message

---

## 📁 Project Structure

```
book-my-ticket/
│
├── src/
│   ├── common/
│   │   ├── config/
│   │   │   └── db.config.js
│   │   ├── dto/
│   │   │   └── base.dto.js
│   │   ├── middleware/
│   │   │   └── validate.middleware.js
│   │   ├── utils/
│   │   │   ├── api-error.js
│   │   │   ├── api-response.js
│   │   │   └── jwt.utils.js
│   │
│   ├── modules/
│   │   └── auth/
│   │       ├── dto/
│   │       │   ├── login.dto.js
│   │       │   └── register.dto.js
│   │       ├── auth.controller.js
│   │       ├── auth.middleware.js
│   │       ├── auth.models.js
│   │       ├── auth.route.js
│   │       └── auth.service.js
│   │
│   ├── db/
│   ├── app.js
│   └── index.js
│
├── index.html
├── docker-compose.yml
├── drizzle.config.js
├── package.json
├── package-lock.json
├── .env
├── .gitignore
└── README.md
```

---
## 🐳 Docker Setup (Optional)

### You can run the project using Docker with PostgreSQL.

1. Start services
npm run db:up
2. Stop services
npm run db:down

Make sure your .env matches the database credentials defined in docker-compose.yml.
---

## ⚙️ Installation & Setup

### 1. Clone the repository

```
git clone https://github.com/Happy-negi238/Booking-ticket.git
cd book-my-ticket
```

### 2. Install dependencies

```
npm install
```

### 3. Setup environment variables

Create a `.env` file:

```
PORT=8080
DATABASE_URL=your_postgres_connection_string

JWT_ACCESS_SECRET=your_access_key
JWT_ACCESS_EXPIRES_IN=time_duration
JWT_REFRESH_SECRET=your_refresh_key
JWT_REFRESH_EXPIRES_IN=time_duration
```

### 4. Commands

```
start server - npm run dev
generate drizzle kit - npm run db:generate
migrate drizzle-kie - npm run db:migrate
start drizzle studio - npm run db:studio
```

---

## ❗ Important Notes

* User must be logged in to book a seat
* Seat booking is handled using database transactions
* Prevents race conditions and duplicate bookings

