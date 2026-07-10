# Earl Onipa — Portfolio

Simple static portfolio served by a tiny Express server, ready to deploy on Railway.

## Deploy to Railway

**Option A — GitHub (recommended)**
1. Push this folder to a new GitHub repo.
2. On [railway.app](https://railway.app), click **New Project → Deploy from GitHub repo**.
3. Select the repo. Railway auto-detects Node.js, runs `npm install`, then `npm start`.
4. Once deployed, click the generated URL (or add a custom domain under **Settings → Domains**).

**Option B — Railway CLI**
```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

## Run locally
```bash
npm install
npm start
```
Visit http://localhost:3000

## Edit content
All page content lives in `public/index.html`. No build step — just edit and redeploy.
