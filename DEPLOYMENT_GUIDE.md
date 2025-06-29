# monVOX Deployment Guide

## 🔐 **Secure GitHub Integration Deployment**

This guide explains how to properly deploy monVOX with secure GitHub integration following the multi-tier secrets management architecture.

---

## 📁 **Current Setup (Development)**

### **Local Development**
- **GitHub credentials**: Stored in `specialenv/.env` (gitignored)
- **API integration**: Uses MockGitHubService for testing
- **Security**: Token never exposed in app bundle

### **Project Configuration**
- **Repository**: `ales27pm/monVOX`
- **Account**: `ales27pm`
- **Token**: `ghp_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` (stored securely in specialenv)

---

## 🚀 **Production Deployment Strategy**

### **1. Backend Proxy Setup (Recommended)**

For production deployment, implement a secure backend proxy:

```typescript
// Backend API endpoint (Node.js/Express example)
app.post('/api/github/proxy', authenticateUser, async (req, res) => {
  const { endpoint, method, data } = req.body;
  
  // GitHub token stored as server environment variable
  const response = await fetch(`https://api.github.com${endpoint}`, {
    method,
    headers: {
      'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
    },
    body: data ? JSON.stringify(data) : undefined,
  });
  
  const result = await response.json();
  res.json({ success: true, data: result });
});
```

### **2. Update SecretsManager**

Update the backend proxy URL in `SecretsManager.ts`:

```typescript
// In production, point to your secure backend
const AppConfig = {
  API_BASE_URL: 'https://your-secure-backend.com',
  // ... other config
};
```

### **3. Environment Variables for Backend**

On your backend server, set:
```bash
GITHUB_TOKEN=ghp_YOUR_GITHUB_TOKEN_HERE
GITHUB_REPO=monVOX
GITHUB_OWNER=ales27pm
```

---

## 🔧 **Alternative Deployment Options**

### **Option A: Environment Variables (Less Secure)**
If you need to include the token in the app (not recommended):

1. Add to your CI/CD environment:
   ```bash
   EXPO_PUBLIC_GITHUB_TOKEN=ghp_YOUR_GITHUB_TOKEN_HERE
   ```

2. Update `ProjectConfig.ts`:
   ```typescript
   export const getSecureGitHubToken = (): string | null => {
     return process.env.EXPO_PUBLIC_GITHUB_TOKEN || null;
   };
   ```

⚠️ **Warning**: This exposes the token in the app bundle and is not recommended for production.

### **Option B: Dynamic Token Fetching**
Fetch tokens dynamically from a secure endpoint:

```typescript
export const getSecureGitHubToken = async (): Promise<string | null> => {
  try {
    const response = await fetch('https://your-auth-service.com/github-token', {
      headers: {
        'Authorization': `Bearer ${userJwtToken}`,
      },
    });
    
    const { token } = await response.json();
    return token;
  } catch (error) {
    console.error('Failed to fetch GitHub token:', error);
    return null;
  }
};
```

---

## 🛡️ **Security Best Practices**

### **DO**
- ✅ Use backend proxy for GitHub API calls
- ✅ Store tokens as server environment variables
- ✅ Implement user authentication before GitHub access
- ✅ Use HTTPS for all communication
- ✅ Log API usage (but never tokens)
- ✅ Rotate tokens regularly

### **DON'T**
- ❌ Include tokens in app bundle (React Native)
- ❌ Store tokens in AsyncStorage or any client storage
- ❌ Log tokens in any form
- ❌ Commit tokens to version control
- ❌ Use tokens with overly broad permissions

---

## 📋 **Pre-Deployment Checklist**

- [ ] Backend proxy implemented and tested
- [ ] GitHub token moved to server environment
- [ ] App configured to use production API endpoints
- [ ] Security scan passes (`npm run security-check`)
- [ ] Mock services disabled in production builds
- [ ] User authentication implemented
- [ ] Rate limiting configured on backend
- [ ] Monitoring and logging set up

---

## 🔍 **Verification Commands**

```bash
# Verify no secrets in codebase
npm run security-check

# Test GitHub integration (development)
# Should show mock data in development
# Should use real API in production via proxy

# Check app configuration
echo "Repository: ales27pm/monVOX"
echo "Mock mode: $(__DEV__ ? 'Yes' : 'No')"
```

---

## 📞 **Support**

For deployment assistance or security questions:
- **Repository**: [ales27pm/monVOX](https://github.com/ales27pm/monVOX)
- **Issues**: Create an issue on GitHub for support

---

**Remember**: The current setup with `specialenv/.env` is for development only. Always use a secure backend proxy for production deployments to protect your GitHub credentials!