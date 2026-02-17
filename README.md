

# Smart Bookmark App 📖🚀

A modern **Smart Bookmark Web Application** built with **Next.js + Supabase** that allows users to securely save, organize, and manage their favorite links with Google authentication and real-time sync.

---

## 🌟 Features

* Google OAuth Login
* Add / Delete Bookmarks
* Private User Data (Row Level Security)
* Real-Time Sync Across Tabs
* Animated Modern UI
* Background Effects & Glass Design
* Responsive Layout
* Deployed on Vercel
* Secure Cloud Database

---

## 🧱 Tech Stack

| Layer      | Technology            |
| ---------- | --------------------- |
| Frontend   | Next.js (App Router)  |
| Backend    | Supabase              |
| Database   | PostgreSQL (Supabase) |
| Auth       | Google OAuth          |
| Styling    | Tailwind CSS          |
| Realtime   | Supabase Channels     |
| Deployment | Vercel                |

---

## 📂 Project Structure

```
smart-bookmark-app/
│
├─ app/
│   ├─ page.tsx          → Welcome / Login Page
│   ├─ dashboard/
│   │    └─ page.tsx     → Bookmark Manager UI
│   ├─ layout.tsx
│   └─ globals.css
│
├─ lib/
│   └─ supabase.ts       → Supabase Client
│
├─ public/               → Images / Assets
├─ .env.local
└─ package.json
```

---

## ⚙️ Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/smart-bookmark-app.git
cd smart-bookmark-app
```

### 2. Install Dependencies

```bash
npm install
```

---

## 🔑 Supabase Setup

### Step 1 – Create Supabase Project

* Go to [https://supabase.com](https://supabase.com)
* Create new project
* Copy **Project URL** and **Anon Key**

---

### Step 2 – Enable Google OAuth

Supabase → Authentication → Providers → Google → Enable

---

### Step 3 – Create Database Table

Run in SQL Editor:

```sql
create table bookmarks (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users not null,
  title text,
  url text,
  created_at timestamp default now()
);
```

---

### Step 4 – Row Level Security (RLS)

Enable RLS and add policies:

**SELECT**

```
auth.uid() = user_id
```

**INSERT**

```
auth.uid() = user_id
```

**DELETE**

```
auth.uid() = user_id
```

---

## 🌍 Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

---

## ▶️ Run Locally

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

## 🚀 Deployment (Vercel)

1. Push project to GitHub
2. Go to [https://vercel.com](https://vercel.com)
3. Import repository
4. Add Environment Variables
5. Deploy

---

## 🔗 Supabase URL Configuration

Supabase → Authentication → URL Configuration

**Site URL**

```
https://your-vercel-url.vercel.app
```

**Redirect URLs**

```
https://your-vercel-url.vercel.app
https://your-vercel-url.vercel.app/dashboard
```

---

## 🔐 Security

* Uses Supabase Row Level Security
* User-specific data isolation
* OAuth secure authentication
* No passwords stored

---

## 🧪 Testing Checklist

* Google Login Works
* Bookmark Add/Delete
* Real-Time Sync in 2 Tabs
* Logout Redirect
* Mobile Responsive
* UI Animations


## 👤 Author

**Nanjundi K**
Full-Stack Developer | Next.js | Supabase | Cloud

