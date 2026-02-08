# 🚀 Local Setup Guide for PICT Lost & Found System

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14.x or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** (optional, for cloning)
- **MongoDB Atlas Account** (free tier) or local MongoDB installation

---

## Step-by-Step Setup Instructions

### 1. **Install Server Dependencies**

```bash
# Navigate to server directory
cd server

# Install all dependencies
npm install
```

### 2. **Install Client Dependencies**

```bash
# Navigate to client directory (from project root)
cd client

# Install all dependencies
npm install
```

### 3. **Create Missing Configuration File**

The server requires a `config.js` file. Create it:

**Create file:** `server/config/config.js`

```javascript
require('dotenv').config();

module.exports = {
  // JWT Configuration
  jwtSecret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
  JWT_SECRET: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',

  // SMTP Email Configuration (for sending emails)
  SMTP_HOST: process.env.SMTP_HOST || 'smtp.gmail.com',
  SMTP_PORT: process.env.SMTP_PORT || 587,
  SMTP_EMAIL: process.env.SMTP_EMAIL || 'your-email@gmail.com',
  SMTP_PASSWORD: process.env.SMTP_PASSWORD || 'your-app-password',
  FROM_EMAIL: process.env.FROM_EMAIL || 'noreply@pictlostfound.com',
  FROM_NAME: process.env.FROM_NAME || 'PICT Lost & Found',

  // Guard Credentials (for development)
  GUARD_CREDENTIALS: {
    username: process.env.GUARD_USERNAME || 'pict_guard',
    password: process.env.GUARD_PASSWORD || 'guard123'
  }
};
```

### 4. **Set Up Environment Variables (Optional but Recommended)**

Create a `.env` file in the `server` directory:

**Create file:** `server/.env`

```env
# MongoDB Connection String
MONGO_URI=mongodb+srv://rishi:RG8172004@cluster0.u65kq.mongodb.net/pict-lostfound

# JWT Secret (use a strong random string in production)
JWT_SECRET=your-super-secret-jwt-key-change-in-production-12345

# Email Configuration (for claim notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=your-email@gmail.com
SMTP_PASSWORD=your-app-specific-password
FROM_EMAIL=noreply@pictlostfound.com
FROM_NAME=PICT Lost & Found

# Guard Credentials (optional, defaults in config.js)
GUARD_USERNAME=pict_guard
GUARD_PASSWORD=guard123
```

**Note:** The MongoDB connection string is already hardcoded in `app.js`, but using `.env` is better practice.

### 5. **Seed Guard User (Optional)**

If you want to create a guard user in the database:

```bash
cd server
npm run seed:guard
```

This will create a guard user with username and password (check `server/seeds/guardSeed.js` for details).

### 6. **Start the Backend Server**

```bash
# From server directory
cd server

# Development mode (with auto-reload)
npm run dev

# OR Production mode
npm start
```

The server will start on **http://localhost:5000**

You should see:
```
MongoDB Connected
Server running in development mode on port 5000
Server is accessible at http://localhost:5000
Claim scheduler started. Will run every 30 minutes.
```

### 7. **Start the Frontend Client**

Open a **new terminal window**:

```bash
# From client directory
cd client

# Start React development server
npm start
```

The client will start on **http://localhost:3000** and automatically open in your browser.

---

## 🎯 Quick Start (All Commands)

If you want to run everything at once, use these commands in separate terminals:

**Terminal 1 (Backend):**
```bash
cd server && npm install && npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd client && npm install && npm start
```

---

## ✅ Verify Installation

1. **Backend is running:**
   - Visit: http://localhost:5000/api/test
   - Should see: `{"status":"✅ Backend API is working!",...}`

2. **Frontend is running:**
   - Visit: http://localhost:3000
   - Should see the homepage

3. **Login as Guard:**
   - Go to: http://localhost:3000/login
   - Use credentials from `server/seeds/guardSeed.js` or your `.env` file

---

## 📸 Cloudinary Configuration

### Current Setup

The project is configured to use Cloudinary with these credentials:
- **Cloud Name:** `dxqirkx5m`
- **API Key:** `839181327468946`
- **API Secret:** `Ifw55BajFeuxa1LqNTVqIy30BRU`

**Location:** `server/config/cloudinary.js`

### What Happens When You Upload an Item?

✅ **YES** - When you upload an item image, it **WILL be stored** in the Cloudinary account (`dxqirkx5m`).

