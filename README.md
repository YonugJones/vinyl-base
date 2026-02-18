# 🎵 Vinyl-Base 🎵

Vinyl-Base is a modern, UX-first personal vinyl collection manager built with Next.js, TypeScript, PostgreSQL, and Prisma.

Unlike marketplace-driven platforms, Vinyl-Base is designed around the collector — not buying or selling. The focus is on beautifully organizing, browsing, and tracking your personal record collection with speed, clarity, and thoughtful design.

---

## Purpose

Vinyl-Base solves a simple problem:

> Keep track of what you own, what it cost, how it sounds, and where it lives — in one clean, distraction-free interface.

This project emphasizes:

- Fast record entry
- Clean browsing experience (grid and list views)
- Detailed copy-level tracking (condition, notes, purchase info)
- Personal insights and collection statistics
- Dark-first, media-focused design

---

## Tech Stack

- Next.js (App Router)
- TypeScript
- PostgreSQL
- Prisma ORM
- Better Auth
- Tailwind CSS
- shadcn/ui

---

## Data Model

The application separates record metadata from personal ownership details.

### Release

Canonical record metadata:

- Artist
- Title
- Year
- Label
- Cover art
- Genre information

### Copy

Your owned version of a release:

- Purchase date
- Purchase price
- Media condition
- Sleeve condition
- Notes
- Storage location
- Favorite status

---

## Core Features (MVP)

- Secure authentication
- Add and manage records in your collection
- Track purchase details and condition
- View collection in grid or list layouts
- Record detail pages with notes and metadata
- Dark-first UI optimized for album artwork display
