# 🔧 Login Error Troubleshooting Guide

## ✅ Fixed: Config File Issue

The `server/config/config.js` file was empty, which was causing the login error. This has been fixed.

## 🔍 How to Debug Login Errors

### Step 1: Check Server Console

When you try to login, check your **server terminal** for error messages. The error should be logged there.

### Step 2: Common Login Errors

#### Error: "Cannot read property 'jwtSecret' of undefined"
**Status:** ✅ FIXED - Config file now has jwtSecret

#### Error: "Invalid credentials"
**Possible Causes:**
- Wrong username or password
- Guard user doesn't exist in database

**Solution:**
```bash
# Check if guard exists
cd server
npm run seed:guard
```

**Default Credentials:**
- Username: `pict_guard`
- Password: `secure@guard123`

#### Error: "MongoDB connection error"
**Solution:**
- Check MongoDB connection string in `server/app.js`
- Ensure MongoDB Atlas allows connections from your IP
- Check internet connection

#### Error: "Server error" (500)
**Check:**
1. Server console for detailed error
2. MongoDB connection status
3. Config file is properly loaded

### Step 3: Test Login Manually

You can test the login endpoint directly:

```bash
# Using curl (if available)
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"pict_guard","password":"secure@guard123"}'
```

Or use Postman/Thunder Client:
- **URL:** `POST http://localhost:5000/api/auth/login`
- **Body (JSON):**
```json
{
  "username": "pict_guard",
  "password": "secure@guard123"
}
```

### Step 4: Verify Server is Running

1. Check if server is running on port 5000:
   ```bash
   # Visit in browser
   http://localhost:5000/api/test
   ```
   Should return: `{"status":"✅ Backend API is working!",...}`

2. Check server console for:
   ```
   MongoDB Connected
   Server running in development mode on port 5000
   ```

### Step 5: Check Frontend Login Request

Open browser DevTools (F12) → Network tab → Try login → Check the request:

1. **Request URL:** Should be `http://localhost:5000/api/auth/login`
2. **Request Method:** POST
3. **Request Payload:** Should have username and password
4. **Response:** Check status code and error message

## 🚀 Quick Fix Steps

1. **Restart the server:**
   ```bash
   # Stop server (Ctrl+C)
   # Then restart
   cd server
   npm run dev
   ```

2. **Verify config file exists:**
   ```bash
   # Check if file exists
   ls server/config/config.js
   # Should show the file
   ```

3. **Check guard user exists:**
   ```bash
   cd server
   npm run seed:guard
   ```

4. **Clear browser cache and try again**

## 📝 Expected Login Flow

1. User enters username and password
2. Frontend sends POST to `/api/auth/login`
3. Backend checks:
   - Username and password provided ✅
   - Guard exists in database ✅
   - Password matches ✅
4. Backend generates JWT token
5. Backend returns:
   ```json
   {
     "success": true,
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
     "guard": {
       "id": "...",
       "username": "pict_guard",
       "role": "guard"
     }
   }
   ```
6. Frontend stores token and redirects to dashboard

## 🐛 Still Having Issues?

If login still fails after these steps:

1. **Check server console** for the exact error message
2. **Share the error message** from server console
3. **Check Network tab** in browser DevTools for the API response
4. **Verify MongoDB connection** is working

## ✅ Current Status

- ✅ Config file created with jwtSecret
- ✅ Guard user exists in database
- ✅ Default credentials: `pict_guard` / `secure@guard123`

Try logging in again with these credentials!
