# Next.js Setup & Migration Guide for Miraya Diamonds

This project is structured so it can run seamlessly as a **Next.js App Router** application (e.g. for deployment to Vercel, AWS Amplify, or local development) while maintaining 100% compatibility with the AI Studio dev server.

---

## 📁 Next.js Directory Structure

The Next.js App Router entry points are already pre-configured in the repository:

```
├── app/
│   ├── layout.tsx       # Root Next.js layout with Google Fonts, metadata & global CSS
│   └── page.tsx         # Root Next.js page ('use client') mounting Miraya Diamonds App
├── next.config.mjs      # Next.js configuration with remote image domain support
├── src/                 # All React components, data models, state, and assets
└── public/              # Static public assets
```

---

## 🚀 Running with Next.js Locally

1. **Install Next.js dependencies**:
   ```bash
   npm install next@latest react@19 react-dom@19
   ```

2. **Update `package.json` scripts** (for Next.js mode):
   ```json
   {
     "scripts": {
       "dev": "next dev -p 3000",
       "build": "next build",
       "start": "next start -p 3000"
     }
   }
   ```

3. **Start the Next.js development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application running on Next.js.

---

## ⚡ Deploying to Vercel

1. Push your repository to GitHub / GitLab.
2. Import the project into [Vercel](https://vercel.com).
3. Vercel will automatically detect `next.config.mjs` and the `app/` folder as a **Next.js App Router** project.
4. Click **Deploy**.
