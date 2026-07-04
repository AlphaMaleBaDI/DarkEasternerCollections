# Dark Easterner Collections — Project Status

> **Single source of truth for project state, decisions, and roadmap.**

---

## Current Version

```
v1.0.0-phase1
```

**Branch:** `production`  
**Status:** Production Ready — Client Content Phase  
**Build:** Passing  
**Last Milestone:** Phase 1 Production Closeout

---

## What is Live

| System | Status | Notes |
|---|---|---|
| CMS / Admin Panel | Complete | /admin — product management, media upload, inventory |
| Product Catalogue | Complete | Dynamic from Supabase products table |
| Inventory System | Complete | available / coming_soon / out_of_stock |
| Inquiry Workflow | Complete | WhatsApp-linked, multi-product inquiry tray |
| Mobile Experience | Complete | Responsive, touch-optimised |
| Social Integration | Complete | Instagram, YouTube, WhatsApp |
| Branding | Complete | Dark Easterner identity, typography, luxury palette |
| Security | Complete | Supabase RLS, auth-gated admin |
| Production Build | Passing | 0 errors, 0 lint warnings |
| Repository | Clean | No debug files, no placeholder assets |

---

## Categories

| Slug | Display Name |
|---|---|
| men | Men of Class |
| women | The Elegant Woman |
| hair | Her Crown Collection |
| perfumes | Signature Fragrances |

---

## Architecture Decisions (Phase 1)

| Decision | Choice | Rationale |
|---|---|---|
| Framework | Next.js 15 + Turbopack | Performance + SSR/ISR for luxury catalogue |
| Database | Supabase (PostgreSQL) | Real-time, RLS, Auth, Storage in one platform |
| Styling | Tailwind CSS + custom tokens | Precise luxury design system |
| Images | Supabase Storage via Next.js Image | Client-controlled uploads, CDN-optimised |
| State | React Context (InquiryContext) | Lightweight; no Redux overhead for v1 |
| CMS | Custom Admin (/admin) | Client can manage without third-party tools |

---

## Deferred — Phase 2 Candidates

These were explicitly scoped out of Phase 1 to protect simplicity and delivery speed.

- AI product recommendations
- Behavioural personalisation engine
- Curated filtering / smart search
- Customer intelligence / analytics
- CRM integration
- Loyalty / referral system

Principle applied: Build for today's business needs, design architecture that supports tomorrow's capabilities.

---

## Client Content Phase (Current)

The code is complete. The client now populates the boutique.

Required before Phase 2 planning:

- [ ] Upload authentic product photography (wigs)
- [ ] Upload authentic product photography (fragrances)
- [ ] Upload authentic product photography (men's fashion)
- [ ] Upload authentic product photography (women's fashion)
- [ ] Configure inventory status per product
- [ ] Verify WhatsApp inquiry flow end-to-end
- [ ] Verify YouTube link resolves correctly
- [ ] Verify Instagram profile link
- [ ] Verify mobile experience on real devices

---

## Branch Strategy

  main
  |
  +-- production   <- Live site. Protected. v1.0.0-phase1
  |
  +-- phase-2-*   <- Future feature branches (create when ready)

Rule: Never develop directly on production. All changes go through main or feature branches, then merge to production.

---

## Restore Point

If a regression is introduced in Phase 2 or later, compare against:

  git checkout v1.0.0-phase1

This tag represents a known-good, fully tested production baseline.

---

## Contributors

Lead Developer: Christopher
Project: Dark Easterner Collections
Client: Cynthia
Delivery: Phase 1 - July 2026
