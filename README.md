# SmileCraft Dental - High-Fidelity Clinical System

A premium, production-ready dental clinic website featuring a real-time clinical backend, patient portal, and interactive treatment simulator.

## 🚀 Admin Access
For testing and practice management, use the following credentials to access the protected dashboard at `/admin`:

- **URL**: `http://localhost:3000/api/auth/signin` (Select Credentials) or go to `/admin/dashboard`
- **Email**: `admin@smilecraft.com`
- **Password**: `admin1234`

## 🛠️ Tech Stack
- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS 4
- **Database**: PostgreSQL (Supabase) with Prisma ORM
- **Auth**: NextAuth.js (Google & Credentials)
- **Email**: Resend (Transactional confirmations)
- **SMS**: Mock SMS Service (Development mode)
- **Simulator**: GSAP & Framer Motion interactive UI

## 🏗️ Getting Started
1. **Install Dependencies**: `npm install`
2. **Environment**: Ensure `.env` is configured (see `.env.example`).
3. **Database**: `npx prisma db push` to sync Supabase.
4. **Seed Data**: `npx prisma db seed` to populate doctors and services.
5. **Run**: `npm run dev`

---
*SmileCraft Dental: Clinical Excellence, Redefined.*
