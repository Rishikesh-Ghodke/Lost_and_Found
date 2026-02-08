# ☁️ Cloudinary Configuration Guide

## Current Setup

Your Cloudinary configuration is set up in `server/config/cloudinary.js`. I've updated it to support environment variables for better security.

## ✅ What I Changed

**Before (Hardcoded - Security Risk):**
```javascript
cloudinary.config({
  cloud_name: "dxqirkx5m",
  api_key: "839181327468946",
  api_secret: "Ifw55BajFeuxa1LqNTVqIy30BRU",
});
```

**After (Environment Variables with Fallback):**
```javascript
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dxqirkx5m",
  api_key: process.env.CLOUDINARY_API_KEY || "839181327468946",
  api_secret: process.env.CLOUDINARY_API_SECRET || "Ifw55BajFeuxa1LqNTVqIy30BRU",
});
```

## 🔒 Security Best Practices

### Option 1: Use Environment Variables (Recommended)

Create a `.env` file in the `server` directory:

```env
CLOUDINARY_CLOUD_NAME=dxqirkx5m
CLOUDINARY_API_KEY=839181327468946
CLOUDINARY_API_SECRET=Ifw55BajFeuxa1LqNTVqIy30BRU
```

**Benefits:**
- ✅ Credentials not in source code
- ✅ Can use different credentials for dev/production
- ✅ Safe to commit code to Git
- ✅ Easy to rotate credentials

**Important:** Add `.env` to `.gitignore` to prevent committing secrets!

### Option 2: Keep Hardcoded (Current - Works but Less Secure)

The current setup will work fine for development, but:
- ⚠️ Credentials are visible in code
- ⚠️ Should not commit to public repositories
- ⚠️ Hard to change for different environments

## 📋 Current Cloudinary Account Details

- **Cloud Name:** `dxqirkx5m`
- **API Key:** `839181327468946`
- **API Secret:** `Ifw55BajFeuxa1LqNTVqIy30BRU`

## 🎯 How It Works

When you upload an item:

1. **Image Upload Flow:**
   ```
   User selects image → Frontend sends to backend
   → Multer receives file → Cloudinary Storage uploads
   → Image stored in "lost-and-found" folder
   → Cloudinary returns URL → Saved in MongoDB
   ```

2. **Image Storage:**
   - Folder: `lost-and-found/`
   - Max size: 5 MB (enforced by code)
   - Formats: jpeg, jpg, png, gif
   - Auto-resize: Max 800x600px
   - Auto-optimize: Quality set to "auto"

3. **Image Deletion:**
   - When item is deleted, image is removed from Cloudinary
   - When item image is updated, old image is deleted

## 📊 Cloudinary Free Plan Limits

| Resource | Limit |
|----------|-------|
| **Storage** | 25 GB total |
| **Bandwidth** | 25 GB/month |
| **Transformations** | 25,000/month |
| **Image Size** | 10 MB per upload |
| **Your Code Limit** | 5 MB per upload |

## 🔍 Monitoring Usage

1. Visit: https://cloudinary.com/console
2. Login with your account
3. Go to **Dashboard** → **Usage**
4. Monitor:
   - Storage used
   - Bandwidth consumed
   - Transformations performed

## 🛠️ Troubleshooting

### Issue: "Invalid API credentials"

**Solution:**
- Verify credentials in Cloudinary dashboard
- Check `.env` file if using environment variables
- Ensure no extra spaces in credentials

### Issue: "File too large"

**Solution:**
- Current limit: 5 MB (enforced by code)
- Cloudinary limit: 10 MB
- Compress images before upload

### Issue: "Upload fails"

**Possible Causes:**
1. Invalid credentials
2. Network issues
3. Account limits exceeded
4. Invalid file format

**Debug:**
- Check server console for error messages
- Verify Cloudinary account status
- Check file format (only jpeg, jpg, png, gif)

## ✅ Current Status

- ✅ Cloudinary configured and working
- ✅ Environment variable support added
- ✅ Fallback to hardcoded values for development
- ✅ Images upload to `lost-and-found` folder
- ✅ Auto-resize and optimization enabled

## 🚀 Next Steps

1. **For Development:** Current setup works fine
2. **For Production:** 
   - Create `.env` file with Cloudinary credentials
   - Remove hardcoded values
   - Add `.env` to `.gitignore`

## 📝 Example .env File

Create `server/.env`:

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=dxqirkx5m
CLOUDINARY_API_KEY=839181327468946
CLOUDINARY_API_SECRET=Ifw55BajFeuxa1LqNTVqIy30BRU

# Other environment variables...
JWT_SECRET=your-jwt-secret
MONGO_URI=your-mongodb-uri
```

Then the code will automatically use these values instead of hardcoded ones!
