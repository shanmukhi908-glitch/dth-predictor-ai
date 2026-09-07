# Render Deployment Guide: DTH Machine Learning Prediction System

This guide outlines the step-by-step procedure to deploy the **FastAPI + XGBoost backend** and the **React + Vite frontend** to [Render](https://render.com/).

---

## 1. Architecture Overview

```
                          ┌────────────────────────┐
                          │  Render Static Site    │
                          │   (React + Vite SPA)   │
                          │   Port: CDN / 443      │
                          └───────────┬────────────┘
                                      │
                 HTTPS Requests       │  VITE_API_BASE_URL
             (POST /api/predict, etc) │
                                      ▼
                          ┌────────────────────────┐
                          │   Render Web Service   │
                          │    (FastAPI Server)    │
                          │  uvicorn on 0.0.0.0:$PORT
                          └───────────┬────────────┘
                                      │
                    In-Memory Inference Engine
                                      │
               ┌──────────────────────┴──────────────────────┐
               ▼                                             ▼
  backend/models/xgboost_agronomy_model.pkl    backend/models/scaler.pkl
  backend/models/feature_columns.json          backend/data/Pheno.csv
```

---

## 2. Step 1: Push Code to GitHub

Ensure all files (including model artifacts and dataset) are committed and pushed to your GitHub repository:

```bash
git add .
git commit -m "Prepare project for Render deployment"
git push origin main
```

> **Artifact Verification**: Confirm that `backend/models/xgboost_agronomy_model.pkl` (1.80 MB), `backend/models/scaler.pkl` (86.5 KB), `backend/models/feature_columns.json`, and `backend/data/Pheno.csv` are present in your GitHub repository.

---

## 3. Step 2: Deploy Backend as a Render Web Service

Deploy the backend first so you obtain its public URL (e.g., `https://dth-backend.onrender.com`).

1. Log in to [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** $\to$ select **Web Service**.
3. Connect your GitHub repository.
4. Configure the Web Service settings exactly as follows:

| Field | Setting / Value | Notes |
| :--- | :--- | :--- |
| **Name** | `dth-prediction-backend` | Or any unique name of your choice |
| **Region** | Singapore / Frankfurt / Oregon | Choose the region closest to your users |
| **Branch** | `main` | Or your production branch |
| **Root Directory** | `backend` | **Crucial**: sets the execution context to `backend/` |
| **Runtime** | `Python 3` | Standard Python runtime |
| **Build Command** | `pip install -r requirements.txt` | Installs FastAPI, Uvicorn, XGBoost, Scikit-learn, etc. |
| **Start Command** | `uvicorn main:app --host 0.0.0.0 --port $PORT` | Starts Uvicorn bound to Render's dynamic `$PORT` |
| **Instance Type** | `Free` | Free tier provides 512 MB RAM |

5. Under **Environment Variables**, add:

| Key | Value | Purpose |
| :--- | :--- | :--- |
| `PYTHON_VERSION` | `3.10.12` | Ensures a modern, stable Python 3 environment |
| `FRONTEND_URL` | `https://YOUR-FRONTEND.onrender.com` | (Optional) Restricts CORS to your frontend once deployed |

6. Under **Advanced** $\to$ **Health Check Path**:
   - Set to: `/api/health`
7. Click **Create Web Service**.
8. Wait for the build to complete. Once deployed, verify your backend by visiting:
   - Health Check: `https://YOUR-BACKEND.onrender.com/api/health`
   - Interactive Swagger Docs: `https://YOUR-BACKEND.onrender.com/docs`
9. Copy your backend URL (e.g., `https://dth-prediction-backend.onrender.com`).

---

## 4. Step 3: Deploy Frontend as a Render Static Site

Deploy the React frontend and connect it to the live backend.

1. In Render Dashboard, click **New +** $\to$ select **Static Site**.
2. Connect the same GitHub repository.
3. Configure the Static Site settings:

| Field | Setting / Value | Notes |
| :--- | :--- | :--- |
| **Name** | `dth-prediction-frontend` | Or any unique name of your choice |
| **Branch** | `main` | Production branch |
| **Root Directory** | *(Leave Empty)* | Builds from the root of the repository |
| **Build Command** | `npm install && npm run build` | Compiles TypeScript and creates optimized Vite bundle |
| **Publish Directory** | `dist` | Directory containing the compiled `index.html` and assets |

4. Under **Environment Variables**, add:

| Key | Value | Notes |
| :--- | :--- | :--- |
| `VITE_API_BASE_URL` | `https://YOUR-BACKEND.onrender.com` | Replace with your actual backend URL from Step 2 |

5. Configure **Redirects / Rewrites** for Single Page Application (SPA):
   - Go to the **Redirects/Rewrites** tab on your Static Site.
   - Add a rule:
     - **Type**: `Rewrite`
     - **Source**: `/*`
     - **Destination**: `/index.html`
   - This ensures that browser refreshes on routes like `/analytics` or `/methodology` do not return 404.

6. Click **Create Static Site**.
7. Once the build finishes, open the generated static site URL (e.g., `https://dth-prediction-frontend.onrender.com`).

---

## 5. Important Production Behaviors

1. **Render Free Tier Cold Starts**:
   - Free Web Services on Render spin down after 15 minutes of inactivity.
   - When a user visits after inactivity, the backend takes ~30–50 seconds to boot up.
   - The frontend API service has a configured **45-second timeout** and friendly user alerts to allow cold-starts to wake up cleanly without timing out prematurely.
2. **Disabled Mock Fallback in Production**:
   - In production mode (`import.meta.env.PROD`), mock predictions are **strictly disabled**.
   - If the backend is unavailable or an error occurs, the UI displays the genuine server error message rather than producing synthetic/calibrated values.
3. **CORS Flexibility**:
   - The backend automatically permits requests from `FRONTEND_URL` and `http://localhost:5173` / `http://127.0.0.1:5173` simultaneously.
