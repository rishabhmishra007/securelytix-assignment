# 🔐 Securelytix Auth and Dashboard Assignment

Securelytix is a **Full-Stack Advanced Authentication System** built using the **MERN stack (MongoDB, Express.js, React.js with Vite, Node.js)**. It features secure user authentication, email verification, and password reset flows with protected frontend routing.

---

## 📌 Project Overview

This assignment showcases a production-ready **authentication system** with:

- 🔐 JWT-based session management
- 📬 Email verification & password reset via Gmail (Nodemailer)
- 🛡️ Protected routes (frontend & backend)
- 💡 Built with modern tools: **Vite + React** (frontend), **Node.js + Express** (backend), **MongoDB** for storage
- Dashboard according to the assignment instructuion

---
## Project Snapshots:
![alt text](<Screenshot 2025-07-21 024719.png>)
![alt text](<Screenshot 2025-07-21 025301.png>)
![alt text](<Screenshot 2025-07-21 025340.png>)
![alt text](<Screenshot 2025-07-21 155620.png>)
![alt text](<Screenshot 2025-07-21 025423.png>)
![alt text](<Screenshot 2025-07-21 025454.png>)
---

## 🌐 Route Structure

### 🔧 Backend API Routes (`/api/auth`)

| Route | Method | Description |
|-------|--------|-------------|
| `/check-auth` | GET | Checks if a user is authenticated (token verification) |
| `/signup` | POST | Register a new user |
| `/login` | POST | Log in a user |
| `/logout` | POST | Log out user |
| `/verify-email` | POST | Verifies the user's email using a code |
| `/forget-password` | POST | Sends a password reset email |
| `/reset-password/:token` | POST | Resets password with a valid token |

### 💻 Frontend Routes (`Vite + React Router`)

| Path | Description |
|------|-------------|
| `/dashboard` | Protected dashboard page |
| `/signup` | Signup form |
| `/login` | Login form |
| `/verify-email` | Email verification page |
| `/forget-password` | Forgot password request page |
| `/reset-password` | Page to reset password using token |

---

## ⚙️ Environment Variables Setup

Create a `.env` file in the `/server` directory with the following keys:

```env
PORT=3000
MONGO_URI=your_mongo_db_uri
JWT_SECRET=your_jwt_secret
NODE_ENV=development
CLIENT_URL=http://localhost:5173

EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

⚠️ For Gmail users: Enable 2-Step Verification and generate an App Password to use in EMAIL_PASS.
```

---

## Getting Started Locally

### 1️⃣ Clone the Repository
```
git clone https://github.com/rishabhmishra007/securelytix-assignment.git
cd securelytix-auth-dashboard

```
### 2️⃣ Backend Setup
```
cd server
npm install

```
- Create a .env file (refer to section above)

- Start the backend server:

```
npm run dev
# Running at: http://localhost:3000

```
### 3️⃣ Frontend Setup
```
cd ../client
npm install


```
- Start the frontend app:

```
npm run dev
# Running at: http://localhost:5173

```
 --- 
## 🔐 Features Walkthrough
✅ Signup & Email Verification
Users register and receive a code in their email for verification.

🔐 Secure Login/Logout
Session maintained via HTTP-only cookies or tokens.

🔄 Forgot & Reset Password
Send a secure reset link to registered email. Resets with token.

🛡️ JWT Middleware & Route Protection
Backend validates tokens before allowing access to protected routes.

📬 Nodemailer + Gmail Integration
All verification and reset operations are powered by Gmail SMTP.

---
## 🛠️ Tech Stack
📦 Frontend:<br/>
React.js<br/>
Vite<br/>
React Router DOM<br/>
Axios<br/>
Tailwind CSS

🖥️ Backend:  
Node.js <br/>
Express.js<br/>
MongoDB + Mongoose<br/>
JWT<br/>
Nodemailer<br/>
dotenv

---

## 👨‍💻 Author
Rishabh Mishra<br/>
B.Tech (IT) | Full Stack Developer<br/>