**Upload Flow:**
1. User selects image → Frontend sends to backend
2. Backend uses Multer + Cloudinary Storage → Uploads to Cloudinary
3. Image is stored in folder: `lost-and-found/`
4. Image is automatically resized to max 800x600px
5. Cloudinary returns URL → Stored in MongoDB
6. Image is served via Cloudinary CDN

### Cloudinary Free Plan Limits

| Resource | Free Plan Limit |
|----------|----------------|
| **Storage** | 25 GB total |
| **Bandwidth** | 25 GB/month |
| **Transformations** | 25,000/month |
| **Image File Size** | Up to 10 MB per upload |
| **Video File Size** | Up to 100 MB per upload |
| **Raw Files** | 10 MB per upload |

**Your Current Limits:**
- ✅ **25 Credits/month** (1 credit = 1 GB storage OR 1 GB bandwidth OR 1,000 transformations)
- ✅ **10 MB max** per image upload
- ✅ **5 MB limit** enforced by your code (`uploadMiddleware.js`)

### What Happens If You Exceed Limits?

1. **Warnings:** Cloudinary sends email notifications at ~90% usage
2. **Soft Limits:** Account isn't immediately shut off
3. **Upgrade Required:** If consistently over limits, you may need to upgrade
4. **Upload Blocking:** In extreme cases, uploads may be disabled

### Monitoring Usage

1. Visit: https://cloudinary.com/console
2. Login with the account credentials
3. Go to **Dashboard** → **Usage** to see:
   - Storage used
   - Bandwidth consumed
   - Transformations performed

### Tips to Stay Within Limits

1. **Optimize Images:** Your code already resizes to 800x600px
2. **Delete Unused Images:** Remove old items from Cloudinary
3. **Monitor Regularly:** Check dashboard monthly
4. **Use Transformations Wisely:** Don't create unnecessary thumbnails
5. **Compress Images:** Cloudinary auto-optimizes with `quality: "auto"`

---

## 🔧 Troubleshooting

### Issue: "Cannot find module '../config/config'"

**Solution:** Create `server/config/config.js` as shown in Step 3 above.

### Issue: "MongoDB connection error"

**Solution:** 
- Check MongoDB connection string in `server/app.js` (line 14-16)
- Ensure MongoDB Atlas allows connections from your IP
- Check if MongoDB credentials are correct

### Issue: "Port 5000 already in use"

**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### Issue: "Port 3000 already in use"

**Solution:** React will automatically ask to use port 3001 instead, or:
```bash
# Set custom port
PORT=3001 npm start
```

### Issue: "Email sending fails"

**Solution:**
- Email sending is optional (won't break the app)
- Configure SMTP settings in `.env` file
- For Gmail, use [App Password](https://support.google.com/accounts/answer/185833)

### Issue: "Cloudinary upload fails"

**Possible Causes:**
1. **Invalid credentials** - Check `server/config/cloudinary.js`
2. **File too large** - Max 5MB (enforced) or 10MB (Cloudinary limit)
3. **Invalid file type** - Only jpeg, jpg, png, gif allowed
4. **Network issues** - Check internet connection
5. **Account limits exceeded** - Check Cloudinary dashboard

**Debug:**
- Check server console for error messages
- Verify Cloudinary credentials are correct
- Check Cloudinary dashboard for account status

---

## 📝 Important Notes

1. **Cloudinary Credentials:** The credentials are hardcoded in `server/config/cloudinary.js`. In production, move these to environment variables.

2. **MongoDB Connection:** Currently hardcoded in `server/app.js`. Consider moving to `.env` file.

3. **Email Service:** Optional - the app works without email configuration, but claim notifications won't be sent.

4. **Development vs Production:**
   - Development: Uses `npm run dev` (nodemon for auto-reload)
   - Production: Uses `npm start` (standard node)

5. **File Upload Limits:**
   - **Code Limit:** 5 MB (`uploadMiddleware.js` line 35)
   - **Cloudinary Limit:** 10 MB per image
   - **Your Limit:** 5 MB (more restrictive)

---

## 🎉 You're All Set!

Once both servers are running:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

Try uploading an item and check your Cloudinary dashboard to see it appear in the `lost-and-found` folder!

---

## 📚 Additional Resources

- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [MongoDB Atlas Setup](https://www.mongodb.com/cloud/atlas/register)
- [Node.js Documentation](https://nodejs.org/docs/)
- [React Documentation](https://react.dev/)
