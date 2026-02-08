# 🔍 Debug Login Error - Step by Step Guide

## What to Check

Since the login logic works when tested directly, the error is likely happening when the server is running. Follow these steps:

### Step 1: Check Server Console Output

When you try to login, **immediately check your server terminal** for error messages. You should now see detailed error output like:

```
=== LOGIN ERROR ===
Error Message: [actual error message]
Error Stack: [stack trace]
Full Error Object: [error details]
==================
```

**Copy the exact error message** and share it.

### Step 2: Common Error Scenarios

#### Error: "Cannot read property 'jwtSecret' of undefined"
**Status:** ✅ Should be fixed - config file exists

#### Error: "MongooseError: Operation `guards.findOne()` buffering timed out"
**Cause:** MongoDB connection issue
**Solution:**
```bash
# Check MongoDB connection
# Verify connection string in server/app.js
# Check if MongoDB Atlas allows connections from your IP
```

#### Error: "bcrypt.compare is not a function"
**Cause:** bcryptjs version issue
**Solution:**
```bash
cd server
npm install bcryptjs@latest
```

#### Error: "jwt.sign is not a function"
**Cause:** jsonwebtoken not installed properly
**Solution:**
```bash
cd server
npm install jsonwebtoken@latest
```

### Step 3: Test the Login Endpoint Directly

Open a new terminal and test the login endpoint:

**Using curl:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"pict_guard\",\"password\":\"secure@guard123\"}"
```

**Using PowerShell (Windows):**
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"username":"pict_guard","password":"secure@guard123"}'
```

### Step 4: Check Server Startup

Make sure your server started without errors:

```bash
cd server
npm run dev
```

You should see:
```
MongoDB Connected
Server running in development mode on port 5000
Server is accessible at http://localhost:5000
Claim scheduler started. Will run every 30 minutes.
```

### Step 5: Verify Dependencies

Make sure all packages are installed:

```bash
cd server
npm install
```

### Step 6: Check Browser Console

1. Open browser DevTools (F12)
2. Go to **Network** tab
3. Try to login
4. Click on the `/api/auth/login` request
5. Check:
   - **Status Code** (should be 200 for success, 500 for server error)
   - **Response** tab - see the error message
   - **Headers** tab - verify request is being sent correctly

### Step 7: Verify Request Format

The login request should be:
- **URL:** `POST http://localhost:5000/api/auth/login`
- **Headers:** `Content-Type: application/json`
- **Body:**
```json
{
  "username": "pict_guard",
  "password": "secure@guard123"
}
```

## 🚨 Most Likely Issues

1. **Server not restarted** after config file changes
   - **Fix:** Stop server (Ctrl+C) and restart with `npm run dev`

2. **MongoDB connection failed**
   - **Fix:** Check MongoDB connection string and network

3. **Missing dependencies**
   - **Fix:** Run `npm install` in server directory

4. **Port conflict**
   - **Fix:** Check if port 5000 is already in use

## 📋 What I Need From You

To help debug, please provide:

1. **Exact error message** from server console (the new detailed logging should show this)
2. **Status code** from browser Network tab
3. **Response body** from browser Network tab
4. **Server startup logs** (any errors when starting the server)

## ✅ Quick Fixes to Try

1. **Restart the server:**
   ```bash
   # Stop server (Ctrl+C)
   cd server
   npm run dev
   ```

2. **Clear node_modules and reinstall:**
   ```bash
   cd server
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Check if server is actually running:**
   ```bash
   # Visit in browser
   http://localhost:5000/api/test
   ```

4. **Verify MongoDB connection:**
   - Check `server/app.js` line 14-16
   - Ensure MongoDB Atlas allows connections from your IP

## 🎯 Next Steps

1. Try logging in again
2. **Immediately check server console** for the detailed error
3. Copy the error message and share it
4. Check browser Network tab for the response

The improved error logging should now show exactly what's failing!
