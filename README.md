# Taqueria Website

This is a full-stack web application for a taqueria business, built with a React + Vite frontend and an Express + Supabase backend using TypeScript on both ends.

The site includes multi-language support (i18n), responsive design, account registration with email verification, dark mode, and persistent data storage.

---

## Features

- Account signup, login, and email verification using JWT
- Responsive design and dark mode toggle
- Multi-language UI via context-based i18n
- Persistent data storage via Supabase
- Secure password hashing using bcrypt
- Loading/error indicators on data fetching
- Server-client API design using REST principles
- Login access is available through the settings modal

---

## Tech Stack

**Frontend**
- Vite + React + TypeScript
- TailwindCSS
- React Router

**Backend**
- Express.js + TypeScript
- Supabase (PostgreSQL)
- JWT for authentication
- Nodemailer for email verification

---

## Requirements Met

- ✅ MVP implemented: User signup, verification, login (via modal), with placeholder business features
- ✅ User Authentication: hashed passwords, login with JWTs, email verification
- ✅ Persistent Data: stored in Supabase with CRUD endpoints
- ✅ Responsive Design: viewable on all screen sizes
- ✅ Minimal Accessibility Issues
- ✅ Dark Mode Toggle included
- ✅ Uses ExpressJS on backend and React on frontend
- ✅ TypeScript used throughout both client and server
- ✅ API design follows REST conventions
- ✅ Error and loading indicators implemented

---

## Setup Instructions

### 1. Clone the Repositories

- Frontend:  
  ```bash
  git clone https://github.com/yourusername/taqueria-frontend
  ```

- Backend:  
  ```bash
  git clone https://github.com/yourusername/taqueria-backend
  ```

---

### 2. Environment Variables

#### Frontend (`.env`)
```env
VITE_API_BASE=https://your-backend-domain.com
```

#### Backend (`.env`)
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-supabase-key
JWT_SECRET=your-jwt-secret
SMTP_USER=youremail@example.com
SMTP_PASS=your-email-password
SMTP_HOST=smtp.gmail.com
SMTP_FROM=no-reply@yourdomain.com
```

---

### 3. Install Dependencies

#### Frontend
```bash
cd taqueria-frontend
npm install
```

#### Backend
```bash
cd taqueria-backend
npm install
```

---

### 4. Run the Development Servers

#### Frontend
```bash
npm run dev
```

#### Backend
```bash
npm run dev
```

Ensure ports and API URLs match in your `.env` file.

---

## Deployment Notes

- Frontend is deployed via [Vercel](https://vercel.com/)
- Backend is deployed separately via Vercel
- Environment variables are set with production keys/URLs in the deployment platform's dashboard

---

## Note

The login and logout functionality is not exposed prominently in the main navigation. It is intentionally tucked away in the **Settings modal**, as authentication is not a primary user-facing feature of this business-oriented site. (This was done mostly because my 437 project required it).

---

## License

MIT License.
