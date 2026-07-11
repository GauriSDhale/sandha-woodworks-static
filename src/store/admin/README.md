# Admin Panel Architecture

## Overview

This directory is reserved for the future Admin Panel. The store's
data layer and Redux slices are already architected to support admin
operations without changes.

## Planned Modules

### Products
- CRUD operations for products
- Image upload & management
- Stock management
- Bulk import/export (CSV)

### Categories
- Category tree management
- SEO metadata per category
- Category image management

### Orders
- Order list with filtering & search
- Order status updates
- Refund processing
- Invoice regeneration

### Users
- User list
- Order history per user
- Address management

### Coupons
- Create/edit/delete coupon codes
- Usage tracking
- Expiry management

### Inventory
- Stock level alerts
- Reorder triggers
- Stock history

### Dashboard
- Revenue metrics
- Top products
- Recent orders
- Traffic overview

## API Architecture

All admin operations will communicate through:
`/api/admin/[resource]` routes (Next.js Route Handlers)

Authentication: JWT via `next-auth` or custom middleware.

## Folder Structure (when building)

```
src/
  app/
    admin/
      layout.tsx          (protected admin layout)
      page.tsx            (dashboard)
      products/
        page.tsx
        new/page.tsx
        [id]/page.tsx
      orders/
        page.tsx
        [id]/page.tsx
      users/
        page.tsx
      categories/
        page.tsx
      coupons/
        page.tsx
      inventory/
        page.tsx
  components/
    admin/
      AdminSidebar.tsx
      DataTable.tsx
      StatsCard.tsx
      ProductForm.tsx
      OrderDetail.tsx
  lib/
    admin/
      auth.ts
      permissions.ts
```
