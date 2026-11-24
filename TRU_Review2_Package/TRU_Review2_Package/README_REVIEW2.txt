TRU - PROJECT REVIEW 2 PACKAGE
================================

IMPORTANT: Your original TRU project is preserved in the folder:
  original-tru/
It contains the original HTML/CSS/JavaScript modules plus the latest uploaded
core.js, index.html, runner.js and README.txt. The original project files were
not edited in place; the original ZIP is also included unchanged.

REVIEW 2 REACT + VITE PROJECT
  react-vite/

Modules included in the React + Vite version:
1. User Module
   - Signup and login
   - Home feed
   - Create post
   - Like posts
   - Profile page
2. Admin Module
   - Separate admin login role
   - Admin dashboard
   - View registered users
   - View total users and posts
   - Delete posts
3. Local Storage
   - User accounts stored in localStorage
   - Posts stored in localStorage
   - Login session stored in sessionStorage

RUN LOCALLY
1. Install Node.js (LTS) if it is not installed.
2. Open the react-vite folder in VS Code.
3. Open Terminal in that folder.
4. Run:
      npm install
      npm run dev
5. Open the localhost URL shown in the terminal.

DEMO LOGIN
Admin:
  Email: admin@tru.com
  Password: Admin@123

User:
  Email: meena@tru.com
  Password: Meena@123

DEPLOY TO VERCEL
1. Push the react-vite folder contents to a GitHub repository.
2. In Vercel, choose Add New -> Project and import the repository.
3. Set Root Directory to react-vite if the repository contains this full package.
4. Framework Preset: Vite
5. Build Command: npm run build
6. Output Directory: dist
7. Deploy and test the deployed URL.

GITHUB COMMANDS (run inside react-vite folder after creating the repository)
  git init
  git add .
  git commit -m "TRU Project Review 2 - React Vite"
  git branch -M main
  git remote add origin YOUR_GITHUB_REPOSITORY_URL
  git push -u origin main

VERCEL ROUTING
  vercel.json is included for SPA routing.

NOTE
This package provides the React + Vite Review 2 implementation separately so
the original TRU project remains available and unchanged in original-tru/.
The demo credentials are for academic demonstration only. This is a frontend
Local Storage project; do not use real passwords or sensitive personal data.
