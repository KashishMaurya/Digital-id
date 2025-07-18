# 💙 CareConnect

CareConnect is a digital identity system designed to protect vulnerable individuals, children, and pets by enabling quick access to critical information through unique QR codes. Built with the **MERN stack** and optimized for security, accessibility, and family-centered care.

---

## 🔍 Overview

CareConnect helps you store and share critical personal and medical details with emergency responders, caregivers, and good samaritans — simply by scanning a secure QR code.

---

## 🌟 Features

* 🔐 **Multi-profile management** (e.g., seniors, kids, pets)
* 📱 **QR code generation** for each profile
* ⚡ **Instant access** to emergency info
* 🔒 **Secure backend with JWT** authentication
* 📦 **Image uploads with Cloudinary**
* 📱 **Mobile-friendly and printable formats**

---

## 📁 Folder Structure

### Frontend: `client/`

```
client/
├── public/
├── src/
│   ├── api/
│   │   └── auth.js
│   ├── components/
│   │   ├── css/
│   │   └── ui/
│   ├── pages/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   └── App.css
├── .env
├── index.html
├── tailwind.config.js
├── vite.config.js
└── package.json
```

### Backend: `server/`

```
server/
├── config/
│   ├── cloudinary.js
│   └── jwt.js
├── controllers/
│   └── authController.js
├── middleware/
│   ├── upload.js
│   └── uploadMiddleware.js
├── models/
│   ├── headUser.js
│   └── profileID.js
├── routes/
│   ├── authRoutes.js
│   └── profileRoutes.js
├── index.js
├── .env
└── package.json
```

---

## 🛠 Tech Stack

| Layer       | Technology                  |
| ----------- | --------------------------- |
| Frontend    | React + Vite + Tailwind CSS |
| Backend     | Express.js + Node.js        |
| Database    | MongoDB + Mongoose          |
| Auth        | JWT + bcryptjs              |
| Image Store | Cloudinary                  |
| QR Code     | qrcode.react                |

---

## 🖥️ Local Setup

### 1️⃣ Backend

```bash
cd server
npm install
```

**.env**

```env
PORT=5000
MONGODB_URI=your_mongodb_url
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

Run the backend:

```bash
node index.js
```

### 2️⃣ Frontend

```bash
cd client
npm install
npm run dev
```

---

## 🚀 Deployment

### 🔹 Frontend (Vercel)

1. Push `client` folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com/)
3. Import the GitHub project
4. Set build settings:

   * **Framework Preset**: Vite
   * **Root Directory**: `client`
   * **Build Command**: `npm run build`
   * **Output Directory**: `dist`
5. Add environment variables:

   * None needed unless you use external APIs on frontend

---

### 🔸 Backend (Render)

1. Push `server` folder to a separate GitHub repo
2. Go to [render.com](https://render.com/)
3. Click “New Web Service”
4. Connect your GitHub repo
5. Set:

   * **Environment**: Node
   * **Build Command**: `npm install`
   * **Start Command**: `node index.js`
6. Add environment variables (`.env` contents)
7. Enable Auto Deploy for continuous updates

---

## 🔐 Security

* Passwords are hashed with `bcryptjs`
* JWT tokens manage sessions
* Cloudinary handles media securely
* Profiles accessible only via QR link (no public listing)

---

## 📦 Packages

### Client

```json
"axios", "qrcode.react", "react", "react-dom", "react-router-dom", "tailwindcss", "vite"
```

### Server

```json
"bcryptjs", "cloudinary", "cors", "dotenv", "express", "jsonwebtoken", "mongodb", "mongoose", "multer", "multer-storage-cloudinary"
```

---

## 📌 Future Enhancements

* Admin dashboard with analytics
* Profile sharing & permissions
* QR scan analytics
* Offline mode or fallback page
* Voice-based alerts for caregivers

---

## 📄 License

This project is licensed under the MIT License.

