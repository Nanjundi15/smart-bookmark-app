<div align="center">

# 📖 Smart Bookmark

**A full-stack bookmark manager with secure auth, real-time sync, and zero-trust data isolation — built end-to-end on the Next.js App Router and Supabase.**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Postgres%20%2B%20Realtime-3ECF8E?logo=supabase)](https://supabase.com/)
[![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38BDF8?logo=tailwindcss)](https://tailwindcss.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)](https://vercel.com/)

[Live Demo](#) · [Report Bug](#) · [Author](https://www.linkedin.com/in/nanjundi-k/)

</div>

---

## Why this project

Most bookmark-manager tutorials stop at CRUD. This one is built the way a production app would be: **Postgres Row Level Security as the actual security boundary** (not just an app-layer check), **Supabase Realtime channels** for cross-tab sync, and **Google OAuth** with proper redirect handling — wired together on the Next.js 14 App Router with strict TypeScript throughout.

It's a small surface area used to demonstrate a complete, defensible stack: auth → database → realtime → deployment.

---

## ✨ Features

| Feature | Detail |
|---|---|
| 🔐 **Google OAuth** | One-click sign-in via Supabase Auth, no passwords stored |
| 🛡️ **Row Level Security** | Every query is scoped to `auth.uid()` at the database layer — a user literally cannot fetch another user's rows, even with a compromised API key |
| ⚡ **Real-Time Sync** | Supabase Realtime channels push add/delete events instantly across open tabs/devices |
| 🗂️ **Bookmark CRUD** | Add, view, and delete bookmarks with optimistic UI updates |
| 🎨 **Modern UI** | Glassmorphism design, animated transitions, fully responsive |
| ☁️ **Cloud-Native** | Supabase Postgres + Vercel edge deployment, zero server management |

---

## 🧱 Tech Stack

```
Frontend     Next.js 14 (App Router) · TypeScript · Tailwind CSS
Backend      Supabase (Auth, Database, Realtime)
Database     PostgreSQL with Row Level Security
Auth         Google OAuth via Supabase Auth
Deployment   Vercel
```

---

## 🏗️ Architecture

```
┌─────────────┐      OAuth login       ┌──────────────────┐
│   Browser   │ ─────────────────────▶ │  Supabase Auth    │
│  (Next.js)  │ ◀───────────────────── │   (Google OAuth)   │
└──────┬──────┘      session/JWT       └──────────────────┘
       │
       │  authenticated queries (JWT-scoped)
       ▼
┌─────────────────────┐         RLS: auth.uid() = user_id
│  Supabase Postgres   │ ◀────────────────────────────────
│   bookmarks table     │
└──────┬───────────────┘
       │  Realtime channel (INSERT/DELETE events)
       ▼
┌─────────────┐
│  All open    │   → state updates instantly, no polling, no refresh
│  tabs/devices│
└─────────────┘
```

**Security model:** Authorization isn't an `if` statement in a route handler — it's a Postgres policy. Even a direct, unauthenticated call to the database would be rejected by RLS unless the JWT's `auth.uid()` matches the row's `user_id`.

---

## 📂 Project Structure

```
smart-bookmark-app/
├─ app/
│  ├─ page.tsx              → Landing / Login
│  ├─ dashboard/
│  │  └─ page.tsx           → Bookmark manager UI
│  ├─ layout.tsx
│  └─ globals.css
├─ lib/
│  └─ supabase.ts           → Typed Supabase client
├─ public/
├─ .env.local
└─ package.json
```

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/Nanjundi15/smart-bookmark-app.git
cd smart-bookmark-app
npm install
```

### 2. Configure Supabase

**Create a project** at [supabase.com](https://supabase.com) and grab your **Project URL** + **Anon Key**.

**Enable Google OAuth:**
`Supabase → Authentication → Providers → Google → Enable`

**Create the schema** (SQL Editor):
```sql
create table bookmarks (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users not null,
  title text,
  url text,
  created_at timestamp default now()
);

alter table bookmarks enable row level security;

create policy "Users can view own bookmarks"
  on bookmarks for select using (auth.uid() = user_id);

create policy "Users can insert own bookmarks"
  on bookmarks for insert with check (auth.uid() = user_id);

create policy "Users can delete own bookmarks"
  on bookmarks for delete using (auth.uid() = user_id);
```

**Set redirect URLs:**
`Supabase → Authentication → URL Configuration`
```
Site URL:      https://your-vercel-url.vercel.app
Redirect URLs: https://your-vercel-url.vercel.app
               https://your-vercel-url.vercel.app/dashboard
```

### 3. Environment Variables
```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

### 4. Run
```bash
npm run dev
# → http://localhost:3000
```

---

## ☁️ Deploy to Vercel

1. Push to GitHub
2. Import the repo at [vercel.com](https://vercel.com)
3. Add the two environment variables above
4. Deploy

---

## ✅ Testing Checklist

- [x] Google OAuth login flow
- [x] Add / delete bookmarks
- [x] Real-time sync verified across 2+ tabs
- [x] RLS verified — cross-user data access blocked at the DB layer
- [x] Logout redirect
- [x] Mobile responsive layout
- [x] UI animations / transitions

---

## 🗺️ Roadmap

- [ ] Tagging & folder organization
- [ ] Full-text search across saved bookmarks
- [ ] Browser extension for one-click save
- [ ] Auto-fetch page metadata (title, favicon, preview image)

---

## 👤 Author

**Nanjundeshwara K (Nanjundi)**
Full-Stack Developer · Next.js · Supabase · Cloud

[Portfolio](https://nanjundeshwarak-portfolio.netlify.app) · [GitHub](https://github.com/Nanjundi15) · [LinkedIn](https://www.linkedin.com/in/nanjundi-k/)
