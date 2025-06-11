# 🎵 Spotify Clone

A fully functional **Spotify-inspired music streaming app** built with modern technologies, complete with user authentication, personalized playlists, chat functionality, and real-time messaging using Socket.IO.

## 🖼️ Live Demo

**Frontend:** [https://spotify-clone-chi-dun.vercel.app](https://spotify-clone-chi-dun.vercel.app)  
**Backend:** Deployed on Render

---

## 🚀 Features

- 🔒 **User Authentication** (via Clerk)
- 🎧 **Playlists & Albums** (admin can create and manage music content)
- 📈 **Trending / Made For You / Featured Songs**
- 🔊 **Audio Player** with controls
- 📬 **Real-time Chat System** using Socket.IO
- 💾 **Persistent State Management** with Zustand
- 📁 **File Uploads** for songs and images (Cloudinary)
- ⚡ **Skeleton Loaders** for seamless loading UI
- 🌙 **Dark Mode UI**

---

## 🛠️ Tech Stack

### Frontend

- **React** (with Vite)
- **TypeScript**
- **Tailwind CSS** + **ShadCN UI**
- **Zustand** (for global state management)
- **Clerk** (authentication)
- **Framer Motion** (for animations)
- **Socket.IO Client** (real-time messaging)

### Backend

- **Node.js** + **Express**
- **MongoDB** (Mongoose ODM)
- **Socket.IO** (WebSocket-based messaging)
- **Cloudinary** (image & audio storage)
- **Clerk Webhooks** for syncing user data
- **File Upload** with `express-fileupload`
- **Node-Cron** (for cleaning temporary files)

---

## 🔧 Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/arnavraj-7/Spotify-Clone.git
cd Spotify-Clone
```

### 2. Install Dependencies

#### Frontend

```bash
cd client
npm install
```

#### Backend

```bash
cd backend
npm install
```

### 3. Create `.env` files

**Frontend `.env`**

```env
VITE_BACKEND_URL=https://your-backend-url.com
VITE_CLERK_PUBLISHABLE_KEY=your-clerk-key
```

**Backend `.env`**

```env
MONGODB_URI=your-mongo-uri
FRONTEND_URL=https://your-frontend-url.com
CLERK_SECRET_KEY=your-clerk-secret-key
CLOUDINARY_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-secret
```

### 4. Run the App

#### Frontend

```bash
npm run dev
```

#### Backend

```bash
npm start
```

---

## 📁 Folder Structure

```
Spotify-Clone/
│
├── client/              # React Frontend
│   ├── components/
│   ├── pages/
│   ├── stores/
│   └── ...
│
├── backend/             # Express Backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── lib/             # Socket.IO setup
│   └── ...
│
└── README.md
```

---

## 🙋‍♂️ Author

**Arnav Raj**  
[GitHub](https://github.com/arnavraj-7)