# eCommerce Backend (Upgraded)

This repository has been upgraded with stronger multi-vendor backend capabilities.

## What Was Added

- JWT-based authentication token in login response.
- Role-based authorization middleware.
- Vendor-owned product management APIs.
- Product schema now supports `vendorId` and `isActive`.

## Environment Variables

Add these to `.env`:

```env
PORT=8000
API_URL='/api/v1'
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_strong_jwt_secret
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

## Install and Run

```bash
npm install
npm start
```

## Auth Flow

1. Call `POST /api/v1/auth/login`.
2. Receive `token` in response.
3. Send token as `Authorization: Bearer <token>`.

## New Vendor APIs

Base: `/api/v1/vendor`

- `POST /products` (merchant/admin only)
  - multipart form-data
  - image field: `productImg`
- `GET /products` (merchant/admin only)
- `PATCH /products/:productId/stock` (merchant/admin only)

