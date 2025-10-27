# Quick Deployment Instructions

Your prototype is built and ready to deploy! 🚀

## ✅ What's Ready

- ✅ Project is built and optimized
- ✅ SPA routing support is configured (200.html file added)
- ✅ All files are in the `dist/` directory

## 🎯 Deploy in 3 Minutes

### Step 1: Navigate to the dist folder
```bash
cd /Users/yxing/Downloads/pf-dev/patternfly-react-seed/dist
```

### Step 2: Run Surge
```bash
surge
```

### Step 3: Follow the prompts
- **First time?** Create an account:
  - Enter your **email address**
  - Choose a **password** (Surge will create an account)
  - Press Enter
- **Domain?** Enter a name like:
  - `patternfly-uxd-prototype` or
  - `rhcl-dev-portal` or  
  - Any unique name you like
- **Press Enter** to confirm
- You're done! 🎉

Your prototype will be live at:
```
https://your-chosen-name.surge.sh
```

## 📝 Example Session

```bash
$ cd /Users/yxing/Downloads/pf-dev/patternfly-react-seed/dist
$ surge

   Welcome to surge! (surge.sh)
   Login or create surge account by entering email & password.

email: your-email@example.com
password: [enter password]

     Surge - surge.sh
     Abridged output of your surged site.

domain: patternfly-uxd-prototype
       163.172.146.131
       Running on all cores

        Want to use a custom domain? CNAME your domain to ns1.surge.sh

              success! Published to patternfly-uxd-prototype.surge.sh
```

## 🔄 Updating Your Deployment

To update your prototype after making changes:

1. Build again:
   ```bash
   cd /Users/yxing/Downloads/pf-dev/patternfly-react-seed
   npm run build
   cd dist
   ```

2. Deploy to the same domain:
   ```bash
   surge ./ patternfly-uxd-prototype.surge.sh
   ```

## 🌐 Other Deployment Options

See [DEPLOYMENT.md](./DEPLOYMENT.md) for instructions on:
- **Vercel** (easiest with GitHub integration)
- **Netlify** (similar to Vercel)
- **GitHub Pages** (free hosting from GitHub)

## 📤 Share Your Prototype

Once deployed, share the URL with:
- Engineering team
- Design team  
- Stakeholders
- Users for feedback

Example:
```
Hey team! Check out the UXD prototype:
https://patternfly-uxd-prototype.surge.sh

Features:
- Developer Portal with API list
- API Details pages (Overview, Definition, Policy)
- Role-based access (API Consumer, API Owner, Platform Engineer)
- Filtering and starring functionality
```

---

**Need help?** Check [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment options.

