# 📘 Backend Reference Notes

A complete reference for backend development using Express.js, MongoDB, and Clerk for authentication.

---

## 📁 Folder Structure Guidelines

```
backend/
├── controllers/
├── routes/
├── middlewares/
├── models/
├── utils/
├── uploads/
├── config/
├── src/index.js
├── .env
├── .gitignore
├── package.json
├── backend_notes.md ← (this file)
```

---

## 🧠 Concepts & Usage

### ✅ Middleware

* Functions that have access to `req`, `res`, and `next()`.
* Run **before** the route handler.
* Common types:

  * Logger middleware
  * Error handler middleware
  * Auth middleware

### 🧾 Basic Middleware Setup

```js
app.use(express.json());
app.use(cors());
```

### 🔐 Clerk Authentication

* Use `clerkClient` to verify JWT tokens.
* Auth middleware should extract and verify `Authorization` header.

```js
const isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) return res.status(401).json({ message: "Not logged in" });
  try {
    const user = await clerkClient.users.getUser(token);
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
```

### 🌍 CORS (Cross-Origin Resource Sharing)

* Allows your frontend (usually on a different port) to communicate with your backend.
* Use:

```js
import cors from 'cors';
app.use(cors());
```

---

## 🔄 Routing

### 🔢 Route Parameters

```js
app.get("/user/:id", (req, res) => {
  const { id } = req.params;
});
```

### ❓ Query Strings

```js
app.get("/search", (req, res) => {
  const { q } = req.query;
});
```

---

## 💾 MongoDB Essentials

### 📌 Mongoose Model

```js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
});

export default mongoose.model("User", UserSchema);
```

### 📤 Create vs Save

```js
const user = new User({ name: "Arnav" });
await user.save(); // method 1

await User.create({ name: "Arnav" }); // method 2
```

---

## 🧼 Error Handling

### Global Error Handler

```js
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ message: err.message });
});
```

### When to use `next(error)`

* For **server-side** failures (e.g., DB not connected, file upload fails)
* For async errors inside `try {}` blocks

### When **not** to throw

* For **expected logic failures** (like not logged in or missing data), use:

```js
return res.status(400).json({ message: "Bad request." });
```

---

## ✅ Common Dos and Don’ts

### ✅ Do

* Always use `try/catch` in async route handlers
* Use `next(error)` for unexpected errors
* Use `console.log()` inside conditionals to debug
* Use a linter and Prettier
* Modularize: routes, controllers, utils
* Use `.env` to store DB and Clerk secrets

### ❌ Don’t

* Don’t forget to `return` after sending a response
* Don’t call `res.json()` after `next(error)`
* Don’t skip CORS setup
* Don’t send sensitive data like passwords in responses
* Don’t use hardcoded URLs or secrets

---

## 🛠️ Utility Helpers

### Validate Required Fields

```js
export const validateFields = (body, fields) => {
  return fields.every(field => body[field]);
};
```

### Log Missing Fields

```js
if (!validateFields(req.body, ['title', 'artist'])) {
  console.log("Missing fields", req.body);
  return res.status(400).json({ message: "Send all required fields." });
}
```

---

## 🔁 Tips for Debugging

* Log `req.body`, `req.params`, `req.query` to debug issues
* Use Postman or ThunderClient to test endpoints
* Use a consistent error message format
* Always check if MongoDB is connected properly

---

## 🧠 Useful NPM Packages

* `dotenv`
* `cors`
* `express`
* `mongoose`
* `morgan` (logging)
* `multer` (file upload)
* `cloudinary`
* `clerk-sdk`

---

## 🧪 Testing Ideas

* Test with missing fields
* Test with invalid JWT tokens
* Test with invalid MongoDB IDs
* Test without internet to check DB errors

---

## ✅ Final Advice

**Small mistakes kill backend**: Forgetting `next(error)` or a return can crash everything. Take your time, use logs, and build step by step.

Make this your personal reference and update it regularly. 🔥
